/**
 * API VUSD1 Keys Manager
 * Component for managing API keys for external integrations
 */

import { useState, useEffect } from 'react';
import {
  Key, Plus, Trash2, Eye, EyeOff, Copy, CheckCircle, AlertCircle,
  Settings, TrendingUp, Clock, Shield, RefreshCw, ExternalLink, DollarSign, Lock
} from 'lucide-react';
import { apiKeysStore, type ApiKey, type ApiKeyUsage } from '../lib/api-keys-store';
import { getSupabaseClient } from '../lib/supabase-client';

interface CustodyAccount {
  id: string;
  account_name: string;
  account_number: string;
  currency: string;
  balance_total: number;
  balance_available: number;
}

interface Pledge {
  id: string;
  custody_account_id: string;
  amount: number;
  currency: string;
  status: string;
  reference_number: string;
  created_at: string;
}

export function APIVUSD1KeysManager() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState<ApiKey | null>(null);
  const [showSecret, setShowSecret] = useState<Record<string, boolean>>({});
  const [selectedKeyUsage, setSelectedKeyUsage] = useState<{ keyId: string; usage: ApiKeyUsage } | null>(null);

  // Custody accounts and pledges
  const [custodyAccounts, setCustodyAccounts] = useState<CustodyAccount[]>([]);
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Form state
  const [keyName, setKeyName] = useState('');
  const [rateLimit, setRateLimit] = useState(60);
  const [selectedCustodyAccountId, setSelectedCustodyAccountId] = useState('');
  const [selectedPledgeId, setSelectedPledgeId] = useState('');
  const [permissions, setPermissions] = useState({
    read_pledges: true,
    create_pledges: false,
    update_pledges: false,
    delete_pledges: false,
  });

  // Filtered pledges based on selected custody account
  const filteredPledges = selectedCustodyAccountId
    ? pledges.filter(p => p.custody_account_id === selectedCustodyAccountId)
    : pledges;

  useEffect(() => {
    loadKeys();
    loadCustodyAccountsAndPledges();
  }, []);

  const loadKeys = async () => {
    try {
      setLoading(true);
      const data = await apiKeysStore.listKeys();
      setKeys(data);
    } catch (error) {
      console.error('Error loading keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustodyAccountsAndPledges = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      setLoadingData(true);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load custody accounts
      const { data: accounts, error: accountsError } = await supabase
        .from('api_vusd1_custody_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error loading custody accounts:', accountsError);
      } else {
        setCustodyAccounts(accounts || []);
      }

      // Load pledges
      const { data: pledgesData, error: pledgesError } = await supabase
        .from('api_vusd1_pledges')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (pledgesError) {
        console.error('Error loading pledges:', pledgesError);
      } else {
        setPledges(pledgesData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleCreateKey = async () => {
    try {
      // Get selected custody account and pledge data
      const custodyAccount = selectedCustodyAccountId
        ? custodyAccounts.find(a => a.id === selectedCustodyAccountId)
        : undefined;

      const pledge = selectedPledgeId
        ? pledges.find(p => p.id === selectedPledgeId)
        : undefined;

      const result = await apiKeysStore.createKey({
        name: keyName,
        permissions,
        rate_limit: rateLimit,
        custody_account: custodyAccount,
        pledge: pledge,
      });

      setNewKey(result.key);
      setShowCreateModal(false);
      await loadKeys();

      // Reset form
      setKeyName('');
      setRateLimit(60);
      setSelectedCustodyAccountId('');
      setSelectedPledgeId('');
      setPermissions({
        read_pledges: true,
        create_pledges: false,
        update_pledges: false,
        delete_pledges: false,
      });
    } catch (error: any) {
      alert('Error creating API key: ' + error.message);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    try {
      await apiKeysStore.deleteKey(keyId);
      await loadKeys();
    } catch (error: any) {
      alert('Error deleting API key: ' + error.message);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      await apiKeysStore.updateKey(keyId, { status: 'revoked' });
      await loadKeys();
    } catch (error: any) {
      alert('Error revoking API key: ' + error.message);
    }
  };

  const handleViewUsage = async (keyId: string) => {
    try {
      const usage = await apiKeysStore.getKeyUsage(keyId);
      setSelectedKeyUsage({ keyId, usage });
    } catch (error: any) {
      alert('Error loading usage: ' + error.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'revoked': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'expired': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a0a0a] to-[#0d0d0d] rounded-xl border border-[#00ff88]/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#e0ffe0] flex items-center gap-3">
              <Key className="w-8 h-8 text-[#00ff88]" />
              API Keys Manager
            </h2>
            <p className="text-[#80ff80] mt-1">
              Manage API keys for external integrations with luxliqdaes.cloud
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-[#00ff88] to-[#00cc6a] hover:from-[#00cc6a] hover:to-[#00aa55] text-black px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.4)]"
          >
            <Plus className="w-5 h-5" />
            Create API Key
          </button>
        </div>

        {/* API Endpoint Info */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-[#00ff88] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[#e0ffe0] font-semibold mb-1">API Base URL</p>
              <code className="text-[#00ff88] bg-[#0d0d0d] px-3 py-1 rounded border border-[#00ff88]/30 text-sm">
                {import.meta.env.VITE_SUPABASE_URL}/functions/v1/vusd1-pledges-api
              </code>
              <p className="text-[#80ff80] text-sm mt-2">
                Use X-API-Key and X-API-Secret headers for authentication
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keys List Container with Scroll */}
      <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-[#00ff88] animate-spin mx-auto mb-3" />
            <p className="text-[#80ff80]">Loading API keys...</p>
          </div>
        ) : keys.length === 0 ? (
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-12 text-center">
            <Key className="w-16 h-16 text-[#4d7c4d] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#e0ffe0] mb-2">No API Keys</h3>
            <p className="text-[#80ff80] mb-6">
              Create your first API key to start integrating with external applications
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-[#00ff88] to-[#00cc6a] hover:from-[#00cc6a] hover:to-[#00aa55] text-black px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(0,255,136,0.4)]"
            >
              Create First API Key
            </button>
          </div>
        ) : (
        <div className="space-y-4">
          {keys.map((key) => (
            <div
              key={key.id}
              className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#00ff88]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#e0ffe0]">{key.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(key.status)}`}>
                      {key.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#80ff80]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Created {new Date(key.created_at).toLocaleDateString()}
                    </span>
                    {key.last_used_at && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Last used {new Date(key.last_used_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewUsage(key.id)}
                    className="bg-[#1a1a1a] border border-[#00ff88]/30 hover:border-[#00ff88] text-[#00ff88] px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Usage
                  </button>
                  {key.status === 'active' && (
                    <button
                      onClick={() => handleRevokeKey(key.id)}
                      className="bg-[#1a1a1a] border border-yellow-400/30 hover:border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg transition-all"
                    >
                      Revoke
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteKey(key.id)}
                    className="bg-[#1a1a1a] border border-red-400/30 hover:border-red-400 text-red-400 px-4 py-2 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* API Key */}
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 mb-3">
                <label className="text-[#80ff80] text-sm block mb-2">API Key</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-[#00ff88] bg-[#0d0d0d] px-3 py-2 rounded border border-[#00ff88]/30 font-mono text-sm">
                    {key.api_key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(key.api_key)}
                    className="bg-[#1a1a1a] border border-[#00ff88]/30 hover:border-[#00ff88] text-[#00ff88] px-3 py-2 rounded transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {Object.entries(key.permissions).map(([perm, enabled]) => (
                  <div
                    key={perm}
                    className={`${
                      enabled
                        ? 'bg-[#00ff88]/10 border-[#00ff88]/30'
                        : 'bg-[#1a1a1a] border-[#333]'
                    } border rounded-lg p-3`}
                  >
                    <div className="flex items-center gap-2">
                      {enabled ? (
                        <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#666]" />
                      )}
                      <span className={`text-xs font-semibold ${enabled ? 'text-[#00ff88]' : 'text-[#666]'}`}>
                        {perm.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rate Limit */}
              <div className="flex items-center gap-2 text-sm text-[#80ff80]">
                <Shield className="w-4 h-4" />
                <span>Rate Limit: {key.rate_limit} requests/minute</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-[#00ff88]/30 rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.3)] p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-[#e0ffe0] mb-6 flex items-center gap-3">
              <Key className="w-6 h-6 text-[#00ff88]" />
              Create New API Key
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[#80ff80] text-sm block mb-2">Key Name *</label>
                <input
                  type="text"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-[#00ff88] text-[#e0ffe0] px-4 py-3 rounded-lg outline-none transition-all"
                  placeholder="Production API Key"
                />
              </div>

              <div>
                <label className="text-[#80ff80] text-sm block mb-2">Rate Limit (requests/minute)</label>
                <input
                  type="number"
                  value={rateLimit}
                  onChange={(e) => setRateLimit(parseInt(e.target.value))}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] focus:border-[#00ff88] text-[#e0ffe0] px-4 py-3 rounded-lg outline-none transition-all"
                  min="1"
                  max="1000"
                />
              </div>

              {/* Custody Account Selector */}
              <div className="bg-[#0a0a0a] border border-[#00ff88]/20 rounded-lg p-4">
                <label className="text-[#80ff80] text-sm block mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#00ff88]" />
                  Associate with Custody Account (optional)
                </label>
                <select
                  value={selectedCustodyAccountId}
                  onChange={(e) => {
                    setSelectedCustodyAccountId(e.target.value);
                    setSelectedPledgeId(''); // Reset pledge selection when account changes
                  }}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] focus:border-[#00ff88] text-[#e0ffe0] px-4 py-3 rounded-lg outline-none transition-all"
                >
                  <option value="">-- No association --</option>
                  {custodyAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_name} ({account.account_number}) - {account.currency} ${account.balance_available.toLocaleString()}
                    </option>
                  ))}
                </select>
                <p className="text-[#4d7c4d] text-xs mt-2">
                  Select a custody account to see pledges with balance
                </p>
              </div>

              {/* Pledge Selector */}
              <div className="bg-[#0a0a0a] border border-[#00ff88]/20 rounded-lg p-4">
                <label className="text-[#80ff80] text-sm block mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00ff88]" />
                  Associate with Pledge (optional)
                </label>
                <select
                  value={selectedPledgeId}
                  onChange={(e) => setSelectedPledgeId(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-[#1a1a1a] focus:border-[#00ff88] text-[#e0ffe0] px-4 py-3 rounded-lg outline-none transition-all"
                  disabled={!selectedCustodyAccountId}
                >
                  <option value="">-- No association --</option>
                  {filteredPledges.map((pledge) => (
                    <option key={pledge.id} value={pledge.id}>
                      {pledge.reference_number} - {pledge.currency} ${pledge.amount.toLocaleString()} ({pledge.status})
                    </option>
                  ))}
                </select>
                <p className="text-[#4d7c4d] text-xs mt-2">
                  {selectedCustodyAccountId
                    ? `Showing pledges for selected custody account (${filteredPledges.length} available)`
                    : 'Select a custody account first to view its pledges'}
                </p>
              </div>

              <div>
                <label className="text-[#80ff80] text-sm block mb-3">Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(permissions).map(([perm, enabled]) => (
                    <label
                      key={perm}
                      className="flex items-center gap-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3 cursor-pointer hover:border-[#00ff88]/30 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setPermissions({ ...permissions, [perm]: e.target.checked })}
                        className="w-5 h-5 accent-[#00ff88]"
                      />
                      <span className="text-[#e0ffe0] text-sm">
                        {perm.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateKey}
                  disabled={!keyName}
                  className="flex-1 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] hover:from-[#00cc6a] hover:to-[#00aa55] text-black px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create API Key
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-[#1a1a1a] border border-[#00ff88]/30 hover:border-[#00ff88] text-[#00ff88] px-6 py-3 rounded-lg font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Key Success Modal */}
      {newKey && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-[#00ff88] rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.5)] p-6 max-w-2xl w-full">
            <div className="text-center mb-6">
              <CheckCircle className="w-16 h-16 text-[#00ff88] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#e0ffe0] mb-2">API Key Created Successfully!</h3>
              <p className="text-yellow-400 font-semibold">
                ⚠️ Save these credentials securely. The secret will not be shown again.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0a0a0a] border border-[#00ff88]/30 rounded-lg p-4">
                <label className="text-[#80ff80] text-sm block mb-2">API Key</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-[#00ff88] bg-[#0d0d0d] px-3 py-2 rounded border border-[#00ff88]/30 font-mono text-sm break-all">
                    {newKey.api_key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(newKey.api_key)}
                    className="bg-[#1a1a1a] border border-[#00ff88] text-[#00ff88] px-3 py-2 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-[#00ff88]/30 rounded-lg p-4">
                <label className="text-[#80ff80] text-sm block mb-2">API Secret (⚠️ Save Now)</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-[#00ff88] bg-[#0d0d0d] px-3 py-2 rounded border border-[#00ff88]/30 font-mono text-sm break-all">
                    {newKey.api_secret}
                  </code>
                  <button
                    onClick={() => copyToClipboard(newKey.api_secret!)}
                    className="bg-[#1a1a1a] border border-[#00ff88] text-[#00ff88] px-3 py-2 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  <strong>Important:</strong> Store the API secret in a secure location. You will not be able to view it again after closing this dialog.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setNewKey(null)}
                  className="flex-1 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] hover:from-[#00cc6a] hover:to-[#00aa55] text-black px-6 py-3 rounded-lg font-bold transition-all"
                >
                  I've Saved My Credentials
                </button>
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
                      await handleDeleteKey(newKey.id);
                      setNewKey(null);
                    }
                  }}
                  className="bg-[#1a1a1a] border border-red-400/30 hover:border-red-400 hover:bg-red-400/10 text-red-400 px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Modal */}
      {selectedKeyUsage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-[#00ff88]/30 rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.3)] p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-[#e0ffe0] mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#00ff88]" />
              API Key Usage Statistics
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
                <p className="text-[#80ff80] text-sm mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-[#e0ffe0]">
                  {selectedKeyUsage.usage.total_requests.toLocaleString()}
                </p>
              </div>
              <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4">
                <p className="text-[#80ff80] text-sm mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-[#00ff88]">
                  {selectedKeyUsage.usage.success_rate.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-[#e0ffe0] mb-3">Recent Requests</h4>
              <div className="space-y-2">
                {selectedKeyUsage.usage.recent_requests.map((req, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        req.status_code < 400 ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                      }`}>
                        {req.status_code}
                      </span>
                      <span className="text-[#e0ffe0] font-mono text-sm">{req.method}</span>
                      <span className="text-[#80ff80] text-sm">{req.endpoint}</span>
                    </div>
                    <span className="text-[#80ff80] text-xs">
                      {new Date(req.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedKeyUsage(null)}
              className="w-full bg-[#1a1a1a] border border-[#00ff88]/30 hover:border-[#00ff88] text-[#00ff88] px-6 py-3 rounded-lg font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
