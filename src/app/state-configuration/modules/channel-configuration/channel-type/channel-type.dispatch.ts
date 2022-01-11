import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {
  ChannelTypeAdd,
  ChannelTypeDelete,
  ChannelTypeErrorState,
  ChannelTypeGetDialect,
  ChannelTypesGet,
  ChannelTypeSuccessState,
  ChannelTypeUpdate
} from "./channel-type.action";
import {ChannelTypeModel} from "../../../../model/modules-model/channel-type.model";
import {CustomHttpResponseModel} from "../../../../model/customHttpResponse-model/custom-http-response.model";

@Injectable({
  providedIn: 'root'
})
export class ChannelTypeDispatch {

  @Dispatch()
  public _ChannelTypeGetDispatch() {
    return new ChannelTypesGet();
  }

  @Dispatch()
  public _ChannelTypeGetDialectDispatch() {
    return new ChannelTypeGetDialect();
  }

  @Dispatch()
  public _ChannelTypeAddDispatch(payload: ChannelTypeModel) {
    return new ChannelTypeAdd(payload);
  }

  @Dispatch()
  public _ChannelTypeUpdateDispatch(payload: FormData, id: number, stateData: ChannelTypeModel) {
    return new ChannelTypeUpdate(id, payload, stateData);
  }

  @Dispatch()
  public _ChannelTypeDelete(id: number) {
    return new ChannelTypeDelete(id);
  }

  @Dispatch()
  public _ChannelTypeSuccessStateDispatch(message: CustomHttpResponseModel) {
    return new ChannelTypeSuccessState(message);
  }

  @Dispatch()
  public _ChannelTypeErrorStateDispatch(message: CustomHttpResponseModel) {
    return new ChannelTypeErrorState(message);
  }
}
