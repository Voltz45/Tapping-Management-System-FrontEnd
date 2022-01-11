import {CustomHttpResponseModel} from "../../../model/customHttpResponse-model/custom-http-response.model";
import {Iso8583FormatModel} from "../../../model/modules-model/iso8583-format.model";

export class MessageFormatGet {
  static readonly type ='[MessageFormat] GetAll';
}

export class MessageFormatAdd {
  static readonly type ='[MessageFormat] Add'
  constructor(public payload: Iso8583FormatModel) {}
}

export class MessageFormatUpdate {
  static readonly type ='[MessageFormat] Update'
  constructor(public id: number, public payload: FormData, public stateData: Iso8583FormatModel) {}
}

export class MessageFormatDelete {
  static readonly type ='[MessageFormat] Delete'
  constructor(public id: number) {}
}

export class MessageFormatSuccessState {
  static readonly type ='[MessageFormat] Success';
  constructor(public successMessage: CustomHttpResponseModel) {}
}

export class MessageFormatErrorState {
  static readonly type ='[MessageFormat] Error';
  constructor(public errorMessage: CustomHttpResponseModel) {}
}
