export interface TransactionMessage {
  amount: string;
  currencyCode: string;
  destAccount: number;
  HPAN: string;
  merchantId: string;
  merchantType: string;
  MTI: string;
  networkDate: string;
  networkId: string;
  responseCode: string;
  RRN: string;
  srcAccount: number;
  terminalId: number;
  transactionDate: string;
  transactionId: string;
}
