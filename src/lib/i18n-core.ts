/**
 * Internationalization (i18n) System - Core
 * Types and translations only (no React)
 */

export type Language = 'es' | 'en';

export interface Translations {
  // Header
  headerTitle: string;
  headerSubtitle: string;
  productionEnvironment: string;
  allSystemsOperational: string;
  dtcAnalysisReady: string;

  // Navigation
  navDashboard: string;
  navLedger: string;
  navXcpB2B: string;
  navProcessor: string;
  navBinaryReader: string;
  navAnalyzerPro: string;
  navLargeFileAnalyzer: string;
  navTransfers: string;
  navApiKeys: string;
  navAuditLogs: string;
  navBlackScreen: string;
  navAuditBank: string;
  navCustody: string;

  // Footer
  footerVersion: string;
  footerIsoCompliant: string;
  footerPciReady: string;
  footerMultiCurrency: string;
  footerEncryption: string;
  footerForensicAnalysis: string;

  // Common
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  close: string;
  refresh: string;
  export: string;
  import: string;
  download: string;
  upload: string;
  select: string;
  search: string;
  filter: string;
  clear: string;
  confirm: string;

  // Currency names
  currencyUSD: string;
  currencyEUR: string;
  currencyGBP: string;
  currencyCHF: string;
  currencyCAD: string;
  currencyAUD: string;
  currencyJPY: string;
  currencyCNY: string;
  currencyINR: string;
  currencyMXN: string;
  currencyBRL: string;
  currencyRUB: string;
  currencyKRW: string;
  currencySGD: string;
  currencyHKD: string;

  // Dashboard
  dashboardTitle: string;
  dashboardAccounts: string;
  dashboardTransactions: string;
  dashboardBalance: string;
  dashboardLoadFiles: string;
  dashboardGenerateSample: string;
  dashboardNoAccounts: string;
  dashboardWelcome: string;
  dashboardAnalyzedBalances: string;
  dashboardCurrenciesDetected: string;
  dashboardSavedInMemory: string;
  dashboardWelcomeTitle: string;
  dashboardWelcomeMessage: string;
  dashboardOrGenerateSample: string;
  dashboardViewDashboard: string;
  dashboardAccountsCount: string;
  dashboardBalancesTitle: string;
  dashboardBalancesSubtitle: string;
  dashboardBalancesSaved: string;
  dashboardDetails: string;
  dashboardRecentTransfers: string;
  dashboardNoTransfers: string;
  dashboardAccountInfo: string;
  dashboardErrorProcessing: string;
  dashboardErrorCreatingSample: string;
  dashboardNoCurrencyBlocks: string;
  dashboardFileProcessed: string;
  dashboardSampleCreated: string;
  dashboardUnknownError: string;

  // Ledger
  ledgerTitle: string;
  ledgerSubtitle: string;
  ledgerTotalAccounts: string;
  ledgerTotalTransactions: string;
  ledgerLastUpdate: string;
  ledgerStatus: string;
  ledgerOperational: string;
  ledgerNoData: string;
  ledgerUpdating: string;
  ledgerConnected: string;
  ledgerAccount: string;
  ledgerPrincipal: string;
  ledgerSecondary: string;
  ledgerTertiary: string;
  ledgerFourth: string;
  ledgerTotalBalance: string;
  ledgerAverage: string;
  ledgerHighest: string;
  ledgerLowest: string;
  ledgerUpdatedAt: string;
  ledgerOfCurrencies: string;
  ledgerProcessed: string;
  ledgerWaiting: string;
  ledgerNoAccountsLoaded: string;
  ledgerNoBalancesInLedger: string;
  ledgerUseAnalyzerToLoad: string;
  ledgerGoToAnalyzer: string;
  ledgerTransactions: string;

  // Large File Analyzer
  analyzerTitle: string;
  analyzerSubtitle: string;
  analyzerSelectFile: string;
  analyzerLoadSaved: string;
  analyzerPause: string;
  analyzerResume: string;
  analyzerStop: string;
  analyzerClearMemory: string;
  analyzerProcessing: string;
  analyzerCompleted: string;
  analyzerProgress: string;
  analyzerIndependentAccounts: string;
  analyzerGlobalSummary: string;
  analyzerUpdatingLedger: string;
  analyzerSyncingLedger: string;
  analyzerFileInfo: string;
  analyzerDetectedAlgorithm: string;
  analyzerEncryptionStatus: string;
  analyzerEncrypted: string;
  analyzerNotEncrypted: string;
  analyzerEntropy: string;
  analyzerHighEntropy: string;
  analyzerLowEntropy: string;
  analyzerTryDecrypt: string;
  analyzerLastTransactions: string;
  analyzerLoadFileForAnalysis: string;
  analyzerCurrenciesDetected: string;

  // XCP B2B API
  xcpTitle: string;
  xcpSubtitle: string;
  xcpSecurityFeatures: string;
  xcpAuthentication: string;
  xcpObtainToken: string;
  xcpTokenActive: string;
  xcpTokenValid: string;
  xcpAvailableBalances: string;
  xcpFundsFromAnalyzer: string;
  xcpBalanceSelected: string;
  xcpCreateRemittance: string;
  xcpAmount: string;
  xcpDestinationAccount: string;
  xcpReference: string;
  xcpPurposeCode: string;
  xcpBeneficiaryName: string;
  xcpBeneficiaryIban: string;
  xcpUrgent: string;
  xcpUrgentNote: string;
  xcpSubmit: string;
  xcpProcessing: string;
  xcpRemittanceStatus: string;
  xcpTransactionId: string;
  xcpStatus: string;
  xcpCreated: string;
  xcpCompleted: string;
  xcpTransferCompleted: string;
  xcpFundsTransferred: string;
  xcpMtls: string;
  xcpTlsVersion: string;
  xcpHmac: string;
  xcpHmacAlgo: string;
  xcpJwt: string;
  xcpBearerAuth: string;
  xcpAntiReplay: string;
  xcpTimeWindow: string;
  xcpEndpoint: string;
  xcpAuth: string;
  xcpRequired: string;
  xcpCompleteDocumentation: string;
  xcpDocumentationText: string;
  xcpMtlsImplementation: string;
  xcpHmacSigning: string;
  xcpAutoRetry: string;
  xcpSchemaValidation: string;

  // Messages
  msgBalancesLoaded: string;
  msgBalancesCleared: string;
  msgConfirmClear: string;
  msgInsufficientBalance: string;
  msgTokenRequired: string;
  msgFieldsRequired: string;
  msgProcessingFile: string;
  msgAnalysisComplete: string;
  msgErrorOccurred: string;

  // Validation Messages
  validationNoCapitalTitle: string;
  validationNoCapitalAccount: string;
  validationNoCapitalBalanceTotal: string;
  validationNoCapitalBalanceAvailable: string;
  validationNoCapitalBalanceReserved: string;
  validationNoCapitalMessage: string;
  validationNoCapitalSolution: string;
  validationNoCapitalSolution1: string;
  validationNoCapitalSolution2: string;
  validationAmountExceedsTitle: string;
  validationAmountExceedsRequested: string;
  validationAmountExceedsAvailable: string;
  validationAmountExceedsMessage: string;
  validationDuplicatePledgeTitle: string;
  validationDuplicatePledgeMessage: string;
  validationDuplicatePledgeSolution: string;
  validationDuplicatePledgeSolution1: string;
  validationDuplicatePledgeSolution2: string;
  
