export class TerminalModel {
  id: number = 0;
  terminalId: string = '';
  ipAddress: string = '';
  port: string = '';
  terminalType!: BigInt;
  timeTrace: string = '';
  onPremise: boolean = false;
  channelStatus: string = '';
}
