import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {Iso8583DialectMsgTemplateModel} from "../../../../model/iso8583DialectMsgTemplateModel";
import {CustomHttpResponse} from "../../../../../globalModel/custom-http-response";
import {Iso8583DialectTableService} from "./iso8583-dialect-table.service";
import {NotificationService} from "../../../../../globalServices/notification.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RowClickedEvent} from "ag-grid-community";
import {MessageFormatGroup} from "../../../../interface/message-format-group";
import {Iso8583FormatService} from "../../../message-format/iso8583-format/iso8583-format.service";
import {Iso8583FormatModel} from "../../../../model/iso8583-Format.model";

@Injectable({
  providedIn: 'root'
})
export class Iso8583DialectService {
  apiUrl = environment.core236;
  buttonStatus: string = '';
  msgFormatIdList: MessageFormatGroup[] = [];
  existingData: Iso8583DialectMsgTemplateModel = new Iso8583DialectMsgTemplateModel();
  dialogConfig: MatDialogConfig = {autoFocus: false, disableClose: true, width: '55%'};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private notifierService: NotificationService,
    private msgFormatService: Iso8583FormatService,
    private iso8583DialectTableService: Iso8583DialectTableService
  ) {
  }

  getAllIso8583Dialect() {
    return this.http.get<Iso8583DialectMsgTemplateModel[]>(`${this.apiUrl}/dialectMsgTemplate/list`).pipe(map(response => {
      return response;
    }));
  }

  addIso8583Dialect(data: Iso8583DialectMsgTemplateModel) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/dialectMsgTemplate/add`, data).pipe(map(response => {
      return response;
    }))
  }

  updateIso8583Dialect(data: FormData) {
    return this.http.post<CustomHttpResponse>(`${this.apiUrl}/dialectMsgTemplate/update`, data).pipe(map(response => {
      return response;
    }))
  }

  deleteIso8583Dialect(id: number) {
    return this.http.delete<CustomHttpResponse>(`${this.apiUrl}/dialectMsgTemplate/delete/` + id).pipe(map(response => {
      return response;
    }))
  }

  createIso8583DialectFormData(currentNameType: string, newData: Iso8583DialectMsgTemplateModel): FormData {
    const formData = new FormData();
    formData.append('currentNameType', currentNameType);
    formData.append('nameType', newData.nameType);
    formData.append('description', newData.description);
    formData.append('messageFormatId', newData.messageFormatId);
    return formData;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  getAllIso8583DialectWithDelay() {
    setTimeout(() => {
      this.onGetAllIso8583Dialect();
    }, 500)
  }

  onGetAllIso8583Dialect() {
    this.iso8583DialectTableService.showTableLoading();
    this.getAllIso8583Dialect().subscribe({
      next: this.responseGetAllIso8583Dialect(),
      error: this.errorGetAllIso8583Dialect()
    })
  }

  onCreateIso8583Dialect(data: Iso8583DialectMsgTemplateModel) {
    this.addIso8583Dialect(data).subscribe({
      next: this.responseCreateAndUpdateIso8583Dialect(),
      error: this.errorCreateAndUpdateIso8583Dialect()
    })
  }

  onUpdateIso8583Dialect(data: FormData) {
    this.updateIso8583Dialect(data).subscribe({
      next: this.responseCreateAndUpdateIso8583Dialect(),
      error: this.errorCreateAndUpdateIso8583Dialect()
    })
  }

  onDeleteIso8583Dialect() {
    this.deleteIso8583Dialect(this.existingData.id).subscribe({
      next: this.responseDeleteIso8583Dialect(),
      error: this.errorDeleteIso8583Dialect()
    })
  }

  private responseGetAllIso8583Dialect() {
    return (response: Iso8583DialectMsgTemplateModel[]) => {
      if (response.length != 0) {
        response.forEach(x => {
          const data = this.msgFormatIdList.filter(value => {
            return value.code === String(x.messageFormatId)
          })
          x.messageFormatId = data[0]?.name;
        })
        this.iso8583DialectTableService.applyFirstColSorting();
        this.iso8583DialectTableService.hideTableLoading();
        this.iso8583DialectTableService.setRowData(response);
      } else {
        this.iso8583DialectTableService.setRowData(response);
        this.iso8583DialectTableService.showNoRowData();
      }
    }
  }

  private errorGetAllIso8583Dialect() {
    return (error: HttpErrorResponse) => {
      const errorMessage = 'Something went wrong, Please contact your administrator.';
      this.notifierService.errorNotification(errorMessage, error.status);
      this.iso8583DialectTableService.showNoRowData();
    }
  }

  private responseCreateAndUpdateIso8583Dialect() {
    return (response: CustomHttpResponse) => {
      this.onGetAllIso8583Dialect();
      this.closeDialog();
      this.notifierService.successNotification(response.message, response.httpStatusCode);
    }
  }

  private errorCreateAndUpdateIso8583Dialect() {
    return (error: HttpErrorResponse) => {
      this.notifierService.errorNotification(error.error.message, error.status);
    }
  }

  private responseDeleteIso8583Dialect() {
    return (response: CustomHttpResponse) => {
      this.onGetAllIso8583Dialect();
      this.notifierService.successNotification(response.message, response.httpStatusCode);
    }
  }

  private errorDeleteIso8583Dialect() {
    return (error: HttpErrorResponse) => {
      this.notifierService.errorNotification(error.error.message, error.status);
    }
  }

  onGetAllMessageFormat() {
    this.msgFormatService.getAllIso8583Format().subscribe({
      next: this.responseGetAllMessageFormat()
    })
  }

  private responseGetAllMessageFormat() {
    return (response: Iso8583FormatModel[]) => {
      response.forEach(x => {
        this.msgFormatIdList.push({
          name: x.msgFormat,
          code: String(x.id)
        })
      })
    }
  }

  set ExistingData(data: RowClickedEvent) {
    this.existingData = data.data;
  }

  get Dialog(): MatDialog {
    return this.dialog;
  }

  get MsgFormatIdList(): MessageFormatGroup[] {
    return this.msgFormatIdList;
  }
}
