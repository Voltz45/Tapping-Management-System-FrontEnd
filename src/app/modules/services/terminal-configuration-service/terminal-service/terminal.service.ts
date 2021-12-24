import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {map} from "rxjs/operators";
import {TerminalModel} from "../../../model/TerminalModel";
import {CustomHttpResponse} from "../../../../globalModel/custom-http-response";
import {NotificationTypeEnum} from "../../../../enum/notification-type.enum";
import {ChannelTypeModel} from "../../../model/ChannelType.model";
import {TerminalTableService} from "./terminal-table.service";
import {ChannelTypeService} from "../terminal-type-service/channel-type.service";
import {TerminalTypeGroup} from "../../../interface/terminal-type-group";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../../globalServices/notification.service";

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  apiUrl = environment.core236;
  existingData: TerminalModel = new TerminalModel();
  buttonStatus: string = '';
  terminalTypeList: TerminalTypeGroup[] = [];

  constructor(
    private http: HttpClient,
    private terminalTableService: TerminalTableService,
    private terminalTypeService: ChannelTypeService,
    private notifierService: NotificationService,
    private dialog: MatDialog
  ) {
  }

  getAllTerminal() {
    return this.http.get<TerminalModel[]>(`${this.apiUrl}/channel/list`).pipe(map((response) => {
      return response;
    }))
  }

  addTerminal(data: TerminalModel) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/channel/register`, data).pipe(map((response) => {
      return response;
    }))
  }

  updateTerminal(data: FormData) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/channel/update`, data).pipe(map((response) => {
      return response;
    }))
  }

  deleteTerminal(id: number) {
    return this.http.delete(`${this.apiUrl}/channel/delete/` + id).pipe(map((response) => {
      return response;
    }))
  }

  createTerminalFormData(currentChannelId: string, newData: TerminalModel) {
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

  onCreateTerminal(data: TerminalModel) {
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
    return (response: TerminalModel[]) => {
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
