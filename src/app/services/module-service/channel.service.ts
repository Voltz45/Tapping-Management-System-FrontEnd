import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ChannelModel} from "../../model/modules-model/channel.model";
import {CustomHttpResponseModel} from "../../model/customHttpResponse-model/custom-http-response.model";
import {ChannelTableService} from "./channel-table.service";
import {ChannelTypeService} from "./channel-type.service";
import {ChannelTypeGroupInterface} from "../../interface/modules/channel-type-group.interface";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  CreateUpdateDialogComponent
} from "../../modules/module/channelConfiguration/channel/widget/create-update-dialog/create-update-dialog.component";
import {ChannelDispatch} from "../../state-configuration/modules/channel-configuration/channel/channel.dispatch";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private apiUrl = environment.core236;
  buttonStatus: string = '';
  existingData: ChannelModel = new ChannelModel();
  channelList: ChannelTypeGroupInterface[] = [];
  dialogConfig: MatDialogConfig = {autoFocus: false, disableClose: true, width: '55%'};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private channelDispatch: ChannelDispatch,
    private channelTypeService: ChannelTypeService,
    private channelTableService: ChannelTableService
  ) {
  }

  getAllChannel() {
    return this.http.get<ChannelModel[]>(`${this.apiUrl}/channel/list`);
  }

  addChannel(data: ChannelModel) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/channel/${data.channelType.channelTypeId}/register`, data);
  }

  updateChannel(data: FormData) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/channel/update`, data);
  }

  deleteChannel(id: number) {
    return this.http.delete<CustomHttpResponseModel>(`${this.apiUrl}/channel/delete/` + id);
  }

  deleteChannelTest(id: number) {
    return this.http.delete<CustomHttpResponseModel>(`${this.apiUrl}/channel/delete/` + id);
  }

  getAllChannelWithDelay() {
    setTimeout(() => {
      this.onGetAllChannel();
    }, 500);
  }

  onGetAllChannel() {
    this.channelTableService.showTableLoading();
    this.channelDispatch._ChannelGetDispatch();
  }

  onCreateChannel(data: ChannelModel) {
    this.channelDispatch._ChannelAdd(data);
  }

  onUpdateChannel(data: FormData, dataState: ChannelModel) {
    this.channelDispatch._ChannelUpdate(data, this.existingData.id ,dataState);
  }

  onDeleteChannel() {
    this.channelDispatch._ChannelDelete(this.existingData.id);
  }

  onGetAllTerminalType() {
    this.channelDispatch._ChannelGetChannelTypeDispatch();
  }

  createChannelFormData(currentChannelId: string, newData: ChannelModel) {
    const formData = new FormData();
    formData.append('currentChannelId', currentChannelId);
    formData.append('newChannelId', String(newData.channelId));
    formData.append('newIpAddress', newData.ipAddress);
    formData.append('newPort', newData.port);
    formData.append('newChannelType', String(newData.channelType.channelTypeId));
    formData.append('isOnPremise', String(newData.isOnPremise));
    return formData;
  }

  openDialog() {
    this.dialog.open(CreateUpdateDialogComponent, this.dialogConfig);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  getCurrentStatusDialog() {
    return this.dialog.openDialogs;
  }

  set ExistingData(data: ChannelModel) {
    this.existingData = data;
  }
}
