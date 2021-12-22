import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {map} from "rxjs/operators";
import {TerminalTypeModel} from "../../../model/TerminalTypeModel";
import {DialectMsgTemplateModel} from "../../../model/dialectMsgTemplateModel";
import {NotificationTypeEnum} from "../../../../enum/notification-type.enum";
import {TerminalTypeTableService} from "./terminal-type-table.service";
import {NotificationService} from "../../../../globalServices/notification.service";
import {DialectMessageService} from "../../dialect-message-service/dialect-message.service";
import {DialectMsgTemplateGroup} from "../../../interface/dialect-msg-template-group";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class TerminalTypeService {
  buttonDialogStatus: string = '';
  dialectMsgTemplateList: DialectMsgTemplateGroup[] = [];
  existingData: TerminalTypeModel = new TerminalTypeModel();
  apiUrl = environment.core236;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private notifierService: NotificationService,
    private dialectService: DialectMessageService,
    private terminalTypeTableService: TerminalTypeTableService
  ) {
  }

  getAllTerminalType() {
    return this.http.get<TerminalTypeModel[]>(`${this.apiUrl}/channelType/list`).pipe(map((response) => {
      return response;
    }));
  }

  addTerminalType(data: TerminalTypeModel) {
    return this.http.post(`${this.apiUrl}/channelType/register`, data).pipe(map((response) => {
      return response;
    }))
  }

  updateTerminalType(data: FormData) {
    return this.http.post(`${this.apiUrl}/channelType/update`, data).pipe(map((response) => {
      return response;
    }))
  }

  deleteTerminalType(id: number) {
    return this.http.delete(`${this.apiUrl}/channelType/delete/` + id).pipe(map((response) => {
      return response;
    }))
  }

  createTerminalTypeFormData(currentTerminalId: string, newData: TerminalTypeModel) {
    const formData = new FormData();
    formData.append('currentTerminalType', currentTerminalId);
    formData.append('newTerminalType', newData.channelType);
    formData.append('newDialectTemplateId', String(newData.dialectMsgTemplateId));
    formData.append('description', newData.description);
    return formData;
  }

  getAllTerminalTypeWithDelay() {
    setTimeout(() => {
      this.onGetAllTerminalType();
    }, 500);
  }

  getAllDialectMsgTemplateWithDelay() {
    setTimeout(() => {
      this.onGetAllDialectMsgTemplate();
    });
  }

  onGetAllTerminalType() {
    this.terminalTypeTableService.showTableLoading();
    this.getAllTerminalType().subscribe({
      next: this.responseGetAllTerminalType(),
      error: this.errorGetAllTerminalType()
    })
  }

  onAddTerminalType(data: TerminalTypeModel) {
    this.addTerminalType(data).subscribe({
      next: this.responseCreateAndUpdateTerminalType(),
      error: this.errorCreateAndUpdateTerminalType()
    })
  }

  onUpdateTerminalType(data: FormData) {
    this.updateTerminalType(data).subscribe({
      next: this.responseCreateAndUpdateTerminalType(),
      error: this.errorCreateAndUpdateTerminalType()
    })
  }

  onDeleteTerminalType() {
    this.deleteTerminalType(this.existingData.id).subscribe({
      next: this.responseDelete(),
      error: this.errorDelete()
    })
  }

  onGetAllDialectMsgTemplate() {
    this.dialectService.getAllDialectMsgTemplate().subscribe({
      next: this.responseGetAllDialectMsgTemplate()
    })
  }

  successNotification(message: string, statusCode: number) {
    this.notifierService.notify(NotificationTypeEnum.SUCCESS, message, statusCode);
  }

  errorNotification(message: string, statusCode: number) {
    this.notifierService.notify(NotificationTypeEnum.ERROR, message, statusCode)
  }

  private responseGetAllTerminalType() {
    return (response: TerminalTypeModel[]) => {
      console.table(response)
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

  private errorGetAllTerminalType() {
    return (error: HttpErrorResponse) => {
      this.errorNotification(error.message, error.status);
      this.terminalTypeTableService.showNoRowData();
    }
  }

  private responseCreateAndUpdateTerminalType() {
    return (response: any) => {
      this.onGetAllTerminalType();
      this.dialog.closeAll();
      this.notifierService.notify(NotificationTypeEnum.SUCCESS, response.message, 0);
    }
  }

  private errorCreateAndUpdateTerminalType() {
    return (error: HttpErrorResponse) => {
      this.notifierService.notify(NotificationTypeEnum.ERROR, error.error.message, error.status);
    }
  }

  private responseDelete() {
    return (response: any) => {
      this.notifierService.notify(NotificationTypeEnum.SUCCESS, 'Data deleted successfully', 0);
      this.onGetAllTerminalType();
    }
  }

  private errorDelete() {
    return (error: HttpErrorResponse) => {
      this.notifierService.notify(NotificationTypeEnum.ERROR, error.error.message, error.status)
    }
  }

  private responseGetAllDialectMsgTemplate() {
    return (response: DialectMsgTemplateModel[]) => {
      response.forEach(x => {
        this.dialectMsgTemplateList.push({
          name: x.nameType,
          code: String(x.id)
        })
      })
    }
  }
}
