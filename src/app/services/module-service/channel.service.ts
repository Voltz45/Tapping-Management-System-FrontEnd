import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {ChannelModel} from "../../model/modules-model/channel.model";
import {CustomHttpResponseModel} from "../../model/customHttpResponse-model/custom-http-response.model";
import {NotificationTypeEnum} from "../../enum/notification-type.enum";
import {ChannelTypeModel} from "../../model/modules-model/channel-type.model";
import {ChannelTableService} from "./channel-table.service";
import {ChannelTypeService} from "./channel-type.service";
import {TerminalTypeGroupInterface} from "../../interface/modules/terminal-type-group.interface";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../notification-service/notification.service";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  apiUrl = environment.core236;
  existingData: ChannelModel = new ChannelModel();
  buttonStatus: string = '';
  terminalTypeList: TerminalTypeGroupInterface[] = [];

  constructor(
    private http: HttpClient,
    private terminalTableService: ChannelTableService,
    private terminalTypeService: ChannelTypeService,
    private notifierService: NotificationService,
    private dialog: MatDialog
  ) {
  }

  getAllTerminal() {
    return this.http.get<ChannelModel[]>(`${this.apiUrl}/channel/list`).pipe(map((response) => {
      return response;
    }))
  }

  addTerminal(data: ChannelModel) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/channel/register`, data).pipe(map((response) => {
      return response;
    }))
  }

  updateTerminal(data: FormData) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/channel/update`, data).pipe(map((response) => {
      return response;
    }))
  }

  deleteTerminal(id: number) {
    return this.http.delete(`${this.apiUrl}/channel/delete/` + id).pipe(map((response) => {
      return response;
    }))
  }

  createTerminalFormData(currentChannelId: string, newData: ChannelModel) {
    const formData = new FormData();
    formData.append('currentChannelId', currentChannelId);
    formData.append('newChannelId', newData.channelId);
    formData.append('newIpAddress', newData.ipAddress);
    formData.append('newPort', newData.port);
    formData.append('newChannelType', String(newData.channelType));
    formData.append('isOnPremise', String(newData.onPremise));
    return formData;
  }

  getAllTerminalWithDelay() {
    setTimeout(() => {
      this.onGetAllTerminal();
    }, 200);
  }

  onGetAllTerminal() {
    this.terminalTableService.showTableLoading();
    this.getAllTerminal().subscribe({
      next: this.responseGetAllTerminal(),
      error: this.errorGetAllTerminal()
    })
  }

  onCreateTerminal(data: ChannelModel) {
    this.addTerminal(data).subscribe({
      next: this.responseCreateAndUpdate('Data added successfully.'),
      error: this.errorCreateAndUpdate()
    });
  }

  onUpdateTerminal(data: FormData) {
    this.updateTerminal(data).subscribe({
      next: this.responseCreateAndUpdate('Data edited successfully'),
      error: this.errorCreateAndUpdate()
    })
  }

  onDeleteTerminal() {
    this.deleteTerminal(this.existingData.id).subscribe({
      next: this.responseDelete(),
      error: this.errorDelete()
    });
  }

  getAllTerminalTypeWithDelay() {
    setTimeout(() => {
      this.onGetAllTerminalType();
    });
  }

  onGetAllTerminalType() {
    this.terminalTypeService.getAllChannelType().subscribe({
      next: this.responseGetAllTerminalType()
    })
  }

  successNotification(message: string, statusCode: number) {
    this.notifierService.notify(NotificationTypeEnum.SUCCESS, message, statusCode);
  }

  errorNotification(message: string, statusCode: number) {
    this.notifierService.notify(NotificationTypeEnum.ERROR, message, statusCode)
  }

  private responseGetAllTerminal() {
    return (response: ChannelModel[]) => {
      if (response.length != 0) {
        response.forEach(x => {
          const data = this.terminalTypeList.filter((value => {
            return value.code == x.channelType
          }));
          x.channelType = data[0]?.name;
        })
        this.terminalTableService.gridColumnApi.applyColumnState({state: this.terminalTableService.sortModel});
        this.terminalTableService.gridApi.onSortChanged();
        this.terminalTableService.hideTableLoading();
        this.terminalTableService.gridApi.setRowData(response);
      } else {
        this.terminalTableService.gridApi.setRowData(response);
        this.terminalTableService.showNoRowData();
      }
    }
  }

  private errorGetAllTerminal() {
    return (error: HttpErrorResponse) => {
      const errorMessage = 'Something went wrong, Please contact your administrator.';
      this.errorNotification(errorMessage, error.status);
      this.terminalTableService.showNoRowData();
    }
  }

  private responseCreateAndUpdate(message: string) {
    return (response: any) => {
      this.onGetAllTerminal();
      this.dialog.closeAll();
      this.successNotification(response.message, response.status);
    }
  }

  private errorCreateAndUpdate() {
    return (error: HttpErrorResponse) => {
      this.errorNotification(error.error.message, error.status)
    };
  }

  private responseDelete() {
    return (response: any) => {
      this.notifierService.notify(NotificationTypeEnum.SUCCESS, 'Data deleted successfully', 0);
      this.getAllTerminalWithDelay();
    }
  }

  private errorDelete() {
    return (error: HttpErrorResponse) => {
      this.notifierService.notify(NotificationTypeEnum.ERROR, error.error.message, error.status)
    }
  }

  private responseGetAllTerminalType() {
    return (response: ChannelTypeModel[]) => {
      response.forEach(x => {
        this.terminalTypeList.push({
          code: String(x.id),
          name: x.channelType
        });
      })
    }
  }
}
