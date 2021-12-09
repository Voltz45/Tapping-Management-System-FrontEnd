export interface TransactionMessage {
  amount: string;
  currencyCode: number;
  destAccount: number;
  HPAN: number;
  merchantId: number;
  merchantType: number;
  MTI: number;
  networkDate: number;
  networkId: number;
  responseCode: string;
  RRN: number;
  srcAccount: number;
  terminalId: number;
  transactionDate: number;
  transactionId: number;
}
