export class Iso8583FormatModel {
  messageFormatId: number = 0;
  messageFormat: string = '';
  description: string = '';

  constructor(messageFormatId?: number) {
    if (messageFormatId !== undefined) this.messageFormatId = Number(messageFormatId);
  }
}
