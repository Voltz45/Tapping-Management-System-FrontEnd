import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {ChannelService} from "../../../../services/module-service/channel.service";
import {tap} from "rxjs";
import {CustomHttpResponseModel} from "../../../../model/customHttpResponse-model/custom-http-response.model";
import {ChannelModel} from "../../../../model/modules-model/channel.model";
import {ChannelTypeGroupInterface} from "../../../../interface/modules/channel-type-group.interface";
import {NotificationService} from "../../../../services/notification-service/notification.service";
import {ChannelTypeService} from "../../../../services/module-service/channel-type.service";
import {ChannelTableService} from "../../../../services/module-service/channel-table.service";
import {
  ChannelAdd,
  ChannelDelete,
  ChannelErrorState,
  ChannelGetChannelType,
  ChannelsGet,
  ChannelSuccessState,
  ChannelUpdate
} from "./channel.actions";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

export class ChannelStateModel {
  channels: ChannelModel[] = [];
  channelTypes: ChannelTypeGroupInterface[] = [];
  responseMessage: CustomHttpResponseModel | undefined;
}

@State<ChannelStateModel>({
  name: 'channelState',
  defaults: {
    channels: [],
    channelTypes: [],
    responseMessage: undefined
  }
})

@Injectable()
export class ChannelState {

  constructor(
    private notifierService: NotificationService,
    private channelTypeService: ChannelTypeService,
    private channelService: ChannelService,
    private channelTableService: ChannelTableService
  ) {
  }

  @Selector()
  static channels(state: ChannelStateModel) {
    return state.channels;
  }

  @Selector()
  static channelTypes(state: ChannelStateModel) {
    return state.channelTypes;
  }

  @Selector()
  static responseMessage(state: ChannelStateModel) {
    return state.responseMessage;
  }

  @Action(ChannelsGet, {cancelUncompleted: true})
  getDataFromState(ctx: StateContext<ChannelStateModel>) {
    return this.channelService.getAllChannel().pipe(tap(response => {
      if (response.length != 0) {
        this.channelTableService.hideTableLoading();
        this.channelTableService.setRowData(response);
      } else {
        this.channelTableService.setRowData(response);
        this.channelTableService.showNoRowData();
      }

      ctx.setState({
        ...ctx.getState(),
        channels: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelErrorState(response.error));
    }));
  }

  @Action(ChannelGetChannelType, {cancelUncompleted: true})
  getAdditionalDataFromState(ctx: StateContext<ChannelStateModel>) {
    return this.channelTypeService.getAllChannelType().pipe(tap(response => {
      let channelTypeParseList: ChannelTypeGroupInterface[] = [];
      response.forEach(x => {
        channelTypeParseList.push({
          name: x.channelType,
          code: String(x.channelTypeId)
        })
      })

      ctx.setState({
        ...ctx.getState(),
        channelTypes: channelTypeParseList
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelErrorState(response.error));
    }))
  }

  @Action(ChannelAdd, {cancelUncompleted: true})
  addDataFromState(ctx: StateContext<ChannelStateModel>, {payload}: ChannelAdd) {
    return this.channelService.addChannel(payload).pipe(tap(response => {
      ctx.dispatch(new ChannelSuccessState(response));
      ctx.patchState({
        ...ctx.getState(),
        channels: [...ctx.getState().channels],
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelErrorState(response.error));
    }))
  }

  @Action(ChannelUpdate, {cancelUncompleted: true})
  updateDataFromState(ctx: StateContext<ChannelStateModel>, {id, payload, stateData}: ChannelUpdate) {
    return this.channelService.updateChannel(payload).pipe(tap(response => {
      ctx.dispatch(new ChannelSuccessState(response));
      const dataList = [...ctx.getState().channels];
      const updatedDataIndex = dataList.findIndex(x => x.channelId === id);
      dataList[updatedDataIndex] = stateData;
      ctx.setState({
        ...ctx.getState(),
        channels: dataList,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelErrorState(response.error));
    }))
  }

  @Action(ChannelDelete, {cancelUncompleted: true})
  deleteChannelFromState(ctx: StateContext<ChannelStateModel>, {id}: ChannelDelete) {
    return this.channelService.deleteChannel(id).pipe(tap(response => {
      ctx.dispatch(new ChannelSuccessState(response));
      const filteredData = ctx.getState().channels.filter(data => data.channelId !== id);
      ctx.setState({
        ...ctx.getState(),
        channels: filteredData,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelErrorState(response.error));
    }))
  }

  @Action(ChannelSuccessState)
  ifStateSuccess(ctx: StateContext<ChannelStateModel>, {successMessage}: ChannelSuccessState) {
    if (this.channelService.getCurrentStatusDialog().length != 0) {
      this.channelService.closeDialog();
    }
    this.notifierService.successNotification(successMessage?.message, successMessage?.httpStatusCode);
    this.channelService.onGetAllChannel();
    ctx.patchState({
      responseMessage: successMessage
    })
  }

  @Action(ChannelErrorState)
  ifStateIsError(ctx: StateContext<ChannelStateModel>, {errorMessage}: ChannelErrorState) {
    this.notifierService.errorNotification(errorMessage?.message, errorMessage?.httpStatusCode);
    if (this.channelTableService.gridApi.getRenderedNodes().length == 0){
      this.channelTableService.showNoRowData();
    } else {
      this.channelTableService.hideTableLoading();
    }
    ctx.patchState({
      responseMessage: errorMessage
    })
  }
}
