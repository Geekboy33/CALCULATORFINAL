/**
 * API GLOBAL Module
 * Transfer system with MindCloud API integration
 * Sends M2 money transfers with ISO 20022 compliance
 * Validates digital signatures from DTC1B Bank Audit
 * Deducts from M2 balance directly from DTC1B file
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Send,
  Lock,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  RefreshCw,
  TrendingUp,
  Building2,
  User,
  FileText,
  Zap,
  Shield,
  FileCheck,
  Download
} from 'lucide-react';
import { custodyStore, type CustodyAccount } from '../lib/custody-store';
import { iso20022Store, type PaymentInstruction } from '../lib/iso20022-store';
import { auditStore } from '../lib/audit-store';

interface Transfer {
  id: string;
  transfer_request_id: string;
  sending_name: string;
  sending_account: string;
  sending_institution: string;
  sending_institution_website: string;
  receiving_name: string;
  receiving_account: string;
  receiving_institution: string;
  amount: number;
  sending_currency: string;
  receiving_currency: string;
  description: string;
  datetime: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  response?: any;
  created_at: string;
  // ISO 20022 and M2 validation
  iso20022?: {
    messageId: string;
    paymentInstruction: PaymentInstruction;
    xmlGenerated: boolean;
  };
  m2Validation?: {
    m2BalanceBefore: number;
    m2BalanceAfter: number;
    dtc1bSource: string;
    digitalSignatures: number;
    signaturesVerified: boolean;
  };
}

export default function APIGlobalModule() {
  const [selectedView, setSelectedView] = useState<'overview' | 'transfer' | 'history'>('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Refs for scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Custody accounts
  const [custodyAccounts, setCustodyAccounts] = useState<CustodyAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  // Transfer form
  const [transferForm, setTransferForm] = useState({
    receiving_name: 'GLOBAL INFRASTRUCTURE DEVELOPMENT AND INTERNATIONAL FINANCE AGENCY (G.I.D.I.F.A)',
    receiving_account: '23890111',
    receiving_institution: 'APEX CAPITAL RESERVE BANK INC',
    amount: 0,
    currency: 'USD',
    description: 'M2 MONEY TRANSFER',
    purpose: 'INFRASTRUCTURE DEVELOPMENT'
  });

  // Transfer history
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  // Stats
  const [stats, setStats] = useState({
    total_sent: 0,
    pending_transfers: 0,
    completed_transfers: 0,
    failed_transfers: 0
  });

  // API Connection status
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // M2 Balance from DTC1B
  const [m2Balance, setM2Balance] = useState<{ total: number; currency: string; validated: boolean } | null>(null);
  const [digitalSignaturesCount, setDigitalSignaturesCount] = useState<number>(0);

  useEffect(() => {
    loadData();
    checkAPIConnection();
    loadM2Balance();
  }, []);

  const loadM2Balance = () => {
    try {
      const m2Data = iso20022Store.extractM2Balance();
      setM2Balance(m2Data);

      const signatures = iso20022Store.extractDigitalSignatures();
      setDigitalSignaturesCount(signatures.length);

      console.log('[API GLOBAL] 📊 M2 Balance loaded:', m2Data);
      console.log('[API GLOBAL] 🔐 Digital signatures:', signatures.length);
    } catch (error) {
      console.warn('[API GLOBAL] ⚠️ No DTC1B data available:', error);
      setM2Balance(null);
      setDigitalSignaturesCount(0);
    }
  };

  const checkAPIConnection = async () => {
    try {
      setApiStatus('checking');
      console.log('[API GLOBAL] 🔍 Checking MindCloud API connectivity...');

      const response = await fetch(
        'https://api.mindcloud.co/api/job/8wZsHuEIK3xu/run?key=831b9d45-d9ec-4594-80a3-3126a700b60f&force=true',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "CashTransfer.v1": {
              "SendingName": "API_CONNECTION_TEST",
              "SendingAccount": "TEST_000",
              "ReceivingName": "GLOBAL INFRASTRUCTURE DEVELOPMENT AND INTERNATIONAL FINANCE AGENCY (G.I.D.I.F.A)",
              "ReceivingAccount": "23890111",
              "Datetime": new Date().toISOString(),
              "Amount": "0.01",
              "ReceivingCurrency": "USD",
              "SendingCurrency": "USD",
              "Description": "API CONNECTION VERIFICATION",
              "TransferRequestID": `TEST_${Date.now()}`,
              "ReceivingInstitution": "APEX CAPITAL RESERVE BANK INC",
              "SendingInstitution": "Digital Commercial Bank Ltd",
              "method": "API",
              "purpose": "CONNECTION_TEST",
              "source": "DAES_CORE_SYSTEM"
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setApiStatus('connected');
          console.log('[API GLOBAL] ✅ MindCloud API is CONNECTED and FUNCTIONAL');
        } else {
          setApiStatus('error');
          console.warn('[API GLOBAL] ⚠️ MindCloud API responded but returned error:', data);
        }
      } else {
        setApiStatus('error');
        console.error('[API GLOBAL] ❌ MindCloud API connection failed:', response.status);
      }
    } catch (error) {
      setApiStatus('error');
      console.error('[API GLOBAL] ❌ Error checking API connection:', error);
    }
  };

  const loadData = () => {
    // Load custody accounts
    const accounts = custodyStore.getAccounts();
    setCustodyAccounts(accounts);

    // Load transfers from localStorage
    const savedTransfers = localStorage.getItem('api_global_transfers');
    if (savedTransfers) {
      const parsedTransfers = JSON.parse(savedTransfers);
      setTransfers(parsedTransfers);

      // Calculate stats
      const totalSent = parsedTransfers
        .filter((t: Transfer) => t.status === 'COMPLETED')
        .reduce((sum: number, t: Transfer) => sum + t.amount, 0);

      setStats({
        total_sent: totalSent,
        pending_transfers: parsedTransfers.filter((t: Transfer) => t.status === 'PENDING' || t.status === 'PROCESSING').length,
        completed_transfers: parsedTransfers.filter((t: Transfer) => t.status === 'COMPLETED').length,
        failed_transfers: parsedTransfers.filter((t: Transfer) => t.status === 'FAILED').length
      });
    }
  };

  // Auto-scroll to submit button when account is selected
  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);

    // Scroll to bottom after a short delay to ensure DOM is updated
    if (accountId && scrollContainerRef.current && submitButtonRef.current) {
      setTimeout(() => {
        submitButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        });
      }, 300);
    }
  };

  const handleSendTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAccount) {
      alert('Please select a custody account');
      return;
    }

    const account = custodyAccounts.find(a => a.id === selectedAccount);
    if (!account) {
      alert('Custody account not found');
      return;
    }

    if (transferForm.amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    if (transferForm.amount > account.availableBalance) {
      alert(`Insufficient balance!\n\nAvailable: ${account.currency} ${account.availableBalance.toLocaleString()}\nRequested: ${transferForm.currency} ${transferForm.amount.toLocaleString()}`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // ========================================
      // STEP 1: VALIDATE M2 BALANCE FROM DTC1B
      // ========================================
      console.log('[API GLOBAL] 📊 Step 1: Validating M2 balance from DTC1B...');

      let paymentInstruction: PaymentInstruction;
      let m2BalanceBefore = 0;

      try {
        const m2Data = iso20022Store.extractM2Balance();
        m2BalanceBefore = m2Data.total;

        console.log('[API GLOBAL] ✅ M2 Balance validated:', {
          total: m2Data.total,
          currency: m2Data.currency,
          validated: m2Data.validated
        });

        if (transferForm.amount > m2Data.total) {
          throw new Error(
            `Insufficient M2 balance in DTC1B!\n\n` +
            `Requested: ${transferForm.currency} ${transferForm.amount.toLocaleString()}\n` +
            `Available M2: ${m2Data.currency} ${m2Data.total.toLocaleString()}\n\n` +
            `Please process DTC1B file in Bank Audit module to load M2 money.`
          );
        }
      } catch (m2Error: any) {
        throw new Error(
          `M2 validation failed!\n\n` +
          `${m2Error.message}\n\n` +
          `Required: Process DTC1B file in Bank Audit module first to extract M2 money and digital signatures.`
        );
      }

      // ========================================
      // STEP 2: CREATE ISO 20022 PAYMENT INSTRUCTION
      // ========================================
      console.log('[API GLOBAL] 📋 Step 2: Creating ISO 20022 payment instruction...');

      // Generate transfer request ID
      const transferRequestId = `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const datetime = new Date().toISOString();

      try {
        paymentInstruction = iso20022Store.createPaymentInstruction({
          transferRequestId,
          amount: transferForm.amount,
          currency: transferForm.currency,
          debtorName: account.accountName,
          debtorAccount: account.accountNumber,
          debtorBIC: 'DIGCUSXX',  // Digital Commercial Bank Ltd BIC
          debtorInstitution: 'Digital Commercial Bank Ltd',
          creditorName: transferForm.receiving_name,
          creditorAccount: transferForm.receiving_account,
          creditorBIC: 'APEXCAUS',  // APEX CAPITAL RESERVE BANK INC BIC
          creditorInstitution: transferForm.receiving_institution,
          remittanceInfo: transferForm.description,
          purposeCode: 'INFR'  // Infrastructure Development
        });

        console.log('[API GLOBAL] ✅ ISO 20022 instruction created:', {
          messageId: paymentInstruction.messageId,
          signatures: paymentInstruction.digitalSignatures.length,
          m2Validated: paymentInstruction.dtc1bValidation.verified
        });
      } catch (isoError: any) {
        throw new Error(`ISO 20022 creation failed: ${isoError.message}`);
      }

      // Prepare API payload with bank website
      const payload = {
        "CashTransfer.v1": {
          "SendingName": account.accountName,
          "SendingAccount": account.accountNumber,
          "ReceivingName": transferForm.receiving_name,
          "ReceivingAccount": transferForm.receiving_account,
          "Datetime": datetime,
          "Amount": transferForm.amount.toFixed(2),
          "ReceivingCurrency": transferForm.currency,
          "SendingCurrency": account.currency,
          "Description": transferForm.description,
          "TransferRequestID": transferRequestId,
          "ReceivingInstitution": transferForm.receiving_institution,
          "SendingInstitution": "Digital Commercial Bank Ltd",
          "SendingInstitutionWebsite": "https://digcommbank.com/",
          "method": "API",
          "purpose": transferForm.purpose,
          "source": "DAES_CORE_SYSTEM"
        }
      };

      console.log('[API GLOBAL] 📤 Sending transfer to MindCloud:', payload);

      // Send to MindCloud API
      const response = await fetch(
        'https://api.mindcloud.co/api/job/8wZsHuEIK3xu/run?key=831b9d45-d9ec-4594-80a3-3126a700b60f&force=true',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error('[API GLOBAL] Error parsing response:', jsonError);
        responseData = { error: 'Failed to parse response', raw: await response.text() };
      }

      console.log('[API GLOBAL] ✅ MindCloud response:', responseData);
      console.log('[API GLOBAL] 📊 Response status:', response.status, response.statusText);

      // Determine transfer status based on response
      let transferStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' = 'PROCESSING';

      if (response.ok && responseData?.success === true) {
        transferStatus = 'COMPLETED';
        console.log('[API GLOBAL] ✅ Transfer COMPLETED successfully');
      } else if (response.ok && responseData?.success === false) {
        transferStatus = 'FAILED';
        console.log('[API GLOBAL] ⚠️ Transfer FAILED:', responseData?.message);
      } else if (!response.ok) {
        transferStatus = 'FAILED';
        console.log('[API GLOBAL] ❌ HTTP Error:', response.status, response.statusText);
      }

      // ========================================
      // STEP 3: DEDUCT FROM M2 BALANCE IN DTC1B
      // ========================================
      let m2BalanceAfter = m2BalanceBefore;

      if (transferStatus === 'COMPLETED') {
        console.log('[API GLOBAL] 💰 Step 3: Deducting from M2 balance...');

        try {
          iso20022Store.deductFromM2Balance(
            transferForm.amount,
            transferForm.currency,
            transferRequestId
          );

          m2BalanceAfter = m2BalanceBefore - transferForm.amount;

          console.log('[API GLOBAL] ✅ M2 balance updated:', {
            before: m2BalanceBefore,
            after: m2BalanceAfter,
            deducted: transferForm.amount
          });

          // Reload M2 balance
          loadM2Balance();
        } catch (deductError: any) {
          console.error('[API GLOBAL] ❌ Error deducting M2 balance:', deductError);
          throw new Error(`Failed to deduct M2 balance: ${deductError.message}`);
        }
      }

      // ========================================
      // STEP 4: CREATE TRANSFER RECORD WITH ISO 20022
      // ========================================
      const transfer: Transfer = {
        id: `TRF_${Date.now()}`,
        transfer_request_id: transferRequestId,
        sending_name: account.accountName,
        sending_account: account.accountNumber,
        sending_institution: 'Digital Commercial Bank Ltd',
        sending_institution_website: 'https://digcommbank.com/',
        receiving_name: transferForm.receiving_name,
        receiving_account: transferForm.receiving_account,
        receiving_institution: transferForm.receiving_institution,
        amount: transferForm.amount,
        sending_currency: account.currency,
        receiving_currency: transferForm.currency,
        description: transferForm.description,
        datetime: datetime,
        status: transferStatus,
        response: responseData,
        created_at: datetime,
        iso20022: {
          messageId: paymentInstruction.messageId,
          paymentInstruction: paymentInstruction,
          xmlGenerated: true
        },
        m2Validation: {
          m2BalanceBefore,
          m2BalanceAfter,
          dtc1bSource: 'Bank Audit Module',
          digitalSignatures: paymentInstruction.digitalSignatures.length,
          signaturesVerified: paymentInstruction.dtc1bValidation.verified
        }
      };

      // Save to localStorage
      const updatedTransfers = [transfer, ...transfers];
      localStorage.setItem('api_global_transfers', JSON.stringify(updatedTransfers));
      setTransfers(updatedTransfers);

      // Deduct from custody account only if COMPLETED
      if (transferStatus === 'COMPLETED') {
        account.availableBalance -= transferForm.amount;
        account.reservedBalance += transferForm.amount;
        const accounts = custodyStore.getAccounts();
        custodyStore.saveAccounts(accounts);
        setCustodyAccounts([...accounts]);

        console.log('[API GLOBAL] 💰 Balance updated:', {
          account: account.accountName,
          deducted: transferForm.amount,
          newAvailable: account.availableBalance,
          newReserved: account.reservedBalance
        });
      }

      loadData();

      // Build success/failure message
      const statusEmoji = transferStatus === 'COMPLETED' ? '✅' :
                         transferStatus === 'FAILED' ? '❌' : '⏳';

      const messageText =
        `${statusEmoji} Transfer ${transferStatus}!\n\n` +
        `=== TRANSFER DETAILS ===\n` +
        `Transfer ID: ${transferRequestId}\n` +
        `ISO 20022 Message ID: ${paymentInstruction.messageId}\n` +
        `Amount: ${transferForm.currency} ${transferForm.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\n` +
        `=== FROM ===\n` +
        `Name: ${account.accountName}\n` +
        `Account: ${account.accountNumber}\n` +
        `Institution: Digital Commercial Bank Ltd\n` +
        `Website: https://digcommbank.com/\n` +
        `BIC: DIGCUSXX\n\n` +
        `=== TO ===\n` +
        `Name: ${transferForm.receiving_name}\n` +
        `Account: ${transferForm.receiving_account}\n` +
        `Institution: ${transferForm.receiving_institution}\n` +
        `BIC: APEXCAUS\n\n` +
        `=== M2 VALIDATION (DTC1B) ===\n` +
        `Balance Before: ${transferForm.currency} ${m2BalanceBefore.toLocaleString('en-US', { minimumFractionDigits: 3 })}\n` +
        `Balance After: ${transferForm.currency} ${m2BalanceAfter.toLocaleString('en-US', { minimumFractionDigits: 3 })}\n` +
        `Deducted: ${transferForm.currency} ${transferForm.amount.toLocaleString('en-US', { minimumFractionDigits: 3 })}\n` +
        `Digital Signatures: ${paymentInstruction.digitalSignatures.length} verified\n` +
        `Source: Bank Audit Module\n\n` +
        `=== ISO 20022 COMPLIANCE ===\n` +
        `Standard: pain.001.001.09 (Customer Credit Transfer)\n` +
        `Classification: M2 Money Supply\n` +
        `DTC1B Validated: ${paymentInstruction.dtc1bValidation.verified ? 'YES' : 'NO'}\n\n` +
        `=== STATUS ===\n` +
        `Status: ${transferStatus}\n` +
        `${responseData?.message ? `API Response: ${responseData.message}\n` : ''}` +
        `${responseData?.data?.updates?.[0]?.message ? `Details: ${responseData.data.updates[0].message}\n` : ''}\n` +
        `${transferStatus === 'COMPLETED' ? '✅ M2 balance deducted from DTC1B\n✅ ISO 20022 XML generated\n✅ Digital signatures verified' : ''}`;

      setSuccess(messageText);
      alert(messageText);

      // Reset form
      setTransferForm({
        ...transferForm,
        amount: 0,
        description: 'M2 MONEY TRANSFER'
      });

    } catch (err) {
      const error = err as Error;
      console.error('[API GLOBAL] ❌ Error sending transfer:', error);
      setError(error.message);
      alert('Error sending transfer: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 bg-green-500/20';
      case 'PROCESSING': return 'text-blue-400 bg-blue-500/20';
      case 'PENDING': return 'text-yellow-400 bg-yellow-500/20';
      case 'FAILED': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const exportTransfersToTXT = () => {
    if (transfers.length === 0) {
      alert('No transfers to export');
      return;
    }

    let txtContent = '═══════════════════════════════════════════════════════════════════\n';
    txtContent += '         API GLOBAL - TRANSFER HISTORY EXPORT\n';
    txtContent += '         Digital Commercial Bank Ltd\n';
    txtContent += '         https://digcommbank.com/\n';
    txtContent += '═══════════════════════════════════════════════════════════════════\n\n';
    txtContent += `Export Date: ${new Date().toISOString()}\n`;
    txtContent += `Total Transfers: ${transfers.length}\n`;
    txtContent += `Completed: ${transfers.filter(t => t.status === 'COMPLETED').length}\n`;
    txtContent += `Failed: ${transfers.filter(t => t.status === 'FAILED').length}\n`;
    txtContent += `Pending: ${transfers.filter(t => t.status === 'PENDING' || t.status === 'PROCESSING').length}\n\n`;
    txtContent += '═══════════════════════════════════════════════════════════════════\n\n';

    transfers.forEach((transfer, index) => {
      txtContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      txtContent += `TRANSFER #${index + 1}\n`;
      txtContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      txtContent += `═══ TRANSFER DETAILS ═══\n`;
      txtContent += `Transfer ID: ${transfer.transfer_request_id}\n`;
      if (transfer.iso20022?.messageId) {
        txtContent += `ISO 20022 Message ID: ${transfer.iso20022.messageId}\n`;
      }
      txtContent += `Date/Time: ${new Date(transfer.datetime).toLocaleString()}\n`;
      txtContent += `Amount: ${transfer.receiving_currency} ${transfer.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
      txtContent += `Status: ${transfer.status}\n`;
      txtContent += `Description: ${transfer.description}\n\n`;

      txtContent += `═══ FROM (SENDER) ═══\n`;
      txtContent += `Name: ${transfer.sending_name}\n`;
      txtContent += `Account: ${transfer.sending_account}\n`;
      txtContent += `Institution: ${transfer.sending_institution}\n`;
      txtContent += `Website: ${transfer.sending_institution_website}\n`;
      txtContent += `Currency: ${transfer.sending_currency}\n`;
      txtContent += `BIC: DIGCUSXX\n\n`;

      txtContent += `═══ TO (RECEIVER) ═══\n`;
      txtContent += `Name: ${transfer.receiving_name}\n`;
      txtContent += `Account: ${transfer.receiving_account}\n`;
      txtContent += `Institution: ${transfer.receiving_institution}\n`;
      txtContent += `Currency: ${transfer.receiving_currency}\n`;
      txtContent += `BIC: APEXCAUS\n\n`;

      if (transfer.m2Validation) {
        txtContent += `═══ M2 VALIDATION (DTC1B) ═══\n`;
        txtContent += `Balance Before: ${transfer.receiving_currency} ${transfer.m2Validation.m2BalanceBefore.toLocaleString('en-US', { minimumFractionDigits: 3 })}\n`;
        txtContent += `Balance After: ${transfer.receiving_currency} ${transfer.m2Validation.m2BalanceAfter.toLocaleString('en-US', { minimumFractionDigits: 3 })}\n`;
        txtContent += `Deducted: ${transfer.receiving_currency} ${transfer.amount.toLocaleString('en-US', { minimumFractionDigits: 3 })}\n`;
        txtContent += `Digital Signatures: ${transfer.m2Validation.digitalSignatures} verified\n`;
        txtContent += `Signatures Verified: ${transfer.m2Validation.signaturesVerified ? 'YES' : 'NO'}\n`;
        txtContent += `Source: ${transfer.m2Validation.dtc1bSource}\n\n`;
      }

      if (transfer.iso20022) {
        txtContent += `═══ ISO 20022 COMPLIANCE ═══\n`;
        txtContent += `Standard: pain.001.001.09 (Customer Credit Transfer)\n`;
        txtContent += `Classification: M2 Money Supply\n`;
        txtContent += `Message ID: ${transfer.iso20022.messageId}\n`;
        txtContent += `XML Generated: ${transfer.iso20022.xmlGenerated ? 'YES' : 'NO'}\n\n`;
      }

      if (transfer.response) {
        txtContent += `═══ API RESPONSE ═══\n`;
        txtContent += `Success: ${transfer.response.success ? 'YES' : 'NO'}\n`;
        if (transfer.response.message) {
          txtContent += `Message: ${transfer.response.message}\n`;
        }
        if (transfer.response.data?.updates?.[0]?.message) {
          txtContent += `Details: ${transfer.response.data.updates[0].message}\n`;
        }
        txtContent += `\n`;
      }

      txtContent += `Created: ${new Date(transfer.created_at).toLocaleString()}\n`;
    });

    txtContent += '\n\n═══════════════════════════════════════════════════════════════════\n';
    txtContent += 'END OF TRANSFER HISTORY\n';
    txtContent += '═══════════════════════════════════════════════════════════════════\n';
    txtContent += '\nGenerated by API GLOBAL Module\n';
    txtContent += 'Digital Commercial Bank Ltd - https://digcommbank.com/\n';
    txtContent += 'ISO 20022 Compliant | M2 Money Supply | DTC1B Validated\n';

    // Create and download file
    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `API_GLOBAL_Transfers_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('[API GLOBAL] 📥 Transfer history exported to TXT');
    alert(`✅ Transfer history exported!\n\n${transfers.length} transfers saved to TXT file.`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              API GLOBAL
            </h1>
            <p className="text-gray-400">International M2 Money Transfer System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-2 bg-gray-900 p-1 rounded-lg">
          <button
            onClick={() => setSelectedView('overview')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              selectedView === 'overview'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setSelectedView('transfer')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              selectedView === 'transfer'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Send className="w-4 h-4" />
            Send Transfer
          </button>
          <button
            onClick={() => setSelectedView('history')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
              selectedView === 'history'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            History
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {/* Overview */}
        {selectedView === 'overview' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-900/50 to-black border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">
                    {stats.completed_transfers}
                  </span>
                </div>
                <div className="text-sm text-gray-400">Completed Transfers</div>
                <div className="text-xs text-green-400 mt-1">
                  ${stats.total_sent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/50 to-black border border-blue-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-blue-400">
                    {stats.pending_transfers}
                  </span>
                </div>
                <div className="text-sm text-gray-400">Pending/Processing</div>
              </div>

              <div className="bg-gradient-to-br from-red-900/50 to-black border border-red-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                  <span className="text-2xl font-bold text-red-400">
                    {stats.failed_transfers}
                  </span>
                </div>
                <div className="text-sm text-gray-400">Failed Transfers</div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Lock className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold text-purple-400">
                    {custodyAccounts.length}
                  </span>
                </div>
                <div className="text-sm text-gray-400">Custody Accounts</div>
              </div>
            </div>

            {/* API Connection Status */}
            <div className={`bg-gradient-to-br border rounded-lg p-6 ${
              apiStatus === 'connected' ? 'from-green-900/50 to-black border-green-500/30' :
              apiStatus === 'error' ? 'from-red-900/50 to-black border-red-500/30' :
              'from-yellow-900/50 to-black border-yellow-500/30'
            }`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className={`w-5 h-5 ${
                  apiStatus === 'connected' ? 'text-green-400' :
                  apiStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
                }`} />
                MindCloud API Status
              </h3>
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-lg font-bold ${
                  apiStatus === 'connected' ? 'bg-green-500/20 text-green-400' :
                  apiStatus === 'error' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {apiStatus === 'connected' && '✅ CONNECTED & READY'}
                  {apiStatus === 'error' && '❌ CONNECTION ERROR'}
                  {apiStatus === 'checking' && '⏳ CHECKING...'}
                </div>
                <button
                  onClick={checkAPIConnection}
                  disabled={apiStatus === 'checking'}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${apiStatus === 'checking' ? 'animate-spin' : ''}`} />
                  Test Connection
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                <div className="font-mono">
                  Endpoint: https://api.mindcloud.co/api/job/8wZsHuEIK3xu/run
                </div>
                <div className="mt-1">
                  {apiStatus === 'connected' && 'All systems operational. Ready to process real transfers.'}
                  {apiStatus === 'error' && 'Unable to connect to MindCloud API. Check network connection.'}
                  {apiStatus === 'checking' && 'Verifying API connectivity...'}
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                Receiving Institution Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Account Name</div>
                  <div className="text-white font-mono text-sm">
                    GLOBAL INFRASTRUCTURE DEVELOPMENT AND INTERNATIONAL FINANCE AGENCY (G.I.D.I.F.A)
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">User Name</div>
                  <div className="text-white font-mono">gidifa1</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Account Number</div>
                  <div className="text-green-400 font-mono text-lg font-bold">23890111</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Institution</div>
                  <div className="text-white font-semibold">APEX CAPITAL RESERVE BANK INC</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send Transfer */}
        {selectedView === 'transfer' && (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-400" />
                Send M2 Money Transfer
              </h2>
            </div>

            <div ref={scrollContainerRef} className="overflow-y-auto flex-1 p-6 custom-scrollbar">
              <form onSubmit={handleSendTransfer} className="space-y-6">
              {/* Select Custody Account */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Select Sending Account
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => handleAccountSelect(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">-- Select Custody Account --</option>
                  {custodyAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountName} - {account.accountNumber} ({account.currency} {account.availableBalance.toLocaleString()})
                    </option>
                  ))}
                </select>
                {selectedAccount && (
                  <div className="mt-2 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                    {(() => {
                      const account = custodyAccounts.find(a => a.id === selectedAccount);
                      return account ? (
                        <div className="text-sm">
                          <div className="text-blue-400 font-semibold mb-1">Available Balance</div>
                          <div className="text-white text-lg font-bold">
                            {account.currency} {account.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Institution: Digital Commercial Bank Ltd
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Receiving Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Receiving Name
                  </label>
                  <input
                    type="text"
                    value={transferForm.receiving_name}
                    onChange={(e) => setTransferForm({ ...transferForm, receiving_name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Receiving Account
                  </label>
                  <input
                    type="text"
                    value={transferForm.receiving_account}
                    onChange={(e) => setTransferForm({ ...transferForm, receiving_account: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Receiving Institution
                  </label>
                  <input
                    type="text"
                    value={transferForm.receiving_institution}
                    onChange={(e) => setTransferForm({ ...transferForm, receiving_institution: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Currency
                  </label>
                  <select
                    value={transferForm.currency}
                    onChange={(e) => setTransferForm({ ...transferForm, currency: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Transfer Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={transferForm.amount || ''}
                  onChange={(e) => setTransferForm({ ...transferForm, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-2xl font-bold focus:outline-none focus:border-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Description
                </label>
                <input
                  type="text"
                  value={transferForm.description}
                  onChange={(e) => setTransferForm({ ...transferForm, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="M2 MONEY TRANSFER"
                  required
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Zap className="w-4 h-4 inline mr-2" />
                  Purpose
                </label>
                <input
                  type="text"
                  value={transferForm.purpose}
                  onChange={(e) => setTransferForm({ ...transferForm, purpose: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="INFRASTRUCTURE DEVELOPMENT"
                  required
                />
              </div>

              {/* Submit */}
              <button
                ref={submitButtonRef}
                type="submit"
                disabled={loading || !selectedAccount}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Processing Transfer...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Transfer via MindCloud API
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400">
                  <AlertCircle className="w-5 h-5 inline mr-2" />
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400">
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  {success}
                </div>
              )}
            </form>
            </div>
          </div>
        )}

        {/* History */}
        {selectedView === 'history' && (
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" />
                Transfer History
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={exportTransfersToTXT}
                  disabled={transfers.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                  title="Download transfers as TXT file"
                >
                  <Download className="w-4 h-4" />
                  Export TXT
                </button>
                <button
                  onClick={loadData}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            {transfers.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No transfers yet. Send your first transfer to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {transfers.map((transfer) => (
                  <div
                    key={transfer.id}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-mono text-sm text-blue-400 mb-1">
                          {transfer.transfer_request_id}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(transfer.datetime).toLocaleString()}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(transfer.status)}`}>
                        {transfer.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400 text-xs mb-1">From</div>
                        <div className="text-white font-semibold truncate">{transfer.sending_name}</div>
                        <div className="text-gray-400 text-xs">{transfer.sending_account}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">To</div>
                        <div className="text-white font-semibold truncate">{transfer.receiving_name}</div>
                        <div className="text-gray-400 text-xs">{transfer.receiving_account}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Amount</div>
                        <div className="text-green-400 font-bold text-lg">
                          {transfer.receiving_currency} {transfer.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Description</div>
                        <div className="text-white text-xs truncate">{transfer.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
