import {ChannelTypeModel} from "./channel-type.model";

export class ChannelModel {
  id: number = 0;
  channelId: number = 0;
  ipAddress: string = '';
  port: string = '';
  timeTrace: string = '';
  isOnPremise: boolean = false;
  channelStatus: string = '';
  channelType!: ChannelTypeModel;
}
