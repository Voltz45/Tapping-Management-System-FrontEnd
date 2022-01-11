import {Iso8583DialectMsgTemplateModel} from "../../../../../model/modules-model/iso8583-dialect-msg-template.model";
import {CustomHttpResponseModel} from "../../../../../model/customHttpResponse-model/custom-http-response.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Iso8583DialectService} from "../../../../../services/module-service/iso8583-dialect.service";
import {tap} from "rxjs";
import {NotificationService} from "../../../../../services/notification-service/notification.service";
import {Iso8583DialectTableService} from "../../../../../services/module-service/iso8583-dialect-table.service";
import {
  DialectAdd,
  DialectDelete,
  DialectErrorState,
  DialectGetMessageFormat,
  DialectsGet,
  DialectSuccessState,
  DialectUpdate
} from "./dialect.action";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {Iso8583FormatService} from "../../../../../services/module-service/iso8583-format.service";
import {MessageFormatGroupInterface} from "../../../../../interface/modules/message-format-group.interface";

export class DialectStateModel {
  dialects: Iso8583DialectMsgTemplateModel[] = [];
  messageFormats: MessageFormatGroupInterface[] = [];
  responseMessage: CustomHttpResponseModel | undefined;
}

@State<DialectStateModel>({
  name: 'dialectState',
  defaults: {
    dialects: [],
    messageFormats: [],
    responseMessage: undefined
  }
})

@Injectable()
export class DialectState {

  constructor(
    private notifierService: NotificationService,
    private messageFormatService: Iso8583FormatService,
    private iso8583DialectService: Iso8583DialectService,
    private iso8583DialectTableService: Iso8583DialectTableService
  ) {
  }

  @Selector()
  static dialects(state: DialectStateModel) {
    return state.dialects;
  }

  @Selector()
  static messageFormats(state: DialectStateModel) {
    return state.messageFormats;
  }

  @Selector()
  static responseMessage(state: DialectStateModel) {
    return state.responseMessage;
  }

  @Action(DialectsGet, {cancelUncompleted: true})
  getDataFromState(ctx: StateContext<DialectStateModel>) {
    return this.iso8583DialectService.getAllIso8583Dialect().pipe(tap(response => {
      if (response?.length != 0) {
        this.iso8583DialectTableService.hideTableLoading();
        this.iso8583DialectTableService.setRowData(response);
      } else {
        this.iso8583DialectTableService.setRowData(response);
        this.iso8583DialectTableService.showNoRowData();
      }
      ctx.setState({
        ...ctx.getState(),
        dialects: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new DialectErrorState(response.error));
    }))
  }

  @Action(DialectGetMessageFormat, {cancelUncompleted: true})
  getAdditionalDataFromState(ctx: StateContext<DialectStateModel>) {
    return this.messageFormatService.getAllIso8583Format().pipe(tap(response => {
      let msgFormatParseList: MessageFormatGroupInterface[] = [];
      response.forEach(x => {
        msgFormatParseList.push({
          name: x.messageFormat,
          code: String(x.messageFormatId)
        })
      });

      ctx.setState({
        ...ctx.getState(),
        messageFormats: msgFormatParseList
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new DialectErrorState(response.error));
    }))
  }

  @Action(DialectAdd, {cancelUncompleted: true})
  addDataFromState(ctx: StateContext<DialectStateModel>, { payload }: DialectAdd) {
    return this.iso8583DialectService.addIso8583Dialect(payload).pipe(tap(response => {
      ctx.dispatch(new DialectSuccessState(response))
      ctx.patchState({
        ...ctx.getState(),
        dialects: [...ctx.getState().dialects],
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new DialectErrorState(response.error));
    }))
  }

  @Action(DialectUpdate, {cancelUncompleted: true})
  updateDataFromState(ctx: StateContext<DialectStateModel>, { id, payload, stateData }: DialectUpdate) {
    return this.iso8583DialectService.updateIso8583Dialect(payload).pipe(tap(response => {
      ctx.dispatch(new DialectSuccessState(response))
      const dataList = [...ctx.getState().dialects];
      const updatedDataIndex = dataList.findIndex(x => x.templateId === id);
      dataList[updatedDataIndex] = stateData;
      ctx.setState({
        ...ctx.getState(),
        dialects: dataList,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new DialectErrorState(response.error));
    }))
  }

  @Action(DialectDelete, {cancelUncompleted: true})
  deleteDataFromState(ctx: StateContext<DialectStateModel>, { id }: DialectDelete) {
    return this.iso8583DialectService.deleteIso8583Dialect(id).pipe(tap(response => {
      ctx.dispatch(new DialectSuccessState(response))
      const filteredData = ctx.getState().dialects.filter(data => data.templateId !== id);
      ctx.setState({
        ...ctx.getState(),
        dialects: filteredData,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new DialectErrorState(response.error));
    }))
  }

  @Action(DialectSuccessState)
  ifStateSuccess(ctx: StateContext<DialectStateModel>, {successMessage}: DialectSuccessState) {
    if (this.iso8583DialectService.getCurrentStatusDialog().length != 0) {
      this.iso8583DialectService.closeDialog();
    }
    this.notifierService.successNotification(successMessage?.message, successMessage?.httpStatusCode);
    this.iso8583DialectService.onGetAllIso8583Dialect();
    ctx.patchState({
      responseMessage: successMessage
    })
  }

  @Action(DialectErrorState)
  ifStateIsError(ctx: StateContext<DialectStateModel>, {errorMessage}: DialectErrorState) {
    this.notifierService.errorNotification(errorMessage?.message, errorMessage?.httpStatusCode);
    if (this.iso8583DialectTableService.gridApi.getRenderedNodes().length == 0){
      this.iso8583DialectTableService.showNoRowData();
    } else {
      this.iso8583DialectTableService.hideTableLoading();
    }
    ctx.patchState({
      responseMessage: errorMessage
    })
  }
}
