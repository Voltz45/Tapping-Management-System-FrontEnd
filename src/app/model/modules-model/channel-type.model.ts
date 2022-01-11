import {Iso8583DialectMsgTemplateModel} from "./iso8583-dialect-msg-template.model";

export class ChannelTypeModel {
  channelTypeId: number = 0;
  channelType: string = '';
  description: string = '';
  dialectMessageTemplate!: Iso8583DialectMsgTemplateModel;

  constructor(channelTypeId?: number) {
    if (channelTypeId !== undefined) this.channelTypeId = channelTypeId;
  }
}
