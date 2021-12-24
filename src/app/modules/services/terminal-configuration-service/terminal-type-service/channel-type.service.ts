import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {map} from "rxjs/operators";
import {ChannelTypeModel} from "../../../model/ChannelType.model";
import {Iso8583DialectMsgTemplateModel} from "../../../model/iso8583DialectMsgTemplateModel";
import {TerminalTypeTableService} from "./terminal-type-table.service";
import {NotificationService} from "../../../../globalServices/notification.service";
import {
  Iso8583DialectService
} from "../../external-interfaces/iso8583Configuration/iso8583-dialect/iso8583-dialect.service";
import {DialectMsgTemplateGroup} from "../../../interface/dialect-msg-template-group";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CustomHttpResponse} from "../../../../globalModel/custom-http-response";
import {RowClickedEvent} from "ag-grid-community";

@Injectable({
  providedIn: 'root'
})
export class ChannelTypeService {
  private apiUrl = environment.core236;
  buttonDialogStatus: string = '';
  private dialectMsgTemplateList: DialectMsgTemplateGroup[] = [];
  existingData: ChannelTypeModel = new ChannelTypeModel();
  dialogConfig: MatDialogConfig = {autoFocus: false, disableClose: true, width: '55%'};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private notifierService: NotificationService,
    private dialectService: Iso8583DialectService,
    private terminalTypeTableService: TerminalTypeTableService
  ) {
  }

  getAllChannelType() {
    return this.http.get<ChannelTypeModel[]>(`${this.apiUrl}/channelType/list`).pipe(map((response) => {
      return response;
    }));
  }

  addChannelType(data: ChannelTypeModel) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/channelType/register`, data).pipe(map((response) => {
      return response;
    }))
  }

  updateChannelType(data: FormData) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/channelType/update`, data).pipe(map((response) => {
      return response;
    }))
  }

  deleteChannelType(id: number) {
    return this.http.delete<CustomHttpResponse>(`${this.apiUrl}/channelType/delete/` + id).pipe(map((response) => {
      return response;
    }))
  }

  createChannelTypeFormData(currentTerminalId: string, newData: ChannelTypeModel) {
    const formData = new FormData();
    formData.append('currentTerminalType', currentTerminalId);
    formData.append('newTerminalType', newData.channelType);
    formData.append('newDialectTemplateId', String(newData.dialectMsgTemplateId));
    formData.append('description', newData.description);
    return formData;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  getAllChannelTypeWithDelay() {
    setTimeout(() => {
      this.onGetAllChannelType();
    }, 500);
  }

  // getAllDialectMsgTemplateWithDelay() {
  //   setTimeout(() => {
  //     this.onGetAllDialectMsgTemplate();
  //   });
  // }

  onGetAllChannelType() {
    this.terminalTypeTableService.showTableLoading();
    this.getAllChannelType().subscribe({
      next: this.responseGetAllChannelType(),
      error: this.errorGetAllChannelType()
    })
  }

  onAddChannelType(data: ChannelTypeModel) {
    this.addChannelType(data).subscribe({
      next: this.responseCreateAndUpdateChannelType(),
      error: this.errorCreateAndUpdateChannelType()
    })
  }

  onUpdateTerminalType(data: FormData) {
    this.updateChannelType(data).subscribe({
      next: this.responseCreateAndUpdateChannelType(),
      error: this.errorCreateAndUpdateChannelType()
    })
  }

  onDeleteChannelType() {
    this.deleteChannelType(this.existingData.id).subscribe({
      next: this.responseDeleteChannelType(),
      error: this.errorDeleteChannelType()
    })
  }

  private responseGetAllChannelType() {
    return (response: ChannelTypeModel[]) => {
      if (response.length != 0) {
        response.forEach(x => {
          const data = this.dialectMsgTemplateList.filter((value => {
            return value.code == String(x.dialectMsgTemplateId)
          }))
          x.dialectMsgTemplateId = data[0]?.name;
        })
        this.terminalTypeTableService.gridApi.onSortChanged();
        this.terminalTypeTableService.hideTableLoading();
        this.terminalTypeTableService.gridApi.setRowData(response);
      } else {
        this.terminalTypeTableService.showNoRowData();
      }
    }
  }

  private errorGetAllChannelType() {
    return (error: HttpErrorResponse) => {
      const errorMessage = 'Something went wrong, Please contact your administrator.';
      this.notifierService.errorNotification(errorMessage, error.status);
      this.terminalTypeTableService.showNoRowData();
    }
  }

  private responseCreateAndUpdateChannelType() {
    return (response: CustomHttpResponse) => {
      this.onGetAllChannelType();
      this.closeDialog();
      this.notifierService.successNotification(response.message, response.httpStatusCode);
    }
  }

  private errorCreateAndUpdateChannelType() {
    return (error: HttpErrorResponse) => {
      this.notifierService.errorNotification(error.error.message, error.status);
    }
  }

  private responseDeleteChannelType() {
    return (response: CustomHttpResponse) => {
      this.notifierService.successNotification(response.message, response.httpStatusCode);
      this.onGetAllChannelType();
    }
  }

  private errorDeleteChannelType() {
    return (error: HttpErrorResponse) => {
      this.notifierService.errorNotification(error.error.message, error.status);
    }
  }

  onGetAllDialectMsgTemplate() {
    this.dialectService.getAllIso8583Dialect().subscribe({
      next: this.responseGetAllDialectMsgTemplate()
    })
  }

  private responseGetAllDialectMsgTemplate() {
    return (response: Iso8583DialectMsgTemplateModel[]) => {
      response.forEach(x => {
        this.dialectMsgTemplateList.push({
          name: x.nameType,
          code: String(x.id)
        })
      })
    }
  }

  set ExistingData(data: RowClickedEvent) {
    this.existingData = data.data;
  }

  get DialectMsgTemplateList(): DialectMsgTemplateGroup[] {
    return this.dialectMsgTemplateList;
  }
}