  // Time
  timeSeconds: string;
  timeMinutes: string;
  timeHours: string;
  timeDays: string;

  // Black Screen
  blackScreenTitle: string;
  blackScreenSubtitle: string;
  blackScreenGenerator: string;
  blackScreenAvailableAccounts: string;
  blackScreenNoBalances: string;
  blackScreenUseAnalyzer: string;
  blackScreenGenerate: string;
  blackScreenConfidential: string;
  blackScreenDownloadTxt: string;
  blackScreenPrint: string;
  blackScreenClose: string;
  blackScreenBankConfirmation: string;
  blackScreenXcpBank: string;
  blackScreenDocumentConfidential: string;
  blackScreenBeneficiaryInfo: string;
  blackScreenHolder: string;
  blackScreenAccount: string;
  blackScreenBank: string;
  blackScreenSwift: string;
  blackScreenRoutingNumber: string;
  blackScreenCurrency: string;
  blackScreenMonetaryAggregates: string;
  blackScreenM1Liquid: string;
  blackScreenM1Description: string;
  blackScreenM2Near: string;
  blackScreenM2Description: string;
  blackScreenM3Broad: string;
  blackScreenM3Description: string;
  blackScreenM4Total: string;
  blackScreenM4Description: string;
  blackScreenVerifiedBalance: string;
  blackScreenTechnicalInfo: string;
  blackScreenDtcReference: string;
  blackScreenVerificationHash: string;
  blackScreenTransactionsProcessed: string;
  blackScreenIssueDate: string;
  blackScreenExpiryDate: string;
  blackScreenVerificationStatus: string;
  blackScreenVerified: string;
  blackScreenCertification: string;
  blackScreenCertificationText: string;
  blackScreenCertificationStandards: string;
  blackScreenDigitallySigned: string;
  blackScreenGeneratedBy: string;
  blackScreenCopyright: string;
  blackScreenMasterAccount: string;
  blackScreenInternational: string;
  blackScreenTotalAvailable: string;
  blackScreenPrincipal: string;

  // Login
  loginTitle: string;
  loginSubtitle: string;
  loginUser: string;
  loginPassword: string;
  loginShowPassword: string;
  loginHidePassword: string;
  loginButton: string;
  loginAuthenticating: string;
  loginInvalidCredentials: string;
  loginTooManyAttempts: string;
  loginAttempts: string;
  loginSecureConnection: string;
  loginCopyright: string;
  loginVersion: string;
  loginAllRightsReserved: string;

  // App Header
  logout: string;
  logoutTitle: string;

  // Advanced Banking Dashboard
  advDashboardTitle: string;
  advDashboardSubtitle: string;
  advDashboardTotalBalance: string;
  advDashboardActiveAccounts: string;
  advDashboardTransactions: string;
  advDashboardMovements: string;
  advDashboardDebits: string;
  advDashboardCredits: string;
  advDashboardFees: string;
  advDashboardLedgerAccounts: string;
  advDashboardCurrencyDistribution: string;
  advDashboardTransactionHistory: string;
  advDashboardNoTransactions: string;
  advDashboardNoTransactionsMessage: string;
  advDashboardAllPeriods: string;
  advDashboardLast24h: string;
  advDashboardLast7d: string;
  advDashboardLast30d: string;
  advDashboardAllCurrencies: string;
  advDashboardUpdate: string;
  advDashboardUpdating: string;
  advDashboardHideBalance: string;
  advDashboardShowBalance: string;
  advDashboardConvertedBalance: string;

  // Audit Bank Panel
  auditTitle: string;
  auditSubtitle: string;
  auditStartScan: string;
  auditScanning: string;
  auditStopScan: string;
  auditExportJson: string;
  auditExportCsv: string;
  auditTotalFindings: string;
  auditFilesScanned: string;
  auditBanksDetected: string;
  auditAccountsFound: string;
  auditTotalAmount: string;
  auditClassifications: string;
  auditM0Cash: string;
  auditM1Demand: string;
  auditM2Savings: string;
  auditM3Institutional: string;
  auditM4Instruments: string;
  auditFindings: string;
  auditNoFindings: string;
  auditLoadResults: string;
  auditFile: string;
  auditBank: string;
  auditAccount: string;
  auditAmount: string;
  auditCurrency: string;
  auditClassification: string;
  auditConfidence: string;
  auditEvidence: string;
  auditDetectedAt: string;
  auditAggregatedTotals: string;
  auditEquivUsd: string;
  auditSecurityNote: string;
  auditSecurityMessage: string;
  auditConfigureDataPath: string;
  auditDataPath: string;
  auditProcessing: string;
  auditComplete: string;
  auditError: string;
  auditM0Description: string;
  auditM1Description: string;
  auditM2Description: string;
  auditM3Description: string;
  auditM4Description: string;
  auditLoadFile: string;
  auditMaskedView: string;
  auditCompleteView: string;
  auditClearData: string;
  auditDataSources: string;
  auditAnalyzerIntegration: string;
  auditAnalyzerDescription: string;
  auditActiveSubscription: string;
  auditAutoSync: string;
  auditSystemBalances: string;
  auditAnalyzeBalances: string;
  auditMonetaryClassification: string;
  auditDetailedFindings: string;
  auditScrollToSeeAll: string;
  auditViewFullReport: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    // Header
    headerTitle: 'CoreBanking System',
    headerSubtitle: 'DAES Data and Exchange Settlement',
    productionEnvironment: 'Entorno de Producción',
    allSystemsOperational: '● Todos los Sistemas Operativos',
    dtcAnalysisReady: '● Análisis Digital Commercial Bank Ltd Listo',

    // Navigation
    navDashboard: 'Dashboard',
    navLedger: 'Ledger Cuentas',
    navXcpB2B: 'API XCP B2B',
    navProcessor: 'Digital Commercial Bank Ltd Processor',
    navBinaryReader: 'Binary Reader',
    navAnalyzerPro: 'Analizador Digital Commercial Bank Ltd Pro',
    navLargeFileAnalyzer: 'Analizador Archivos Grandes',
    navTransfers: 'Transfers',
    navApiKeys: 'API Keys',
    navAuditLogs: 'Audit Logs',
    navBlackScreen: 'Black Screen',
    navAuditBank: 'Auditoría Bancaria',
    navCustody: 'Cuentas Custodio',

    // Footer
    footerVersion: 'CoreBanking v1.0.0',
    footerIsoCompliant: 'ISO 4217 Compliant',
    footerPciReady: 'PCI-DSS Ready',
    footerMultiCurrency: 'Multi-Currency: USD • EUR • GBP • CHF',
    footerEncryption: 'Encryption: AES-256-GCM',
    footerForensicAnalysis: 'Análisis Forense Digital Commercial Bank Ltd',

