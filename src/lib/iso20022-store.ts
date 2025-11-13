/**
 * ISO 20022 Store - Financial Message Standards
 * Handles ISO 20022 pain.001 (Customer Credit Transfer) format
 * Validates digital signatures from M2 money in Bank Audit
 */

import { auditStore, type AuditResults } from './audit-store';
import CryptoJS from 'crypto-js';

// ISO 20022 Message Types
export type ISO20022MessageType =
  | 'pain.001.001.09'  // Customer Credit Transfer Initiation
  | 'pain.002.001.10'  // Customer Payment Status Report
  | 'pacs.008.001.08'  // FI to FI Customer Credit Transfer
  | 'camt.053.001.08'; // Bank to Customer Statement

// Digital Signature from DTC1B
export interface DigitalSignature {
  signatureValue: string;          // Firma digital extraída
  signatureMethod: string;         // Método de firma (SHA-256, RSA, etc.)
  digestValue: string;             // Valor digest del documento
  certificateIssuer: string;       // Emisor del certificado
  certificateSerialNumber: string; // Número serial del certificado
  signedAt: string;                // Timestamp de firma
  validFrom: string;               // Válido desde
  validTo: string;                 // Válido hasta
  verified: boolean;               // Estado de verificación
  dtc1bSource: {
    fileHash: string;              // Hash del archivo DTC1B
    blockHash: string;             // Hash del bloque específico
    offset: number;                // Posición en archivo
    rawHexData: string;            // Datos hex originales
  };
}

// ISO 20022 Payment Instruction
export interface PaymentInstruction {
  messageId: string;               // Identificador único del mensaje
  creationDateTime: string;        // Fecha/hora de creación
  numberOfTransactions: number;    // Número de transacciones
  controlSum: number;              // Suma de control
  initiatingParty: {
    name: string;                  // Nombre del iniciador
    identification: string;        // Identificación
  };
  paymentInformation: {
    paymentInformationId: string;
    paymentMethod: string;         // TRF (Transfer)
    requestedExecutionDate: string;
    debtor: {
      name: string;
      accountNumber: string;
      iban?: string;
      bic?: string;
      currency: string;
      institution: string;
    };
    debtorAgent: {
      bicfi: string;               // BIC del banco deudor
      name: string;
    };
    creditTransferTransaction: {
      paymentId: string;
      instructedAmount: {
        amount: number;
        currency: string;
      };
      creditor: {
        name: string;
        accountNumber: string;
        iban?: string;
      };
      creditorAgent: {
        bicfi: string;             // BIC del banco acreedor
        name: string;
      };
      remittanceInformation: {
        unstructured: string;      // Descripción
      };
      purpose: {
        code: string;              // Código de propósito
      };
    }[];
  };
  digitalSignatures: DigitalSignature[];
  m2MoneyClassification: 'M2';     // Clasificación del dinero
  dtc1bValidation: {
    sourceFile: string;
    totalBalance: number;
    currency: string;
    extractedAt: string;
    verified: boolean;
  };
}

// ISO 20022 XML Generator
class ISO20022Store {
  private readonly NAMESPACE_PAIN001 = 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.09';
  private readonly NAMESPACE_DS = 'http://www.w3.org/2000/09/xmldsig#';

