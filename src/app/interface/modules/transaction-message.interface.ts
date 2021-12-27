export interface TransactionMessageInterface {
  amount: string;
  currencyCode: string;
  destAccount: string;
  HPAN: string;
  clearHPAN: string;
  merchantId: string;
  merchantType: string;
  MTI: string;
  networkDate: string;
  networkId: string;
  responseCode: string;
  RRN: string;
  srcAccount: string;
  terminalId: string;
  transactionDate: string;
  transactionId: string;
  transType: string;
}