    // Common
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Cerrar',
    refresh: 'Refrescar',
    export: 'Exportar',
    import: 'Importar',
    download: 'Descargar',
    upload: 'Cargar',
    select: 'Seleccionar',
    search: 'Buscar',
    filter: 'Filtrar',
    clear: 'Limpiar',
    confirm: 'Confirmar',

    // Currency names
    currencyUSD: 'Dólares (USD)',
    currencyEUR: 'Euros (EUR)',
    currencyGBP: 'Libras (GBP)',
    currencyCHF: 'Francos (CHF)',
    currencyCAD: 'Dólares Canadienses',
    currencyAUD: 'Dólares Australianos',
    currencyJPY: 'Yenes',
    currencyCNY: 'Yuan',
    currencyINR: 'Rupias',
    currencyMXN: 'Pesos Mexicanos',
    currencyBRL: 'Reales',
    currencyRUB: 'Rublos',
    currencyKRW: 'Won',
    currencySGD: 'Dólares Singapur',
    currencyHKD: 'Dólares Hong Kong',

    // Dashboard
    dashboardTitle: 'Dashboard',
    dashboardAccounts: 'cuentas',
    dashboardTransactions: 'transacciones',
    dashboardBalance: 'Balance',
    dashboardLoadFiles: 'Cargar Archivos',
    dashboardGenerateSample: 'O Generar Archivo de Muestra',
    dashboardNoAccounts: 'Sin cuentas',
    dashboardWelcome: 'Bienvenido al Sistema CoreBanking',
    dashboardAnalyzedBalances: 'Balances Analizados del Archivo Grande',
    dashboardCurrenciesDetected: 'monedas',
    dashboardSavedInMemory: 'Los balances están guardados en memoria y disponibles para transferencias API',
    dashboardWelcomeTitle: 'Bienvenido al Sistema CoreBanking',
    dashboardWelcomeMessage: 'Para comenzar, carga un archivo Digital Commercial Bank Ltd desde tu disco local. El sistema detectará automáticamente los bloques de moneda y creará las cuentas correspondientes.',
    dashboardOrGenerateSample: 'O Generar Archivo de Muestra',
    dashboardViewDashboard: 'Ver Dashboard',
    dashboardAccountsCount: 'accounts',
    dashboardBalancesTitle: 'Balances Analizados del Archivo Grande',
    dashboardBalancesSubtitle: 'transacciones',
    dashboardBalancesSaved: 'Los balances están guardados en memoria y disponibles para transferencias API',
    dashboardDetails: 'Detalles',
    dashboardRecentTransfers: 'Transferencias Recientes',
    dashboardNoTransfers: 'Sin transferencias',
    dashboardAccountInfo: 'Información de Cuenta',
    dashboardErrorProcessing: 'Error al procesar el archivo',
    dashboardErrorCreatingSample: 'Error al crear archivo de muestra',
    dashboardNoCurrencyBlocks: 'No se detectaron bloques de moneda en el archivo. Verifica que sea un archivo Digital Commercial Bank Ltd válido.',
    dashboardFileProcessed: 'Archivo procesado exitosamente. Se crearon {count} cuentas.',
    dashboardSampleCreated: 'Archivo de muestra creado. Se generaron {count} cuentas.',
    dashboardUnknownError: 'Error desconocido',

    // Ledger
    ledgerTitle: 'Account Ledger - Libro Mayor de Cuentas',
    ledgerSubtitle: 'Actualización en tiempo real desde el Analizador Digital Commercial Bank Ltd',
    ledgerTotalAccounts: 'Total Cuentas',
    ledgerTotalTransactions: 'Total Transacciones',
    ledgerLastUpdate: 'Última Actualización',
    ledgerStatus: 'Estado',
    ledgerOperational: 'Operativo',
    ledgerNoData: 'Sin Datos',
    ledgerUpdating: 'Actualizando...',
    ledgerConnected: 'Sistema conectado',
    ledgerAccount: 'Cuenta',
    ledgerPrincipal: 'PRINCIPAL',
    ledgerSecondary: 'SECUNDARIA',
    ledgerTertiary: 'TERCIARIA',
    ledgerFourth: 'CUARTA',
    ledgerTotalBalance: 'Balance Total',
    ledgerAverage: 'Promedio',
    ledgerHighest: 'Mayor',
    ledgerLowest: 'Menor',
    ledgerUpdatedAt: 'Actualizado',
    ledgerOfCurrencies: 'de 15 monedas',
    ledgerProcessed: 'procesadas',
    ledgerWaiting: 'En espera',
    ledgerNoAccountsLoaded: 'Sin Cuentas Cargadas',
    ledgerNoBalancesInLedger: 'No hay balances en el libro mayor. Usa el Analizador de Archivos Grandes para cargar datos.',
    ledgerUseAnalyzerToLoad: 'Usa el Analizador de Archivos Grandes para cargar datos',
    ledgerGoToAnalyzer: 'Ve al Analizador →',
    ledgerTransactions: 'transacciones',

    // Large File Analyzer
    analyzerTitle: 'Analizador de Archivos Grandes Digital Commercial Bank Ltd',
    analyzerSubtitle: 'Procesamiento por bloques con extracción de balances en tiempo real',
    analyzerSelectFile: 'Seleccionar Archivo Digital Commercial Bank Ltd',
    analyzerLoadSaved: 'Cargar Balances Guardados',
    analyzerPause: 'Pausar',
    analyzerResume: 'Reanudar',
    analyzerStop: 'Detener',
    analyzerClearMemory: 'Borrar Memoria',
    analyzerProcessing: 'Procesando...',
    analyzerCompleted: 'Completado',
    analyzerProgress: 'Progreso',
    analyzerIndependentAccounts: 'Cuentas Independientes por Moneda',
    analyzerGlobalSummary: 'RESUMEN GLOBAL',
    analyzerUpdatingLedger: 'Actualizando Ledger en Tiempo Real',
    analyzerSyncingLedger: 'Sincronizando con Ledger',
    analyzerFileInfo: 'Información del Archivo',
    analyzerDetectedAlgorithm: 'Algoritmo Detectado',
    analyzerEncryptionStatus: 'Estado de Encriptación',
    analyzerEncrypted: 'Encriptado',
    analyzerNotEncrypted: 'No Encriptado',
    analyzerEntropy: 'Análisis de Entropía',
    analyzerHighEntropy: 'ALTA ENTROPÍA',
    analyzerLowEntropy: 'BAJA ENTROPÍA',
    analyzerTryDecrypt: 'Intentar Desencriptar',
    analyzerLastTransactions: 'Últimas 10 transacciones encontradas:',
    analyzerLoadFileForAnalysis: 'Cargar Archivo para Análisis',
    analyzerCurrenciesDetected: 'monedas detectadas',

