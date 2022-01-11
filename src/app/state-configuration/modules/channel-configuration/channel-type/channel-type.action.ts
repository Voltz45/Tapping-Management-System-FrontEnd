import {ChannelTypeModel} from "../../../../model/modules-model/channel-type.model";
import {CustomHttpResponseModel} from "../../../../model/customHttpResponse-model/custom-http-response.model";

export class ChannelTypesGet {
  static readonly type ='[ChannelType] GetChannelType';
}

export class ChannelTypeGetDialect {
  static readonly type ='[ChannelType] GetDialectTemplate';
}

export class ChannelTypeAdd {
  static readonly type ='[ChannelType] Add';
  constructor(public payload: ChannelTypeModel) {}
}

export class ChannelTypeUpdate {
  static readonly type ='[ChannelType] Update';
  constructor(public id: number, public payload: FormData, public stateData: ChannelTypeModel) {}
}

export class ChannelTypeDelete {
  static readonly type ='[ChannelType] Delete';
  constructor(public id: number) {}
}

export class ChannelTypeSuccessState {
  static readonly type ='[ChannelType] Success';
  constructor(public successMessage: CustomHttpResponseModel) {}
}

export class ChannelTypeErrorState {
  static readonly type ='[ChannelType] Error';
  constructor(public errorMessage: CustomHttpResponseModel) {}
}
