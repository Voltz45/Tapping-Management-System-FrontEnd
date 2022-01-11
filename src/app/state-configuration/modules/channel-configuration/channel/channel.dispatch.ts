import {Injectable} from "@angular/core";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {ChannelAdd, ChannelDelete, ChannelGetChannelType, ChannelsGet, ChannelUpdate} from "./channel.actions";
import {ChannelModel} from "../../../../model/modules-model/channel.model";
import {ChannelTypeErrorState, ChannelTypeSuccessState} from "../channel-type/channel-type.action";
import {CustomHttpResponseModel} from "../../../../model/customHttpResponse-model/custom-http-response.model";

@Injectable({
  providedIn: 'root'
})
export class ChannelDispatch {

  @Dispatch()
  public _ChannelGetDispatch() {
    return new ChannelsGet();
  }

  @Dispatch()
  public _ChannelGetChannelTypeDispatch() {
    return new ChannelGetChannelType();
  }

  @Dispatch()
  public _ChannelAdd(payload: ChannelModel) {
    return new ChannelAdd(payload);
  }

  @Dispatch()
  public _ChannelUpdate(payload: FormData, id: number, stateData: ChannelModel) {
    return new ChannelUpdate(id, payload, stateData);
  }

  @Dispatch()
  public _ChannelDelete(id: number) {
    return new ChannelDelete(id);
  }

  @Dispatch()
  public _ChannelSuccessStateDispatch(message: CustomHttpResponseModel) {
    return new ChannelTypeSuccessState(message);
  }

  @Dispatch()
  public _ChannelErrorStateDispatch(message: CustomHttpResponseModel) {
    return new ChannelTypeErrorState(message);
  }
}