    // XCP B2B API
    xcpTitle: 'XCP B2B API - Remesas Internacionales',
    xcpSubtitle: 'Transferencias bancarias seguras con mTLS + HMAC-SHA256',
    xcpSecurityFeatures: 'Características de Seguridad',
    xcpAuthentication: 'Autenticación JWT',
    xcpObtainToken: 'Obtener Token JWT',
    xcpTokenActive: 'Token Activo',
    xcpTokenValid: 'Token válido por 60 minutos',
    xcpAvailableBalances: 'Balances Disponibles',
    xcpFundsFromAnalyzer: 'Fondos cargados desde el analizador Digital Commercial Bank Ltd',
    xcpBalanceSelected: 'Balance seleccionado',
    xcpCreateRemittance: 'Crear Remesa Internacional',
    xcpAmount: 'Monto',
    xcpDestinationAccount: 'Cuenta Destino',
    xcpReference: 'Referencia',
    xcpPurposeCode: 'Código de Propósito',
    xcpBeneficiaryName: 'Nombre del Beneficiario',
    xcpBeneficiaryIban: 'IBAN del Beneficiario',
    xcpUrgent: 'Transferencia Urgente',
    xcpUrgentNote: 'cargos adicionales aplican',
    xcpSubmit: 'Crear Remesa',
    xcpProcessing: 'Procesando Remesa...',
    xcpRemittanceStatus: 'Estado de la Remesa',
    xcpTransactionId: 'ID de Transacción',
    xcpStatus: 'Estado',
    xcpCreated: 'Creado',
    xcpCompleted: 'Completado',
    xcpTransferCompleted: 'Transferencia Completada',
    xcpFundsTransferred: 'Los fondos han sido transferidos exitosamente',
    xcpMtls: 'mTLS',
    xcpTlsVersion: 'TLS ≥ 1.2',
    xcpHmac: 'HMAC',
    xcpHmacAlgo: 'SHA-256',
    xcpJwt: 'JWT',
    xcpBearerAuth: 'Bearer Auth',
    xcpAntiReplay: 'Anti-Replay',
    xcpTimeWindow: '±5 min',
    xcpEndpoint: 'Endpoint',
    xcpAuth: 'Auth',
    xcpRequired: '*',
    xcpCompleteDocumentation: 'Documentación Completa',
    xcpDocumentationText: 'Para integración completa del módulo XCP B2B, consulta la documentación en src/xcp-b2b/README.md',
    xcpMtlsImplementation: '• Implementación mTLS con certificados cliente',
    xcpHmacSigning: '• Firma HMAC-SHA256 de todas las solicitudes',
    xcpAutoRetry: '• Manejo automático de reintentos con backoff exponencial',
    xcpSchemaValidation: '• Validación de esquemas con Zod',

    // Messages
    msgBalancesLoaded: 'Balances cargados desde memoria',
    msgBalancesCleared: 'Balances borrados de la memoria',
    msgConfirmClear: '¿Estás seguro de que quieres borrar todos los balances guardados?',
    msgInsufficientBalance: 'Balance insuficiente',
    msgTokenRequired: 'Debe obtener un token primero',
    msgFieldsRequired: 'Complete todos los campos requeridos',
    msgProcessingFile: 'Procesando archivo',
    msgAnalysisComplete: 'Análisis Completado',
    msgErrorOccurred: 'Error al procesar',

    // Validation Messages
    validationNoCapitalTitle: 'SIN CAPITAL DISPONIBLE',
    validationNoCapitalAccount: 'Cuenta',
    validationNoCapitalBalanceTotal: 'Balance Total',
    validationNoCapitalBalanceAvailable: 'Balance Disponible',
    validationNoCapitalBalanceReserved: 'Balance Reservado',
    validationNoCapitalMessage: 'No se puede crear pledge sin capital disponible.',
    validationNoCapitalSolution: 'Solución:',
    validationNoCapitalSolution1: 'Libera el pledge existente de esta cuenta, o',
    validationNoCapitalSolution2: 'Usa una cuenta custody con balance disponible',
    validationAmountExceedsTitle: 'MONTO EXCEDE DISPONIBLE',
    validationAmountExceedsRequested: 'Solicitado',
    validationAmountExceedsAvailable: 'Disponible',
    validationAmountExceedsMessage: 'Reduce el monto del pledge o selecciona otra cuenta.',
    validationDuplicatePledgeTitle: 'PLEDGE DUPLICADO DETECTADO',
    validationDuplicatePledgeMessage: 'Ya existe un pledge ACTIVO para esta cuenta custody.\nNo se puede desplegar el mismo capital dos veces.',
    validationDuplicatePledgeSolution: 'Solución:',
    validationDuplicatePledgeSolution1: 'Libera el pledge existente primero, o',
    validationDuplicatePledgeSolution2: 'Usa una cuenta custody diferente',

    // Time
    timeSeconds: 'segundos',
    timeMinutes: 'minutos',
    timeHours: 'horas',
    timeDays: 'días',

    // Black Screen
    blackScreenTitle: 'Bank Black Screen Bancario',
    blackScreenSubtitle: 'Sistema de Confirmaciones Bancarias Profesionales',
    blackScreenGenerator: 'Generador de Black Screens',
    blackScreenAvailableAccounts: 'Cuentas Disponibles',
    blackScreenNoBalances: 'No hay balances cargados en el Ledger',
    blackScreenUseAnalyzer: 'Usa el Analizador de Archivos Grandes para cargar balances',
    blackScreenGenerate: 'Generar Black Screen',
    blackScreenConfidential: 'CONFIDENCIAL - DOCUMENTO BANCARIO',
    blackScreenDownloadTxt: 'Descargar TXT',
    blackScreenPrint: 'Imprimir',
    blackScreenClose: 'Cerrar',
    blackScreenBankConfirmation: 'BANK BLACK SCREEN - CONFIRMACIÓN BANCARIA OFICIAL',
    blackScreenXcpBank: 'DAES - DATA AND EXCHANGE SETTLEMENT',
    blackScreenDocumentConfidential: 'DOCUMENTO CONFIDENCIAL - SOLO PARA USO BANCARIO AUTORIZADO',
    blackScreenBeneficiaryInfo: 'INFORMACIÓN DEL BENEFICIARIO',
    blackScreenHolder: 'Titular',
    blackScreenAccount: 'Cuenta',
    blackScreenBank: 'Banco',
    blackScreenSwift: 'SWIFT',
    blackScreenRoutingNumber: 'Routing Number',
    blackScreenCurrency: 'Moneda',
    blackScreenMonetaryAggregates: 'AGREGADOS MONETARIOS (MONETARY AGGREGATES)',
    blackScreenM1Liquid: 'M1 (Activos Líquidos)',
    blackScreenM1Description: 'Efectivo y depósitos a la vista',
    blackScreenM2Near: 'M2 (Casi Dinero)',
    blackScreenM2Description: 'M1 + Depósitos de ahorro + Pequeños depósitos a plazo',
    blackScreenM3Broad: 'M3 (Dinero en Sentido Amplio)',
    blackScreenM3Description: 'M2 + Grandes depósitos a plazo',
    blackScreenM4Total: 'M4 (Total Activos Líquidos)',
    blackScreenM4Description: 'M3 + Instrumentos del mercado monetario negociables',
    blackScreenVerifiedBalance: 'BALANCE TOTAL VERIFICADO',
    blackScreenTechnicalInfo: 'INFORMACIÓN TÉCNICA Digital Commercial Bank Ltd',
    blackScreenDtcReference: 'Referencia Digital Commercial Bank Ltd',
    blackScreenVerificationHash: 'Hash de Verificación',
    blackScreenTransactionsProcessed: 'Transacciones Procesadas',
    blackScreenIssueDate: 'Fecha de Emisión',
    blackScreenExpiryDate: 'Fecha de Vencimiento',
    blackScreenVerificationStatus: 'Estado de Verificación',
    blackScreenVerified: 'VERIFICADO Y CERTIFICADO',
    blackScreenCertification: 'CERTIFICACIÓN BANCARIA OFICIAL',
    blackScreenCertificationText: 'Este documento certifica que los fondos arriba mencionados están disponibles y verificados según los estándares internacionales bancarios y de liquidación.',
    blackScreenCertificationStandards: 'Conforme con estándares: SWIFT MT799/MT999, FEDWIRE, DTC (Depository Trust Company), ISO 20022',
    blackScreenDigitallySigned: 'FIRMADO DIGITALMENTE',
    blackScreenGeneratedBy: 'Generado por',
    blackScreenCopyright: 'DAES CoreBanking - Data and Exchange Settlement',
    blackScreenMasterAccount: 'DAES MASTER ACCOUNT',
    blackScreenInternational: 'DAES - DATA AND EXCHANGE SETTLEMENT',
    blackScreenTotalAvailable: 'Disponible',
    blackScreenPrincipal: 'Principal',

