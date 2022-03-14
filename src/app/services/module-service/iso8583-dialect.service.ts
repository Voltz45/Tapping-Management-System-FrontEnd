import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Iso8583DialectMsgTemplateModel} from "../../model/modules-model/iso8583-dialect-msg-template.model";
import {CustomHttpResponseModel} from "../../model/customHttpResponse-model/custom-http-response.model";
import {Iso8583DialectTableService} from "./iso8583-dialect-table.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MessageFormatGroupInterface} from "../../interface/modules/message-format-group.interface";
import {Iso8583FormatService} from "./iso8583-format.service";
import {
  DialogIso8583DialectComponent
} from "../../modules/module/external-interfaces/iso8583configuration/iso8583-dialect/widget/create-update-iso8583-dialect-dialog/dialog-iso8583-dialect.component";
import {
  DialectDispatch
} from "../../state-configuration/modules/external-interfaces/iso8583configuration/iso8583-dialect/dialect.dispatch";

@Injectable({
  providedIn: 'root'
})
export class Iso8583DialectService {
  private apiUrl = environment.core236;
  buttonStatus: string = '';
  customHttpResponse!: CustomHttpResponseModel;
  msgFormatIdList: MessageFormatGroupInterface[] = [];
  existingData: Iso8583DialectMsgTemplateModel = new Iso8583DialectMsgTemplateModel();
  dialogConfig: MatDialogConfig = {autoFocus: false, disableClose: true, width: '55%'};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private dialectDispatch: DialectDispatch,
    private msgFormatService: Iso8583FormatService,
    private iso8583DialectTableService: Iso8583DialectTableService
  ) {
  }

  getAllIso8583Dialect() {
    return this.http.get<Iso8583DialectMsgTemplateModel[]>(`${this.apiUrl}/dialectMsgTemplate/list`);
  }

  addIso8583Dialect(data: Iso8583DialectMsgTemplateModel) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/dialectMsgTemplate/${data.messageFormat.messageFormatId}/add`, data);
  }

  updateIso8583Dialect(data: FormData) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/dialectMsgTemplate/update`, data)
  }

  deleteIso8583Dialect(id: number) {
    return this.http.delete<CustomHttpResponseModel>(`${this.apiUrl}/dialectMsgTemplate/delete/` + id);
  }

  onGetAllIso8583Dialect() {
    this.iso8583DialectTableService.showTableLoading();
    this.dialectDispatch._DialectGetDispatch();
  }

  onCreateIso8583Dialect(payload: Iso8583DialectMsgTemplateModel) {
    this.dialectDispatch._DialectAddDispatch(payload);
  }

  onUpdateIso8583Dialect(payload: FormData, dataState: Iso8583DialectMsgTemplateModel) {
    this.dialectDispatch._DialectUpdateDispatch(payload, this.existingData.templateId, dataState);
  }

  onDeleteIso8583Dialect() {
    this.dialectDispatch._DialectDeleteDispatch(this.existingData.templateId);
  }

  onGetAllMessageFormat() {
    this.dialectDispatch._DialectGetMessageFormatDispatch();
  }

  createIso8583DialectFormData(currentNameType: string, newData: Iso8583DialectMsgTemplateModel): FormData {
    const formData = new FormData();
    formData.append('currentNameType', currentNameType);
    formData.append('nameType', newData.nameType);
    formData.append('description', newData.description);
    formData.append('messageFormatId', String(newData.messageFormat.messageFormatId));
    return formData;
  }

  openDialog() {
    this.dialog.open(DialogIso8583DialectComponent, this.dialogConfig);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  getCurrentStatusDialog() {
    return this.dialog.openDialogs;
  }

  set ExistingData(data: Iso8583DialectMsgTemplateModel) {
    this.existingData = data;
  }
}
