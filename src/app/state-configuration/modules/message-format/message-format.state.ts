import {CustomHttpResponseModel} from "../../../model/customHttpResponse-model/custom-http-response.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Iso8583FormatModel} from "../../../model/modules-model/iso8583-format.model";
import {Injectable} from "@angular/core";
import {NotificationService} from "../../../services/notification-service/notification.service";
import {
  MessageFormatAdd,
  MessageFormatDelete,
  MessageFormatErrorState,
  MessageFormatGet,
  MessageFormatSuccessState,
  MessageFormatUpdate
} from "./message-format.action";
import {Iso8583FormatService} from "../../../services/module-service/iso8583-format.service";
import {Iso8583FormatTableService} from "../../../services/module-service/iso8583-format-table.service";
import {tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

export class MessageFormatStateModel {
  messageFormats: Iso8583FormatModel[] = [];
  responseMessage: CustomHttpResponseModel | undefined;
}

@State<MessageFormatStateModel>({
  name: 'messageFormat',
  defaults: {
    messageFormats: [],
    responseMessage: undefined
  }
})

@Injectable()
export class MessageFormatState {

  constructor(
    private notifierService: NotificationService,
    private iso8583FormatService: Iso8583FormatService,
    private iso8583FormatTableService: Iso8583FormatTableService
  ) {
  }

  @Selector()
  static messageFormats(state: MessageFormatStateModel) {
    return state.messageFormats;
  }

  @Selector()
  static responseMessage(state: MessageFormatStateModel) {
    return state.responseMessage;
  }

  @Action(MessageFormatGet, {cancelUncompleted: true})
  getDataFromState(ctx: StateContext<MessageFormatStateModel>) {
    return this.iso8583FormatService.getAllIso8583Format().pipe(tap(response => {
      if (response?.length != 0) {
        this.iso8583FormatTableService.hideTableLoading();
        this.iso8583FormatTableService.setRowData(response);
      } else {
        this.iso8583FormatTableService.setRowData(response);
        this.iso8583FormatTableService.showNoRowData();
      }
      ctx.setState({
        ...ctx.getState(),
        messageFormats: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new MessageFormatErrorState(response.error));
    }))
  }

  @Action(MessageFormatAdd, {cancelUncompleted: true})
  addDataFromState(ctx: StateContext<MessageFormatStateModel>, {payload}: MessageFormatAdd) {
    return this.iso8583FormatService.addIso8583Format(payload).pipe(tap(response => {
      ctx.dispatch(new MessageFormatSuccessState(response));
      ctx.patchState({
        ...ctx.getState(),
        messageFormats: [...ctx.getState().messageFormats],
        responseMessage: response
      });
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new MessageFormatErrorState(response.error));
    }))
  }

  @Action(MessageFormatUpdate, {cancelUncompleted: true})
  updateDataFromState(ctx: StateContext<MessageFormatStateModel>, { id, payload, stateData }: MessageFormatUpdate) {
    return this.iso8583FormatService.updateIso8583Format(payload).pipe(tap(response => {
      ctx.dispatch(new MessageFormatSuccessState(response));

      const dataList = [...ctx.getState().messageFormats];
      const updatedDataIndex = dataList.findIndex(x => x.messageFormatId === id);
      dataList[updatedDataIndex] = stateData;
      ctx.setState({
        ...ctx.getState(),
        messageFormats: dataList,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new MessageFormatErrorState(response.error));
    }))
  }

  @Action(MessageFormatDelete, {cancelUncompleted: true})
  deleteDataFromState(ctx: StateContext<MessageFormatStateModel>, { id }: MessageFormatDelete) {
    return this.iso8583FormatService.deleteIso8583Format(id).pipe(tap(response => {
      ctx.dispatch(new MessageFormatSuccessState(response));
      const filteredData = ctx.getState().messageFormats.filter(data => data.messageFormatId !== id);
      ctx.setState({
        ...ctx.getState(),
        messageFormats: filteredData,
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new MessageFormatErrorState(response.error));
    }))
  }

  @Action(MessageFormatSuccessState)
  ifStateSuccess(ctx: StateContext<MessageFormatStateModel>, {successMessage}: MessageFormatSuccessState) {
    if (this.iso8583FormatService.getCurrentStatusDialog().length != 0) {
      this.iso8583FormatService.closeDialog();
    }
    this.notifierService.successNotification(successMessage?.message, successMessage?.httpStatusCode);
    this.iso8583FormatService.onGetAllIso8583Format();
    ctx.patchState({
      responseMessage: successMessage
    })
  }

  @Action(MessageFormatErrorState)
  ifStateIsError(ctx: StateContext<MessageFormatStateModel>, {errorMessage}: MessageFormatErrorState) {
    this.notifierService.errorNotification(errorMessage?.message, errorMessage?.httpStatusCode);
    if (this.iso8583FormatTableService.gridApi.getRenderedNodes().length == 0){
      this.iso8583FormatTableService.showNoRowData();
    } else {
      this.iso8583FormatTableService.hideTableLoading();
    }
    ctx.patchState({
      responseMessage: errorMessage
    })
  }
}