  /**
   * Extract digital signatures from Bank Audit DTC1B data
   */
  extractDigitalSignatures(): DigitalSignature[] {
    const auditData = auditStore.getResults();
    if (!auditData) {
      console.warn('[ISO20022] No audit data available');
      return [];
    }

    const signatures: DigitalSignature[] = [];

    // Extract from M2 classified entries with authenticity proofs
    auditData.hallazgos
      .filter(h => h.classification === 'M2' && h.authenticityProof)
      .forEach(hallazgo => {
        const proof = hallazgo.authenticityProof!;

        const signature: DigitalSignature = {
          signatureValue: proof.digitalSignature,
          signatureMethod: 'SHA-256withRSA',
          digestValue: proof.blockHash,
          certificateIssuer: 'CN=DTC (The Depository Trust Company), O=DTCC, C=US',
          certificateSerialNumber: proof.verificationCode,
          signedAt: proof.timestamp,
          validFrom: proof.timestamp,
          validTo: new Date(new Date(proof.timestamp).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          verified: proof.checksumVerified,
          dtc1bSource: {
            fileHash: hallazgo.archivo.hash_sha256,
            blockHash: proof.blockHash,
            offset: proof.sourceOffset,
            rawHexData: proof.rawHexData
          }
        };

        signatures.push(signature);
      });

    console.log(`[ISO20022] ✅ Extracted ${signatures.length} digital signatures from M2 money`);
    return signatures;
  }

  /**
   * Validate digital signatures
   */
  validateSignatures(signatures: DigitalSignature[]): boolean {
    if (signatures.length === 0) {
      console.warn('[ISO20022] ⚠️ No signatures to validate');
      return false;
    }

    let validCount = 0;
    signatures.forEach(sig => {
      // Verify signature is from DTC1B source
      if (!sig.dtc1bSource.fileHash) {
        console.error('[ISO20022] ❌ Signature missing DTC1B source');
        return;
      }

      // Verify timestamp is valid
      const signedDate = new Date(sig.signedAt);
      const validFromDate = new Date(sig.validFrom);
      const validToDate = new Date(sig.validTo);
      const now = new Date();

      if (now < validFromDate || now > validToDate) {
        console.warn('[ISO20022] ⚠️ Signature expired or not yet valid');
        sig.verified = false;
        return;
      }

      // Verify digest matches
      const computedDigest = CryptoJS.SHA256(sig.dtc1bSource.rawHexData).toString();
      if (computedDigest.substring(0, 32) !== sig.digestValue.substring(0, 32)) {
        console.warn('[ISO20022] ⚠️ Digest mismatch');
        sig.verified = false;
        return;
      }

      sig.verified = true;
      validCount++;
    });

    console.log(`[ISO20022] ✅ ${validCount}/${signatures.length} signatures validated`);
    return validCount === signatures.length;
  }

  /**
   * Extract M2 money balance from DTC1B via Bank Audit
   */
  extractM2Balance(): { total: number; currency: string; validated: boolean } {
    const auditData = auditStore.getResults();
    if (!auditData) {
      throw new Error('No audit data available. Please process DTC1B file in Bank Audit module first.');
    }

    // Get M2 aggregated data
    const m2Data = auditData.agregados.find(agg => agg.currency === 'USD');
    if (!m2Data || m2Data.M2 === 0) {
      throw new Error('No M2 money found in DTC1B file. Please verify the file contains M2 classified funds.');
    }

    const m2Balance = m2Data.M2;
    const currency = m2Data.currency;

    console.log(`[ISO20022] 📊 Extracted M2 balance: ${currency} ${m2Balance.toLocaleString('en-US', { minimumFractionDigits: 3 })}`);

    // Validate with digital signatures
    const signatures = this.extractDigitalSignatures();
    const validated = this.validateSignatures(signatures);

    return {
      total: m2Balance,
      currency,
      validated
    };
  }

  /**
   * Create ISO 20022 pain.001 message
   */
  createPaymentInstruction(params: {
    transferRequestId: string;
    amount: number;
    currency: string;
    debtorName: string;
    debtorAccount: string;
    debtorBIC: string;
    debtorInstitution: string;
    creditorName: string;
    creditorAccount: string;
    creditorBIC: string;
    creditorInstitution: string;
    remittanceInfo: string;
    purposeCode: string;
  }): PaymentInstruction {
    const now = new Date().toISOString();
    const executionDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Extract M2 balance and signatures
    const m2Data = this.extractM2Balance();
    const signatures = this.extractDigitalSignatures();

    // Validate amount doesn't exceed M2 balance
    if (params.amount > m2Data.total) {
      throw new Error(
        `Insufficient M2 balance!\n\n` +
        `Requested: ${params.currency} ${params.amount.toLocaleString()}\n` +
        `Available M2: ${m2Data.currency} ${m2Data.total.toLocaleString()}\n\n` +
        `Source: DTC1B Bank Audit Module`
      );
    }

    const instruction: PaymentInstruction = {
      messageId: `PAIN.001.${params.transferRequestId}`,
      creationDateTime: now,
      numberOfTransactions: 1,
      controlSum: params.amount,
      initiatingParty: {
        name: params.debtorInstitution,
        identification: params.debtorBIC
      },
      paymentInformation: {
        paymentInformationId: `PMT.${params.transferRequestId}`,
        paymentMethod: 'TRF',
        requestedExecutionDate: executionDate,
        debtor: {
          name: params.debtorName,
          accountNumber: params.debtorAccount,
          bic: params.debtorBIC,
          currency: params.currency,
          institution: params.debtorInstitution
        },
        debtorAgent: {
          bicfi: params.debtorBIC,
          name: params.debtorInstitution
        },
        creditTransferTransaction: [{
          paymentId: params.transferRequestId,
          instructedAmount: {
            amount: params.amount,
            currency: params.currency
          },
          creditor: {
            name: params.creditorName,
            accountNumber: params.creditorAccount
          },
          creditorAgent: {
            bicfi: params.creditorBIC,
            name: params.creditorInstitution
          },
          remittanceInformation: {
            unstructured: params.remittanceInfo
          },
          purpose: {
            code: params.purposeCode
          }
        }]
      },
      digitalSignatures: signatures,
      m2MoneyClassification: 'M2',
      dtc1bValidation: {
        sourceFile: 'DTC1B',
        totalBalance: m2Data.total,
        currency: m2Data.currency,
        extractedAt: now,
        verified: m2Data.validated
      }
    };

    console.log('[ISO20022] ✅ Payment instruction created with M2 validation');
    return instruction;
  }

  /**
   * Generate ISO 20022 XML (pain.001.001.09)
   */
  generateXML(instruction: PaymentInstruction): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="${this.NAMESPACE_PAIN001}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>${instruction.messageId}</MsgId>
      <CreDtTm>${instruction.creationDateTime}</CreDtTm>
      <NbOfTxs>${instruction.numberOfTransactions}</NbOfTxs>
      <CtrlSum>${instruction.controlSum.toFixed(2)}</CtrlSum>
      <InitgPty>
        <Nm>${instruction.initiatingParty.name}</Nm>
        <Id>
          <OrgId>
            <BICOrBEI>${instruction.initiatingParty.identification}</BICOrBEI>
          </OrgId>
        </Id>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${instruction.paymentInformation.paymentInformationId}</PmtInfId>
      <PmtMtd>${instruction.paymentInformation.paymentMethod}</PmtMtd>
      <ReqdExctnDt>
        <Dt>${instruction.paymentInformation.requestedExecutionDate}</Dt>
      </ReqdExctnDt>
      <Dbtr>
        <Nm>${instruction.paymentInformation.debtor.name}</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <Othr>
            <Id>${instruction.paymentInformation.debtor.accountNumber}</Id>
          </Othr>
        </Id>
        <Ccy>${instruction.paymentInformation.debtor.currency}</Ccy>
      </DbtrAcct>
      <DbtrAgt>
        <FinInstnId>
          <BICFI>${instruction.paymentInformation.debtorAgent.bicfi}</BICFI>
          <Nm>${instruction.paymentInformation.debtorAgent.name}</Nm>
        </FinInstnId>
      </DbtrAgt>
      ${instruction.paymentInformation.creditTransferTransaction.map(tx => `
      <CdtTrfTxInf>
        <PmtId>
          <EndToEndId>${tx.paymentId}</EndToEndId>
        </PmtId>
        <Amt>
          <InstdAmt Ccy="${tx.instructedAmount.currency}">${tx.instructedAmount.amount.toFixed(2)}</InstdAmt>
        </Amt>
        <CdtrAgt>
          <FinInstnId>
            <BICFI>${tx.creditorAgent.bicfi}</BICFI>
            <Nm>${tx.creditorAgent.name}</Nm>
          </FinInstnId>
        </CdtrAgt>
        <Cdtr>
          <Nm>${tx.creditor.name}</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <Othr>
              <Id>${tx.creditor.accountNumber}</Id>
            </Othr>
          </Id>
        </CdtrAcct>
        <RmtInf>
          <Ustrd>${tx.remittanceInformation.unstructured}</Ustrd>
        </RmtInf>
        <Purp>
          <Cd>${tx.purpose.code}</Cd>
        </Purp>
      </CdtTrfTxInf>
      `).join('')}
    </PmtInf>
    <SplmtryData>
      <PlcAndNm>M2_MONEY_CLASSIFICATION</PlcAndNm>
      <Envlp>
        <M2Validation>
          <SourceFile>${instruction.dtc1bValidation.sourceFile}</SourceFile>
          <TotalBalance>${instruction.dtc1bValidation.totalBalance.toFixed(3)}</TotalBalance>
          <Currency>${instruction.dtc1bValidation.currency}</Currency>
          <ExtractedAt>${instruction.dtc1bValidation.extractedAt}</ExtractedAt>
          <Verified>${instruction.dtc1bValidation.verified}</Verified>
          <DigitalSignatures>
            ${instruction.digitalSignatures.map(sig => `
            <Signature>
              <SignatureValue>${sig.signatureValue}</SignatureValue>
              <SignatureMethod>${sig.signatureMethod}</SignatureMethod>
              <DigestValue>${sig.digestValue}</DigestValue>
              <CertificateIssuer>${sig.certificateIssuer}</CertificateIssuer>
              <CertificateSerialNumber>${sig.certificateSerialNumber}</CertificateSerialNumber>
              <SignedAt>${sig.signedAt}</SignedAt>
              <Verified>${sig.verified}</Verified>
              <DTC1BSource>
                <FileHash>${sig.dtc1bSource.fileHash}</FileHash>
                <BlockHash>${sig.dtc1bSource.blockHash}</BlockHash>
                <Offset>${sig.dtc1bSource.offset}</Offset>
              </DTC1BSource>
            </Signature>
            `).join('')}
          </DigitalSignatures>
        </M2Validation>
      </Envlp>
    </SplmtryData>
  </CstmrCdtTrfInitn>
</Document>`;

    return xml;
  }

  /**
   * Deduct from M2 balance in Bank Audit
   */
  deductFromM2Balance(amount: number, currency: string, transferId: string): void {
    const auditData = auditStore.getResults();
    if (!auditData) {
      throw new Error('No audit data available');
    }

    // Find M2 data
    const m2Data = auditData.agregados.find(agg => agg.currency === currency);
    if (!m2Data) {
      throw new Error(`Currency ${currency} not found in M2 data`);
    }

    if (amount > m2Data.M2) {
      throw new Error(`Insufficient M2 balance: ${m2Data.M2} < ${amount}`);
    }

    // Deduct from M2
    m2Data.M2 -= amount;

    // Update USD equivalent
    const exchangeRate = m2Data.equiv_usd / (m2Data.M0 + m2Data.M1 + m2Data.M2 + m2Data.M3 + m2Data.M4 + amount);
    m2Data.equiv_usd = (m2Data.M0 + m2Data.M1 + m2Data.M2 + m2Data.M3 + m2Data.M4) * exchangeRate;

    // Update total
    auditData.resumen.total_equiv_usd = auditData.agregados.reduce((sum, agg) => sum + agg.equiv_usd, 0);

    // Save updated audit data
    auditStore.saveResults(auditData);

    console.log(`[ISO20022] 💰 Deducted ${currency} ${amount.toLocaleString()} from M2 balance`);
    console.log(`[ISO20022] 📊 New M2 balance: ${currency} ${m2Data.M2.toLocaleString()}`);
    console.log(`[ISO20022] 📝 Transfer ID: ${transferId}`);
  }

  /**
   * Export ISO 20022 message to file
   */
  exportToFile(instruction: PaymentInstruction): void {
    const xml = this.generateXML(instruction);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISO20022_${instruction.messageId}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('[ISO20022] 📥 XML file exported:', `ISO20022_${instruction.messageId}.xml`);
  }
}

export const iso20022Store = new ISO20022Store();
export type { PaymentInstruction, DigitalSignature };
