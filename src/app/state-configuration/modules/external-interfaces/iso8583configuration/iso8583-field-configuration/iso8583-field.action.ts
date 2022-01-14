import {Iso8583Model} from "../../../../../model/modules-model/iso8583-field-model";
import {CustomHttpResponseModel} from "../../../../../model/customHttpResponse-model/custom-http-response.model";

export class ISO8583FieldGet {
  static readonly type ='[ISO8583-Field] GetField';
}

export class ISO8583FieldGetDialect {
  static readonly type ='[ISO8583-Field] GetDialect';
}

export class ISO8583FieldAdd {
  static readonly type ='[ISO8583-Field] Add';
  constructor(public dialectId: number, public payload: Iso8583Model) {}
}

export class ISO8583FieldUpdate {
  static readonly type ='[ISO8583-Field] Update';
}

export class ISO8583FieldDelete {
  static readonly type ='[ISO8583-Field] Delete';
}

export class ISO8583FieldSuccessState {
  static readonly type ='[ISO8583-Field] Success';
  constructor(public successMessage: CustomHttpResponseModel) {}
}

export class ISO8583FieldErrorState {
  static readonly type ='[ISO8583-Field] Error';
  constructor(public errorMessage: CustomHttpResponseModel) {}
}