    // Login
    loginTitle: 'DAES SYSTEM',
    loginSubtitle: 'Data and Exchange Settlement',
    loginUser: 'Usuario',
    loginPassword: 'Contraseña',
    loginShowPassword: 'Mostrar contraseña',
    loginHidePassword: 'Ocultar contraseña',
    loginButton: 'ACCEDER AL SISTEMA',
    loginAuthenticating: 'AUTENTICANDO...',
    loginInvalidCredentials: 'Credenciales incorrectas. Acceso denegado.',
    loginTooManyAttempts: 'Demasiados intentos fallidos. Sistema bloqueado por 30 segundos.',
    loginAttempts: 'Intentos',
    loginSecureConnection: 'Conexión segura • AES-256-GCM • mTLS',
    loginCopyright: '© 2025 DAES CoreBanking System',
    loginVersion: 'v3.0.0',
    loginAllRightsReserved: 'Todos los derechos reservados',

    // App Header
    logout: 'Salir',
    logoutTitle: 'Cerrar Sesión',

    // Advanced Banking Dashboard
    advDashboardTitle: 'Dashboard Bancario',
    advDashboardSubtitle: 'Sistema de gestión financiera avanzado',
    advDashboardTotalBalance: 'Balance Total',
    advDashboardActiveAccounts: 'Cuentas Activas',
    advDashboardTransactions: 'Transacciones',
    advDashboardMovements: 'Movimientos',
    advDashboardDebits: 'Débitos',
    advDashboardCredits: 'Créditos',
    advDashboardFees: 'Comisiones',
    advDashboardLedgerAccounts: 'Cuentas del Ledger (15 Divisas)',
    advDashboardCurrencyDistribution: 'Distribución por Moneda',
    advDashboardTransactionHistory: 'Historial de Transacciones',
    advDashboardNoTransactions: 'No hay transacciones para mostrar',
    advDashboardNoTransactionsMessage: 'Las transacciones aparecerán aquí cuando realices operaciones',
    advDashboardAllPeriods: 'Todas',
    advDashboardLast24h: 'Últimas 24h',
    advDashboardLast7d: 'Última semana',
    advDashboardLast30d: 'Último mes',
    advDashboardAllCurrencies: 'Todas las monedas',
    advDashboardUpdate: 'Actualizar',
    advDashboardUpdating: 'Actualizando...',
    advDashboardHideBalance: 'Ocultar balance',
    advDashboardShowBalance: 'Mostrar balance',
    advDashboardConvertedBalance: 'Balance Total Convertido',

