import {Iso8583DialectMsgTemplateModel} from "../../../../../model/modules-model/iso8583-dialect-msg-template.model";
import {
  DialectAdd,
  DialectDelete,
  DialectErrorState,
  DialectGetMessageFormat,
  DialectsGet,
  DialectSuccessState,
  DialectUpdate
} from "./dialect.action";
import {CustomHttpResponseModel} from "../../../../../model/customHttpResponse-model/custom-http-response.model";
import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";

@Injectable({
  providedIn: 'root'
})
export class DialectDispatch {

  @Dispatch()
  public _DialectGetDispatch() {
    return new DialectsGet();
  }

  @Dispatch()
  public _DialectGetMessageFormatDispatch() {
    return new DialectGetMessageFormat();
  }

  @Dispatch()
  public _DialectAddDispatch(payload: Iso8583DialectMsgTemplateModel) {
    return new DialectAdd(payload);
  }

  @Dispatch()
  public _DialectUpdateDispatch(payload: FormData, id: number, stateData: Iso8583DialectMsgTemplateModel) {
    return new DialectUpdate(id, payload, stateData);
  }

  @Dispatch()
  public _DialectDeleteDispatch(id: number) {
    return new DialectDelete(id);
  }

  @Dispatch()
  public _DialectSuccessStateDispatch(message: CustomHttpResponseModel) {
    return new DialectSuccessState(message);
  }

  @Dispatch()
  public _DialectErrorStateDispatch(message: CustomHttpResponseModel) {
    return new DialectErrorState(message);
  }
}
