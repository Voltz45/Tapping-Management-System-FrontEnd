import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ChannelTypeModel} from "../../model/modules-model/channel-type.model";
import {ChannelTypeTableService} from "./channel-type-table.service";
import {Iso8583DialectService} from "./iso8583-dialect.service";
import {DialectMsgTemplateGroupInterface} from "../../interface/modules/dialect-msg-template-group.interface";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CustomHttpResponseModel} from "../../model/customHttpResponse-model/custom-http-response.model";
import {
  CreateUpdateDialogChannelTypeComponent
} from "../../modules/module/channelConfiguration/channel-type/widget/create-update-dialog/create-update-channelType-dialog.component";
import {
  ChannelTypeDispatch
} from "../../state-configuration/modules/channel-configuration/channel-type/channel-type.dispatch";

@Injectable({
  providedIn: 'root'
})
export class ChannelTypeService {
  private apiUrl = environment.core236;
  buttonDialogStatus: string = '';
  dialectMsgTemplateList: DialectMsgTemplateGroupInterface[] = [];
  existingData: ChannelTypeModel = new ChannelTypeModel();
  dialogConfig: MatDialogConfig = {autoFocus: false, disableClose: true, width: '55%'};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private channelTypeDispatch: ChannelTypeDispatch,
    private dialectService: Iso8583DialectService,
    private channelTypeTableService: ChannelTypeTableService
  ) {
  }

  getAllChannelType() {
    return this.http.get<ChannelTypeModel[]>(`${this.apiUrl}/channelType/list`);
  }

  addChannelType(data: ChannelTypeModel) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/channelType/${data.dialectMessageTemplate.templateId}/register`, data);
  }

  updateChannelType(data: FormData) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/channelType/update`, data);
  }

  deleteChannelType(id: number) {
    return this.http.delete<CustomHttpResponseModel>(`${this.apiUrl}/channelType/delete/` + id);
  }

  getAllChannelTypeWithDelay() {
    setTimeout(() => {
      this.onGetAllChannelType();
    }, 500);
  }

  onGetAllChannelType() {
    this.channelTypeTableService.showTableLoading();
    this.channelTypeDispatch._ChannelTypeGetDispatch();
  }

  onAddChannelType(payload: ChannelTypeModel) {
    this.channelTypeDispatch._ChannelTypeAddDispatch(payload);
  }

  onUpdateChannelType(payload: FormData, dataState: ChannelTypeModel) {
    this.channelTypeDispatch._ChannelTypeUpdateDispatch(payload, this.existingData.channelTypeId, dataState);
  }

  onDeleteChannelType() {
    this.channelTypeDispatch._ChannelTypeDelete(this.existingData.channelTypeId);
  }

  onGetAllDialectMsgTemplate() {
    this.channelTypeDispatch._ChannelTypeGetDialectDispatch();
  }

  createChannelTypeFormData(currentTerminalId: string, newData: ChannelTypeModel) {
    const formData = new FormData();
    formData.append('currentTerminalType', currentTerminalId);
    formData.append('newTerminalType', newData.channelType);
    formData.append('newDialectTemplateId', String(newData.dialectMessageTemplate.templateId));
    formData.append('description', newData.description);
    return formData;
  }

  openDialog() {
    this.dialog.open(CreateUpdateDialogChannelTypeComponent, this.dialogConfig);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  getCurrentStatusDialog() {
    return this.dialog.openDialogs;
  }

  set ExistingData(data: ChannelTypeModel) {
    this.existingData = data;
  }
}
