import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Iso8583FormatModel} from "../../model/modules-model/iso8583-format.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {
  CreateUpdateDialogIso8583FormatComponent
} from "../../modules/module/message-format/iso8583-format/widget/create-update-dialog-iso8583-format/create-update-dialog-iso8583-format.component";
import {Iso8583FormatTableService} from "./iso8583-format-table.service";
import {CustomHttpResponseModel} from "../../model/customHttpResponse-model/custom-http-response.model";
import {RowClickedEvent} from "ag-grid-community";
import {MessageFormatDispatch} from "../../state-configuration/modules/message-format/message-format.dispatch";

@Injectable({
  providedIn: 'root'
})
export class Iso8583FormatService {
  apiUrl = environment.core236;
  buttonStatus: string = '';
  existingData: Iso8583FormatModel = new Iso8583FormatModel();
  dialogConfig: MatDialogConfig = {autoFocus: false, disableClose: true, width: '55%'};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private messageFormatDispatch: MessageFormatDispatch,
    private iso8583FormatTableService: Iso8583FormatTableService
  ) { }

  getAllIso8583Format() {
    return this.http.get<Iso8583FormatModel[]>(`${this.apiUrl}/messageFormat/list`);
  }

  addIso8583Format(data: Iso8583FormatModel) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/messageFormat/add`, data);
  }

  updateIso8583Format(data: FormData) {
    return this.http.post<CustomHttpResponseModel>(`${this.apiUrl}/messageFormat/update`, data);
  }

  deleteIso8583Format(id: number) {
    return this.http.delete<CustomHttpResponseModel>(`${this.apiUrl}/messageFormat/delete/` + id);
  }

  getAllIso8583FormatWithDelay() {
    setTimeout(() => {
      this.onGetAllIso8583Format();
    }, 500)
  }

  onGetAllIso8583Format() {
    this.iso8583FormatTableService.showTableLoading();
    this.messageFormatDispatch._MessageFormatGetDispatch();
  }

  onCreateIso8583Format(data: Iso8583FormatModel) {
    this.messageFormatDispatch._MessageFormatAddDispatch(data);
  }

  onUpdateIso8583Format(data: FormData) {
   this.messageFormatDispatch._MessageFormatUpdateDispatch(data, this.existingData.messageFormatId, this.existingData);
  }

  onDeleteIso8583Format() {
    this.messageFormatDispatch._MessageFormatDeleteDispatch(this.existingData.messageFormatId);
  }

  createIso8583FormatFormData(currentMsgFormat: string, newData: Iso8583FormatModel): FormData {
    const formData = new FormData();
    formData.append('currentMsgFormat', currentMsgFormat);
    formData.append('newMsgFormat', newData.messageFormat);
    formData.append('newDescription', newData.description);
    return formData;
  }

  openDialog() {
    this.dialog.open(CreateUpdateDialogIso8583FormatComponent, this.dialogConfig);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  getCurrentStatusDialog() {
    return this.dialog.openDialogs;
  }

  set ExistingData(data: RowClickedEvent) {
    this.existingData = data.data;
  }
}
