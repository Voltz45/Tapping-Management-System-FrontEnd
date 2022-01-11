import {ChannelModel} from "../../../../model/modules-model/channel.model";
import {CustomHttpResponseModel} from "../../../../model/customHttpResponse-model/custom-http-response.model";

export class ChannelsGet {
  static readonly type ='[Channel] GetChannel';
}

export class ChannelGetChannelType {
  static readonly type ='[Channel] GetChannelType';
}

export class ChannelAdd {
  static readonly type ='[Channel] Add';
  constructor(public payload: ChannelModel) {}
}

export class ChannelUpdate {
  static readonly type ='[Channel] Update';
  constructor(public id: number, public payload: FormData, public stateData: ChannelModel) {}
}

export class ChannelDelete {
  static readonly type ='[Channel] Delete';
  constructor(public id: number) {}
}

export class ChannelSuccessState {
  static readonly type ='[Channel] Success';
  constructor(public successMessage: CustomHttpResponseModel) {}
}

export class ChannelErrorState {
  static readonly type ='[Channel] Error';
  constructor(public errorMessage: CustomHttpResponseModel) {}
}
