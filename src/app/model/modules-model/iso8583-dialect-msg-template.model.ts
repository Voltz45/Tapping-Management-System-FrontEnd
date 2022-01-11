import {Iso8583FormatModel} from "./iso8583-format.model";

export class Iso8583DialectMsgTemplateModel {
  templateId: number = 0;
  nameType: string = '';
  description: string = '';
  messageFormat!: Iso8583FormatModel;

  constructor(templateId?: number) {
    if (templateId !== undefined) this.templateId = templateId;
  }
}
