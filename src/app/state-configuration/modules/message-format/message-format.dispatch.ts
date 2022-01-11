import {
  MessageFormatAdd,
  MessageFormatDelete,
  MessageFormatErrorState,
  MessageFormatGet,
  MessageFormatSuccessState,
  MessageFormatUpdate
} from "./message-format.action";
import {CustomHttpResponseModel} from "../../../model/customHttpResponse-model/custom-http-response.model";
import {Iso8583FormatModel} from "../../../model/modules-model/iso8583-format.model";
import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";

@Injectable({
  providedIn: 'root'
})
export class MessageFormatDispatch {

  @Dispatch()
  public _MessageFormatGetDispatch() {
    return new MessageFormatGet();
  }

  @Dispatch()
  public _MessageFormatAddDispatch(payload: Iso8583FormatModel) {
    return new MessageFormatAdd(payload);
  }

  @Dispatch()
  public _MessageFormatUpdateDispatch(payload: FormData, id: number, stateData: Iso8583FormatModel) {
    return new MessageFormatUpdate(id, payload, stateData);
  }

  @Dispatch()
  public _MessageFormatDeleteDispatch(id: number) {
    return new MessageFormatDelete(id);
  }

  @Dispatch()
  public _MessageFormatSuccessStateDispatch(message: CustomHttpResponseModel) {
    return new MessageFormatSuccessState(message)
  }

  @Dispatch()
  public _MessageFormatErrorStateDispatch(message: CustomHttpResponseModel) {
    return new MessageFormatErrorState(message);
  }
}