    // Audit Bank Panel
    auditTitle: 'Panel de Auditoría Bancaria',
    auditSubtitle: 'Detección automática de activos financieros con clasificación M0-M4',
    auditStartScan: 'Iniciar Escaneo',
    auditScanning: 'Escaneando...',
    auditStopScan: 'Detener Escaneo',
    auditExportJson: 'Exportar JSON',
    auditExportCsv: 'Exportar CSV',
    auditTotalFindings: 'Total de Hallazgos',
    auditFilesScanned: 'Archivos Escaneados',
    auditBanksDetected: 'Bancos Detectados',
    auditAccountsFound: 'Cuentas Encontradas',
    auditTotalAmount: 'Monto Total',
    auditClassifications: 'Clasificaciones Monetarias',
    auditM0Cash: 'M0 - Efectivo',
    auditM1Demand: 'M1 - Depósitos a la Vista',
    auditM2Savings: 'M2 - Ahorro',
    auditM3Institutional: 'M3 - Institucional',
    auditM4Instruments: 'M4 - Instrumentos Financieros',
    auditFindings: 'Hallazgos Detallados',
    auditNoFindings: 'No se encontraron hallazgos',
    auditLoadResults: 'Cargar Resultados',
    auditFile: 'Archivo',
    auditBank: 'Banco',
    auditAccount: 'Cuenta',
    auditAmount: 'Monto',
    auditCurrency: 'Moneda',
    auditClassification: 'Clasificación',
    auditConfidence: 'Confianza',
    auditEvidence: 'Evidencia',
    auditDetectedAt: 'Detectado',
    auditAggregatedTotals: 'Totales Agregados por Moneda',
    auditEquivUsd: 'Equiv. USD',
    auditSecurityNote: 'Nota de Seguridad',
    auditSecurityMessage: 'Los números de cuenta se enmascaran automáticamente. Los valores completos se almacenan cifrados (AES-256) cumpliendo ISO 27001 / AML / FATF.',
    auditConfigureDataPath: 'Configurar Ruta de Datos',
    auditDataPath: 'Ruta de Datos Digital Commercial Bank Ltd',
    auditProcessing: 'Procesando archivos...',
    auditComplete: 'Escaneo completado',
    auditError: 'Error durante el escaneo',
    auditM0Description: 'Efectivo físico, billetes, monedas',
    auditM1Description: 'Cuentas corrientes, depósitos a la vista',
    auditM2Description: 'Ahorro, depósitos a plazo < 1 año',
    auditM3Description: 'Depósitos institucionales > 1M USD',
    auditM4Description: 'Repos, MTNs, SKRs, commercial paper',
    auditLoadFile: 'Cargar Archivo Digital Commercial Bank Ltd',
    auditMaskedView: 'Vista Enmascarada',
    auditCompleteView: 'Vista Completa',
    auditClearData: 'Limpiar',
    auditDataSources: 'Fuentes de Datos',
    auditAnalyzerIntegration: 'Integración con Analizador de Archivos Grandes',
    auditAnalyzerDescription: 'Bank Audit está escuchando datos del Analizador en tiempo real. Cuando proceses un archivo Digital Commercial Bank Ltd en el Analizador, los datos aparecerán AUTOMÁTICAMENTE aquí.',
    auditActiveSubscription: 'Suscripción activa',
    auditAutoSync: 'Sincronización automática',
    auditSystemBalances: 'Balances del Sistema',
    auditAnalyzeBalances: 'Analizar Balances del Sistema',
    auditMonetaryClassification: 'Clasificación Monetaria M0-M4',
    auditDetailedFindings: 'Hallazgos Detallados',
    auditScrollToSeeAll: 'Scroll para ver todos',
    auditViewFullReport: 'VER INFORME COMPLETO',
  },

  en: {
    // Header
    headerTitle: 'CoreBanking System',
    headerSubtitle: 'DAES Data and Exchange Settlement',
    productionEnvironment: 'Production Environment',
    allSystemsOperational: '● All Systems Operational',
    dtcAnalysisReady: '● Digital Commercial Bank Ltd Analysis Ready',

    // Navigation
    navDashboard: 'Dashboard',
    navLedger: 'Account Ledger',
    navXcpB2B: 'XCP B2B API',
    navProcessor: 'Digital Commercial Bank Ltd Processor',
    navBinaryReader: 'Binary Reader',
    navAnalyzerPro: 'Digital Commercial Bank Ltd Pro Analyzer',
    navLargeFileAnalyzer: 'Large File Analyzer',
    navTransfers: 'Transfers',
    navApiKeys: 'API Keys',
    navAuditLogs: 'Audit Logs',
    navBlackScreen: 'Black Screen',
    navAuditBank: 'Bank Audit',
    navCustody: 'Custody Accounts',

    // Footer
    footerVersion: 'CoreBanking v1.0.0',
    footerIsoCompliant: 'ISO 4217 Compliant',
    footerPciReady: 'PCI-DSS Ready',
    footerMultiCurrency: 'Multi-Currency: USD • EUR • GBP • CHF',
    footerEncryption: 'Encryption: AES-256-GCM',
    footerForensicAnalysis: 'Digital Commercial Bank Ltd Forensic Analysis',

    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    refresh: 'Refresh',
    export: 'Export',
    import: 'Import',
    download: 'Download',
    upload: 'Upload',
    select: 'Select',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    confirm: 'Confirm',

    // Currency names
    currencyUSD: 'US Dollars (USD)',
    currencyEUR: 'Euros (EUR)',
    currencyGBP: 'Pounds (GBP)',
    currencyCHF: 'Swiss Francs (CHF)',
    currencyCAD: 'Canadian Dollars',
    currencyAUD: 'Australian Dollars',
    currencyJPY: 'Japanese Yen',
    currencyCNY: 'Chinese Yuan',
    currencyINR: 'Indian Rupees',
    currencyMXN: 'Mexican Pesos',
    currencyBRL: 'Brazilian Reals',
    currencyRUB: 'Russian Rubles',
    currencyKRW: 'Korean Won',
    currencySGD: 'Singapore Dollars',
    currencyHKD: 'Hong Kong Dollars',

    // Dashboard
    dashboardTitle: 'Dashboard',
    dashboardAccounts: 'accounts',
    dashboardTransactions: 'transactions',
    dashboardBalance: 'Balance',
    dashboardLoadFiles: 'Load Files',
    dashboardGenerateSample: 'Or Generate Sample File',
    dashboardNoAccounts: 'No accounts',
    dashboardWelcome: 'Welcome to CoreBanking System',
    dashboardAnalyzedBalances: 'Analyzed Balances from Large File',
    dashboardCurrenciesDetected: 'currencies',
    dashboardSavedInMemory: 'Balances are stored in memory and available for API transfers',
    dashboardWelcomeTitle: 'Welcome to CoreBanking System',
    dashboardWelcomeMessage: 'To get started, load a Digital Commercial Bank Ltd file from your local disk. The system will automatically detect currency blocks and create the corresponding accounts.',
    dashboardOrGenerateSample: 'Or Generate Sample File',
    dashboardViewDashboard: 'View Dashboard',
    dashboardAccountsCount: 'accounts',
    dashboardBalancesTitle: 'Analyzed Balances from Large File',
    dashboardBalancesSubtitle: 'transactions',
    dashboardBalancesSaved: 'Balances are stored in memory and available for API transfers',
    dashboardDetails: 'Details',
    dashboardRecentTransfers: 'Recent Transfers',
    dashboardNoTransfers: 'No transfers',
    dashboardAccountInfo: 'Account Information',
    dashboardErrorProcessing: 'Error processing file',
    dashboardErrorCreatingSample: 'Error creating sample file',
    dashboardNoCurrencyBlocks: 'No currency blocks detected in the file. Verify that it is a valid Digital Commercial Bank Ltd file.',
    dashboardFileProcessed: 'File processed successfully. {count} accounts created.',
    dashboardSampleCreated: 'Sample file created. {count} accounts generated.',
    dashboardUnknownError: 'Unknown error',

    // Ledger
    ledgerTitle: 'Account Ledger - General Ledger',
    ledgerSubtitle: 'Real-time updates from Digital Commercial Bank Ltd Analyzer',
    ledgerTotalAccounts: 'Total Accounts',
    ledgerTotalTransactions: 'Total Transactions',
    ledgerLastUpdate: 'Last Update',
    ledgerStatus: 'Status',
    ledgerOperational: 'Operational',
    ledgerNoData: 'No Data',
    ledgerUpdating: 'Updating...',
    ledgerConnected: 'System connected',
    ledgerAccount: 'Account',
    ledgerPrincipal: 'PRIMARY',
    ledgerSecondary: 'SECONDARY',
    ledgerTertiary: 'TERTIARY',
    ledgerFourth: 'FOURTH',
    ledgerTotalBalance: 'Total Balance',
    ledgerAverage: 'Average',
    ledgerHighest: 'Highest',
    ledgerLowest: 'Lowest',
    ledgerUpdatedAt: 'Updated',
    ledgerOfCurrencies: 'of 15 currencies',
    ledgerProcessed: 'processed',
    ledgerWaiting: 'Waiting',
    ledgerNoAccountsLoaded: 'No Accounts Loaded',
    ledgerNoBalancesInLedger: 'No balances in the ledger. Use the Large File Analyzer to load data.',
    ledgerUseAnalyzerToLoad: 'Use the Large File Analyzer to load data',
    ledgerGoToAnalyzer: 'Go to Analyzer →',
    ledgerTransactions: 'transactions',

    // Large File Analyzer
    analyzerTitle: 'Large File Digital Commercial Bank Ltd Analyzer',
    analyzerSubtitle: 'Block processing with real-time balance extraction',
    analyzerSelectFile: 'Select Digital Commercial Bank Ltd File',
    analyzerLoadSaved: 'Load Saved Balances',
    analyzerPause: 'Pause',
    analyzerResume: 'Resume',
    analyzerStop: 'Stop',
    analyzerClearMemory: 'Clear Memory',
    analyzerProcessing: 'Processing...',
    analyzerCompleted: 'Completed',
    analyzerProgress: 'Progress',
    analyzerIndependentAccounts: 'Independent Accounts by Currency',
    analyzerGlobalSummary: 'GLOBAL SUMMARY',
    analyzerUpdatingLedger: 'Updating Ledger in Real Time',
    analyzerSyncingLedger: 'Syncing with Ledger',
    analyzerFileInfo: 'File Information',
    analyzerDetectedAlgorithm: 'Detected Algorithm',
    analyzerEncryptionStatus: 'Encryption Status',
    analyzerEncrypted: 'Encrypted',
    analyzerNotEncrypted: 'Not Encrypted',
    analyzerEntropy: 'Entropy Analysis',
    analyzerHighEntropy: 'HIGH ENTROPY',
    analyzerLowEntropy: 'LOW ENTROPY',
    analyzerTryDecrypt: 'Try Decrypt',
    analyzerLastTransactions: 'Last 10 transactions found:',
    analyzerLoadFileForAnalysis: 'Load File for Analysis',
    analyzerCurrenciesDetected: 'currencies detected',

    // XCP B2B API
    xcpTitle: 'XCP B2B API - International Remittances',
    xcpSubtitle: 'Secure banking transfers with mTLS + HMAC-SHA256',
    xcpSecurityFeatures: 'Security Features',
    xcpAuthentication: 'JWT Authentication',
    xcpObtainToken: 'Obtain JWT Token',
    xcpTokenActive: 'Token Active',
    xcpTokenValid: 'Token valid for 60 minutes',
    xcpAvailableBalances: 'Available Balances',
    xcpFundsFromAnalyzer: 'Funds loaded from Digital Commercial Bank Ltd analyzer',
    xcpBalanceSelected: 'Selected balance',
    xcpCreateRemittance: 'Create International Remittance',
    xcpAmount: 'Amount',
    xcpDestinationAccount: 'Destination Account',
    xcpReference: 'Reference',
    xcpPurposeCode: 'Purpose Code',
    xcpBeneficiaryName: 'Beneficiary Name',
    xcpBeneficiaryIban: 'Beneficiary IBAN',
    xcpUrgent: 'Urgent Transfer',
    xcpUrgentNote: 'additional charges apply',
    xcpSubmit: 'Create Remittance',
    xcpProcessing: 'Processing Remittance...',
    xcpRemittanceStatus: 'Remittance Status',
    xcpTransactionId: 'Transaction ID',
    xcpStatus: 'Status',
    xcpCreated: 'Created',
    xcpCompleted: 'Completed',
    xcpTransferCompleted: 'Transfer Completed',
    xcpFundsTransferred: 'Funds have been successfully transferred',
    xcpMtls: 'mTLS',
    xcpTlsVersion: 'TLS ≥ 1.2',
    xcpHmac: 'HMAC',
    xcpHmacAlgo: 'SHA-256',
    xcpJwt: 'JWT',
    xcpBearerAuth: 'Bearer Auth',
    xcpAntiReplay: 'Anti-Replay',
    xcpTimeWindow: '±5 min',
    xcpEndpoint: 'Endpoint',
    xcpAuth: 'Auth',
    xcpRequired: '*',
    xcpCompleteDocumentation: 'Complete Documentation',
    xcpDocumentationText: 'For complete integration of the XCP B2B module, refer to the documentation at src/xcp-b2b/README.md',
    xcpMtlsImplementation: '• mTLS implementation with client certificates',
    xcpHmacSigning: '• HMAC-SHA256 signing of all requests',
    xcpAutoRetry: '• Automatic retry handling with exponential backoff',
    xcpSchemaValidation: '• Schema validation with Zod',

    // Messages
    msgBalancesLoaded: 'Balances loaded from memory',
    msgBalancesCleared: 'Balances cleared from memory',
    msgConfirmClear: 'Are you sure you want to delete all saved balances?',
    msgInsufficientBalance: 'Insufficient balance',
    msgTokenRequired: 'You must obtain a token first',
    msgFieldsRequired: 'Complete all required fields',
    msgProcessingFile: 'Processing file',
    msgAnalysisComplete: 'Analysis Complete',
    msgErrorOccurred: 'Error processing',

    // Validation Messages
    validationNoCapitalTitle: 'NO CAPITAL AVAILABLE',
    validationNoCapitalAccount: 'Account',
    validationNoCapitalBalanceTotal: 'Total Balance',
    validationNoCapitalBalanceAvailable: 'Available Balance',
    validationNoCapitalBalanceReserved: 'Reserved Balance',
    validationNoCapitalMessage: 'Cannot create pledge without available capital.',
    validationNoCapitalSolution: 'Solution:',
    validationNoCapitalSolution1: 'Release the existing pledge from this account, or',
    validationNoCapitalSolution2: 'Use a custody account with available balance',
    validationAmountExceedsTitle: 'AMOUNT EXCEEDS AVAILABLE',
    validationAmountExceedsRequested: 'Requested',
    validationAmountExceedsAvailable: 'Available',
    validationAmountExceedsMessage: 'Reduce the pledge amount or select another account.',
    validationDuplicatePledgeTitle: 'DUPLICATE PLEDGE DETECTED',
    validationDuplicatePledgeMessage: 'An ACTIVE pledge already exists for this custody account.\nThe same capital cannot be deployed twice.',
    validationDuplicatePledgeSolution: 'Solution:',
    validationDuplicatePledgeSolution1: 'Release the existing pledge first, or',
    validationDuplicatePledgeSolution2: 'Use a different custody account',

    // Time
    timeSeconds: 'seconds',
    timeMinutes: 'minutes',
    timeHours: 'hours',
    timeDays: 'days',

    // Black Screen
    blackScreenTitle: 'Banking Black Screen',
    blackScreenSubtitle: 'Professional Bank Confirmation System',
    blackScreenGenerator: 'Black Screen Generator',
    blackScreenAvailableAccounts: 'Available Accounts',
    blackScreenNoBalances: 'No balances loaded in Ledger',
    blackScreenUseAnalyzer: 'Use Large File Analyzer to load balances',
    blackScreenGenerate: 'Generate Black Screen',
    blackScreenConfidential: 'CONFIDENTIAL - BANKING DOCUMENT',
    blackScreenDownloadTxt: 'Download TXT',
    blackScreenPrint: 'Print',
    blackScreenClose: 'Close',
    blackScreenBankConfirmation: 'BANK BLACK SCREEN - OFFICIAL BANK CONFIRMATION',
    blackScreenXcpBank: 'DAES - DATA AND EXCHANGE SETTLEMENT',
    blackScreenDocumentConfidential: 'CONFIDENTIAL DOCUMENT - FOR AUTHORIZED BANKING USE ONLY',
    blackScreenBeneficiaryInfo: 'BENEFICIARY INFORMATION',
    blackScreenHolder: 'Account Holder',
    blackScreenAccount: 'Account',
    blackScreenBank: 'Bank',
    blackScreenSwift: 'SWIFT',
    blackScreenRoutingNumber: 'Routing Number',
    blackScreenCurrency: 'Currency',
    blackScreenMonetaryAggregates: 'MONETARY AGGREGATES',
    blackScreenM1Liquid: 'M1 (Liquid Assets)',
    blackScreenM1Description: 'Cash and demand deposits',
    blackScreenM2Near: 'M2 (Near Money)',
    blackScreenM2Description: 'M1 + Savings deposits + Small time deposits',
    blackScreenM3Broad: 'M3 (Broad Money)',
    blackScreenM3Description: 'M2 + Large time deposits',
    blackScreenM4Total: 'M4 (Total Liquid Assets)',
    blackScreenM4Description: 'M3 + Negotiable money market instruments',
    blackScreenVerifiedBalance: 'TOTAL VERIFIED BALANCE',
    blackScreenTechnicalInfo: 'Digital Commercial Bank Ltd TECHNICAL INFORMATION',
    blackScreenDtcReference: 'Digital Commercial Bank Ltd Reference',
    blackScreenVerificationHash: 'Verification Hash',
    blackScreenTransactionsProcessed: 'Transactions Processed',
    blackScreenIssueDate: 'Issue Date',
    blackScreenExpiryDate: 'Expiry Date',
    blackScreenVerificationStatus: 'Verification Status',
    blackScreenVerified: 'VERIFIED AND CERTIFIED',
    blackScreenCertification: 'OFFICIAL BANK CERTIFICATION',
    blackScreenCertificationText: 'This document certifies that the aforementioned funds are available and verified according to international banking and settlement standards.',
    blackScreenCertificationStandards: 'Compliant with standards: SWIFT MT799/MT999, FEDWIRE, DTC (Depository Trust Company), ISO 20022',
    blackScreenDigitallySigned: 'DIGITALLY SIGNED',
    blackScreenGeneratedBy: 'Generated by',
    blackScreenCopyright: 'DAES CoreBanking - Data and Exchange Settlement',
    blackScreenMasterAccount: 'DAES MASTER ACCOUNT',
    blackScreenInternational: 'DAES - DATA AND EXCHANGE SETTLEMENT',
    blackScreenTotalAvailable: 'Available',
    blackScreenPrincipal: 'Principal',

    // Login
    loginTitle: 'DAES SYSTEM',
    loginSubtitle: 'Data and Exchange Settlement',
    loginUser: 'User',
    loginPassword: 'Password',
    loginShowPassword: 'Show password',
    loginHidePassword: 'Hide password',
    loginButton: 'ACCESS SYSTEM',
    loginAuthenticating: 'AUTHENTICATING...',
    loginInvalidCredentials: 'Invalid credentials. Access denied.',
    loginTooManyAttempts: 'Too many failed attempts. System locked for 30 seconds.',
    loginAttempts: 'Attempts',
    loginSecureConnection: 'Secure connection • AES-256-GCM • mTLS',
    loginCopyright: '© 2025 DAES CoreBanking System',
    loginVersion: 'v3.0.0',
    loginAllRightsReserved: 'All rights reserved',

    // App Header
    logout: 'Logout',
    logoutTitle: 'Sign Out',

    // Advanced Banking Dashboard
    advDashboardTitle: 'Banking Dashboard',
    advDashboardSubtitle: 'Advanced financial management system',
    advDashboardTotalBalance: 'Total Balance',
    advDashboardActiveAccounts: 'Active Accounts',
    advDashboardTransactions: 'Transactions',
    advDashboardMovements: 'Movements',
    advDashboardDebits: 'Debits',
    advDashboardCredits: 'Credits',
    advDashboardFees: 'Fees',
    advDashboardLedgerAccounts: 'Ledger Accounts (15 Currencies)',
    advDashboardCurrencyDistribution: 'Currency Distribution',
    advDashboardTransactionHistory: 'Transaction History',
    advDashboardNoTransactions: 'No transactions to display',
    advDashboardNoTransactionsMessage: 'Transactions will appear here when you perform operations',
    advDashboardAllPeriods: 'All',
    advDashboardLast24h: 'Last 24h',
    advDashboardLast7d: 'Last week',
    advDashboardLast30d: 'Last month',
    advDashboardAllCurrencies: 'All currencies',
    advDashboardUpdate: 'Update',
    advDashboardUpdating: 'Updating...',
    advDashboardHideBalance: 'Hide balance',
    advDashboardShowBalance: 'Show balance',
    advDashboardConvertedBalance: 'Total Converted Balance',

    // Audit Bank Panel
    auditTitle: 'Bank Audit Panel',
    auditSubtitle: 'Automatic financial asset detection with M0-M4 classification',
    auditStartScan: 'Start Scan',
    auditScanning: 'Scanning...',
    auditStopScan: 'Stop Scan',
    auditExportJson: 'Export JSON',
    auditExportCsv: 'Export CSV',
    auditTotalFindings: 'Total Findings',
    auditFilesScanned: 'Files Scanned',
    auditBanksDetected: 'Banks Detected',
    auditAccountsFound: 'Accounts Found',
    auditTotalAmount: 'Total Amount',
    auditClassifications: 'Monetary Classifications',
    auditM0Cash: 'M0 - Cash',
    auditM1Demand: 'M1 - Demand Deposits',
    auditM2Savings: 'M2 - Savings',
    auditM3Institutional: 'M3 - Institutional',
    auditM4Instruments: 'M4 - Financial Instruments',
    auditFindings: 'Detailed Findings',
    auditNoFindings: 'No findings found',
    auditLoadResults: 'Load Results',
    auditFile: 'File',
    auditBank: 'Bank',
    auditAccount: 'Account',
    auditAmount: 'Amount',
    auditCurrency: 'Currency',
    auditClassification: 'Classification',
    auditConfidence: 'Confidence',
    auditEvidence: 'Evidence',
    auditDetectedAt: 'Detected',
    auditAggregatedTotals: 'Aggregated Totals by Currency',
    auditEquivUsd: 'USD Equiv.',
    auditSecurityNote: 'Security Note',
    auditSecurityMessage: 'Account numbers are automatically masked. Full values are encrypted (AES-256) complying with ISO 27001 / AML / FATF.',
    auditConfigureDataPath: 'Configure Data Path',
    auditDataPath: 'Digital Commercial Bank Ltd Data Path',
    auditProcessing: 'Processing files...',
    auditComplete: 'Scan completed',
    auditError: 'Error during scan',
    auditM0Description: 'Physical cash, bills, coins',
    auditM1Description: 'Checking accounts, demand deposits',
    auditM2Description: 'Savings, time deposits < 1 year',
    auditM3Description: 'Institutional deposits > 1M USD',
    auditM4Description: 'Repos, MTNs, SKRs, commercial paper',
    auditLoadFile: 'Load Digital Commercial Bank Ltd File',
    auditMaskedView: 'Masked View',
    auditCompleteView: 'Complete View',
    auditClearData: 'Clear',
    auditDataSources: 'Data Sources',
    auditAnalyzerIntegration: 'Integration with Large File Analyzer',
    auditAnalyzerDescription: 'Bank Audit is listening to data from the Analyzer in real-time. When you process a Digital Commercial Bank Ltd file in the Analyzer, the data will appear AUTOMATICALLY here.',
    auditActiveSubscription: 'Active subscription',
    auditAutoSync: 'Automatic sync',
    auditSystemBalances: 'System Balances',
    auditAnalyzeBalances: 'Analyze System Balances',
    auditMonetaryClassification: 'Monetary Classification M0-M4',
    auditDetailedFindings: 'Detailed Findings',
    auditScrollToSeeAll: 'Scroll to see all',
    auditViewFullReport: 'VIEW FULL REPORT',
  },
};

