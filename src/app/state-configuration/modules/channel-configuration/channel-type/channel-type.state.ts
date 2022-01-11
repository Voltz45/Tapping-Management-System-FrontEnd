import {DialectMsgTemplateGroupInterface} from "../../../../interface/modules/dialect-msg-template-group.interface";
import {CustomHttpResponseModel} from "../../../../model/customHttpResponse-model/custom-http-response.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NotificationService} from "../../../../services/notification-service/notification.service";
import {Iso8583DialectService} from "../../../../services/module-service/iso8583-dialect.service";
import {ChannelTypeService} from "../../../../services/module-service/channel-type.service";
import {ChannelTypeTableService} from "../../../../services/module-service/channel-type-table.service";
import {
  ChannelTypeAdd,
  ChannelTypeDelete,
  ChannelTypeErrorState,
  ChannelTypeGetDialect,
  ChannelTypesGet,
  ChannelTypeSuccessState,
  ChannelTypeUpdate
} from "./channel-type.action";
import {tap} from "rxjs";
import {ChannelTypeModel} from "../../../../model/modules-model/channel-type.model";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

export class ChannelTypeStateModel {
  channelTypes: ChannelTypeModel[] = [];
  dialects: DialectMsgTemplateGroupInterface[] = [];
  responseMessage: CustomHttpResponseModel | undefined;
}

@State<ChannelTypeStateModel>({
  name: 'channelTypeState',
  defaults: {
    channelTypes: [],
    dialects: [],
    responseMessage: undefined
  }
})

@Injectable()
export class ChannelTypeState {

  constructor(
    private notifierService: NotificationService,
    private dialectService: Iso8583DialectService,
    private channelTypeService: ChannelTypeService,
    private channelTypeTableService: ChannelTypeTableService
  ) {
  }

  @Selector()
  static channelTypes(state: ChannelTypeStateModel) {
    return state.channelTypes;
  }

  @Selector()
  static dialects(state: ChannelTypeStateModel) {
    return state.dialects;
  }

  @Selector()
  static responseMessage(state: ChannelTypeStateModel) {
    return state.responseMessage;
  }

  @Action(ChannelTypesGet, {cancelUncompleted: true})
  getDataFromState(ctx: StateContext<ChannelTypeStateModel>) {
    return this.channelTypeService.getAllChannelType().pipe(tap(response => {
      if (response.length != 0) {
        this.channelTypeTableService.hideTableLoading();
        this.channelTypeTableService.gridApi.setRowData(response);
      } else {
        this.channelTypeTableService.setRowData(response)
        this.channelTypeTableService.showNoRowData();
      }

      ctx.setState({
        ...ctx.getState(),
        channelTypes: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelTypeErrorState(response.error));
    }))
  }

  @Action(ChannelTypeGetDialect, {cancelUncompleted: true})
  getAdditionalDataFromState(ctx: StateContext<ChannelTypeStateModel>) {
    return this.dialectService.getAllIso8583Dialect().pipe(tap(response => {
      let dialectParseList: DialectMsgTemplateGroupInterface[] = [];
      response.forEach(x => {
        dialectParseList.push({
          name: x.nameType,
          code: String(x.templateId)
        })
      })

      ctx.setState({
        ...ctx.getState(),
        dialects: dialectParseList
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelTypeErrorState(response.error));
    }))
  }

  @Action(ChannelTypeAdd, {cancelUncompleted: true})
  addDataFromState(ctx: StateContext<ChannelTypeStateModel>, {payload}: ChannelTypeAdd) {
    return this.channelTypeService.addChannelType(payload).pipe(tap(response => {
      ctx.dispatch(new ChannelTypeSuccessState(response));
      ctx.patchState({
        ...ctx.getState(),
        channelTypes: [...ctx.getState().channelTypes],
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelTypeErrorState(response.error));
    }))
  }

  @Action(ChannelTypeUpdate, {cancelUncompleted: true})
  updateDataFromState(ctx: StateContext<ChannelTypeStateModel>, {id, payload, stateData}: ChannelTypeUpdate) {
    return this.channelTypeService.updateChannelType(payload).pipe(tap(response => {
      ctx.dispatch(new ChannelTypeSuccessState(response));
      const dataList = [...ctx.getState().channelTypes];
      const updatedDataIndex = dataList.findIndex(x => x.channelTypeId === id);
      dataList[updatedDataIndex] = stateData;
      ctx.setState({
        ...ctx.getState(),
        channelTypes: dataList,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelTypeErrorState(response.error));
    }))
  }

  @Action(ChannelTypeDelete, {cancelUncompleted: true})
  deleteDataFromState(ctx: StateContext<ChannelTypeStateModel>, {id}: ChannelTypeDelete) {
    return this.channelTypeService.deleteChannelType(id).pipe(tap(response => {
      ctx.dispatch(new ChannelTypeSuccessState(response));
      const filteredData = ctx.getState().channelTypes.filter(data => data.channelTypeId !== id);
      ctx.setState({
        ...ctx.getState(),
        channelTypes: filteredData,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ChannelTypeErrorState(response.error));
    }))
  }

  @Action(ChannelTypeSuccessState)
  ifStateSuccess(ctx: StateContext<ChannelTypeStateModel>, {successMessage}: ChannelTypeSuccessState) {
    if (this.channelTypeService.getCurrentStatusDialog().length != 0) {
      this.channelTypeService.closeDialog();
    }
    this.notifierService.successNotification(successMessage?.message, successMessage?.httpStatusCode);
    this.channelTypeService.onGetAllChannelType();
    ctx.patchState({
      responseMessage: successMessage
    })
  }

  @Action(ChannelTypeErrorState)
  ifStateIsError(ctx: StateContext<ChannelTypeStateModel>, {errorMessage}: ChannelTypeErrorState) {
    this.notifierService.errorNotification(errorMessage?.message, errorMessage?.httpStatusCode);
    if (this.channelTypeTableService.gridApi.getRenderedNodes().length == 0){
      this.channelTypeTableService.showNoRowData();
    } else {
      this.channelTypeTableService.hideTableLoading();
    }
    ctx.patchState({
      responseMessage: errorMessage
    })
  }
}
