import {Iso8583FieldModel} from "../../../../../model/modules-model/iso8583-field-model";
import {CustomHttpResponseModel} from "../../../../../model/customHttpResponse-model/custom-http-response.model";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {NotificationService} from "../../../../../services/notification-service/notification.service";
import {Iso8583DialectService} from "../../../../../services/module-service/iso8583-dialect.service";
import {Iso8583FieldService} from "../../../../../services/module-service/iso8583-field.service";
import {Iso8583FieldTableService} from "../../../../../services/module-service/iso8583-field-table.service";
import {
  ISO8583FieldAdd,
  ISO8583FieldDelete,
  ISO8583FieldErrorState,
  ISO8583FieldGet,
  ISO8583FieldGetDialect,
  ISO8583FieldSuccessState,
  ISO8583FieldUpdate
} from "./iso8583-field.action";
import {tap} from "rxjs";
import {DialectMsgTemplateGroupInterface} from "../../../../../interface/modules/dialect-msg-template-group.interface";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {DialectStateModel} from "../iso8583-dialect/dialect.state";

export class Iso8583FieldStateModel {
  iso8583Fields: Iso8583FieldModel[] = [];
  dialects: DialectMsgTemplateGroupInterface[] = [];
  responseMessage: CustomHttpResponseModel | undefined;
}

@State<Iso8583FieldStateModel>({
  name: 'iso8583FieldState',
  defaults: {
    iso8583Fields: [],
    dialects: [],
    responseMessage: undefined
  }
})

@Injectable()
export class ISO8583FieldState {

  constructor(
    private notifierService: NotificationService,
    private dialectService: Iso8583DialectService,
    private ISO8583FieldService: Iso8583FieldService,
    private ISO8583FieldTableService: Iso8583FieldTableService
  ) {
  }

  @Selector()
  static ISO8583Fields(state: Iso8583FieldStateModel) {
    return state.iso8583Fields;
  }

  @Selector()
  static dialects(state: Iso8583FieldStateModel) {
    return state.dialects;
  }

  @Selector()
  static responseMessage(state: Iso8583FieldStateModel) {
    return state.responseMessage;
  }

  //TODO: Lengkapi action ISO8583 Field
  @Action(ISO8583FieldGet, {cancelUncompleted: true})
  getDataFromState(ctx: StateContext<Iso8583FieldStateModel>) {
    return this.ISO8583FieldService.getAllIso8583Field().pipe(tap(response => {

    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ISO8583FieldErrorState(response.error));
    }))
  }

  @Action(ISO8583FieldGetDialect, {cancelUncompleted: true})
  getAdditionalDataFromState(ctx: StateContext<Iso8583FieldStateModel>) {
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
      return ctx.dispatch(new ISO8583FieldErrorState(response.error));
    }))
  }

  @Action(ISO8583FieldAdd, {cancelUncompleted: true})
  addDataFromState(ctx: StateContext<Iso8583FieldStateModel>, {dialectId, payload}: ISO8583FieldAdd) {
    return this.ISO8583FieldService.addIso8583Field(dialectId, payload).pipe(tap(response => {
      ctx.dispatch(new ISO8583FieldSuccessState(response));
      ctx.patchState({
        ...ctx.getState(),
        iso8583Fields: [...ctx.getState().iso8583Fields],
        responseMessage: response
      })
    }), catchError((response: HttpErrorResponse) => {
      return ctx.dispatch(new ISO8583FieldErrorState(response.error));
    }))
  }

  @Action(ISO8583FieldUpdate, {cancelUncompleted: true})
  updateDataFromState(ctx: StateContext<Iso8583FieldStateModel>) {

  }

  @Action(ISO8583FieldDelete, {cancelUncompleted: true})
  deleteDataFromState(ctx: StateContext<Iso8583FieldStateModel>) {

  }

  @Action(ISO8583FieldSuccessState)
  ifStateSuccess(ctx: StateContext<DialectStateModel>, {successMessage}: ISO8583FieldSuccessState) {

  }

  @Action(ISO8583FieldErrorState)
  ifStateError(ctx: StateContext<Iso8583FieldStateModel>, {errorMessage}: ISO8583FieldErrorState) {

  }
}
