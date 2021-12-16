import {Injectable} from '@angular/core';
import {ColDef, GridApi} from "ag-grid-community";
import {TerminalService} from "./terminal.service";
import {TerminalModel} from "../../../model/TerminalModel";
import {NotificationService} from "../../../../layout/service/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationTypeEnum} from "../../../../layout/enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TerminalTableService {
  gridApi!: GridApi;
  existingData: TerminalModel = new TerminalModel();
  matDialog!: MatDialog;
  buttonStatus: string = '';
  defaultColDef = {
    flex: 1,
    minWidth: 110,
    editable: false,
    resizable: true,
  };
  columnDefs: ColDef[] = [
    {field: 'id', hide: true, headerClass: 'terminal-header-color'},
    {field: 'terminalId', headerClass: 'terminal-header-color'},
    {field: 'terminalType', headerClass: 'terminal-header-color'},
    {field: 'ipAddress', headerClass: 'terminal-header-color'},
    {field: 'port', headerClass: 'terminal-header-color'},
    {field: 'timeTrace', hide: true, headerClass: 'terminal-header-color'},
    {field: 'channelStatus', headerClass: 'terminal-header-color'},
    {field: 'onPremise', headerClass: 'terminal-header-color'},
    {field: 'action', cellRenderer: 'actionButtonGroup', headerClass: 'terminal-header-color'}
  ];

  constructor(
    private terminalService: TerminalService,
    private notifierService: NotificationService,
    private dialog: MatDialog
  ) {
  }

  getAllTerminal() {
    const terminalTable = document.querySelector('.terminal-table') as HTMLElement;
    this.showTableLoading();
    this.terminalService.getAllTerminal().subscribe((response) => {
      if (response.length != 0) {
        terminalTable.style.height = 'auto';
        this.setAutoHeightTable();
        this.hideTableLoading();
        this.gridApi.setRowData(response);
      } else {
        this.showNoRowData();
      }
    }, (error) => {
      this.gridApi.showNoRowsOverlay();
    })
  }

  getAllTerminalWithDelay() {
    setTimeout(() => {
      this.getAllTerminal();
    }, 800);
  }

  onCreateTerminal(data: TerminalModel) {
    this.terminalService.addTerminal(data).subscribe({
      next: this.responseCreateAmdUpdate('Data added successfully.'),
      error: this.errorCreateAndUpdate
    });
  }

  onUpdateTerminal(data: FormData) {
    this.terminalService.updateTerminal(data).subscribe({
      next: this.responseCreateAmdUpdate('Data edited successfully'),
      error: this.errorCreateAndUpdate
    })
  }

  onDeleteTerminal() {
    this.terminalService.deleteTerminal(this.existingData.id).subscribe({
      next: this.responseDelete,
      error: this.errorDelete
    });

  }

  responseCreateAmdUpdate(message: string) {
    return (response: any) => {
      this.getAllTerminalWithDelay();
      this.dialog.closeAll();
      this.successNotification('Data edited successfully');
    }
  }

  errorCreateAndUpdate() {
    return (error: any) => this.errorNotification(JSON.stringify(error.message));
  }

  responseDelete = (response: any) => {
    this.notifierService.notify(NotificationTypeEnum.SUCCESS, 'Data deleted successfully');
    this.getAllTerminalWithDelay();
  }

  errorDelete = (error: HttpErrorResponse) => {
    this.notifierService.notify(NotificationTypeEnum.ERROR, error.message)
  }

  successNotification(message: string) {
    this.notifierService.notify(NotificationTypeEnum.SUCCESS, message);
  }

  errorNotification(message: string) {
    this.notifierService.notify(NotificationTypeEnum.ERROR, message)
  }

  showTableLoading() {
    this.gridApi.showLoadingOverlay();
  }

  hideTableLoading() {
    this.gridApi.hideOverlay();
  }

  showNoRowData() {
    this.gridApi.showNoRowsOverlay();
  }

  setAutoHeightTable() {
    this.gridApi.setDomLayout('autoHeight');
  }
}
