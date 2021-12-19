import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";
import {TerminalService} from "./terminal.service";
import {TerminalModel} from "../../../model/TerminalModel";
import {NotificationService} from "../../../../globalServices/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationTypeEnum} from "../../../../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {TerminalTypeService} from "../terminal-type-service/terminal-type.service";
import {TerminalTypeModel} from "../../../model/TerminalTypeModel";
import {TerminalTypeGroup} from "../../../interface/terminal-type-group";

@Injectable({
  providedIn: 'root'
})
export class TerminalTableService {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  rowData: TerminalModel[] = [];
  existingData: TerminalModel = new TerminalModel();
  matDialog!: MatDialog;
  buttonStatus: string = '';
  terminalTypeList: TerminalTypeGroup[] = [];
  terminalValue: string[] = [];
  terminalTextValue: string[] = [];
  sortModel = [
    {
      colId: 'transactionDate',
      sort: 'desc'
    }
  ]
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 110,
    editable: false
  };
  columnDefs: ColDef[] = [
    {field: 'id', hide: true, minWidth: 400, maxWidth: 500, headerClass: 'terminal-header-color'},
    {
      field: 'terminalId',
      sortable: true,
      sort: 'asc',
      minWidth: 200,
      maxWidth: 200,
      headerClass: 'terminal-header-color'
    },
    {field: 'terminalType', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'terminal-header-color'},
    {field: 'ipAddress', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'terminal-header-color'},
    {field: 'port', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'terminal-header-color'},
    {field: 'timeTrace', hide: true, minWidth: 150, maxWidth: 200, headerClass: 'terminal-header-color'},
    {
      field: 'channelStatus', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'terminal-header-color',
      cellRenderer: function (params) {
        let badge;
        if (params.value == '1') {
          badge = '<span style="color: white" class="badge bg-success">Active</span>'
        } else {
          badge = '<span style="color: white" class="badge bg-danger">Not Active</span>'
        }
        return badge;
      }
    },
    {
      field: 'onPremise', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'terminal-header-color',
      cellRenderer: function (params) {
        let badge;
        if (params.value) {
          badge = '<span style="color: white" class="badge bg-primary">On Premise</span>'
        } else {
          badge = '<span style="color: white" class="badge bg-secondary">Off Premise</span>'
        }
        return badge;
      }
    },
    {
      field: 'action',
      sortable: true,
      resizable: false,
      minWidth: 150, maxWidth: 200,
      cellRenderer: 'actionButtonGroup',
      headerClass: 'terminal-header-color'
    }
  ];

  constructor(
    private terminalService: TerminalService,
    private notifierService: NotificationService,
    private terminalTypeService: TerminalTypeService,
    private dialog: MatDialog
  ) {
  }

  onFilter(searchInputClass: string) {
    this.gridApi.setQuickFilter((document.getElementById(searchInputClass) as HTMLInputElement)?.value)
  }

  getAllTerminalWithDelay() {
    setTimeout(() => {
      this.onGetAllTerminal();
    }, 200);
  }

  onGetAllTerminal() {
    const terminalTable = document.querySelector('.terminal-table') as HTMLElement;
    this.showTableLoading();
    this.terminalService.getAllTerminal().subscribe({
      next: this.responseGetAllTerminal(terminalTable),
      error: this.errorGetAllTerminal()
    })
  }

  onCreateTerminal(data: TerminalModel) {
    this.terminalService.addTerminal(data).subscribe({
      next: this.responseCreateAmdUpdate('Data added successfully.'),
      error: this.errorCreateAndUpdate()
    });
  }

  onUpdateTerminal(data: FormData) {
    this.terminalService.updateTerminal(data).subscribe({
      next: this.responseCreateAmdUpdate('Data edited successfully'),
      error: this.errorCreateAndUpdate()
    })
  }

  onDeleteTerminal() {
    this.terminalService.deleteTerminal(this.existingData.id).subscribe({
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
    this.terminalTypeService.getAllTerminalType().subscribe({
      next: this.responseGetAllTerminalType()
    })
  }

  private responseGetAllTerminal(terminalTable: HTMLElement) {
    return (response: TerminalModel[]) => {
      if (response.length != 0) {
        response.forEach(x => {
          const data = this.terminalTypeList.filter((value => {
            return value.value == x.terminalType
          }));
          x.terminalType = data[0].viewValue;
        })
        this.gridColumnApi.applyColumnState({state: this.sortModel});
        this.gridApi.onSortChanged();
        this.hideTableLoading();
        this.gridApi.setRowData(response);
        this.rowData = response;
      } else {
        this.showNoRowData();
      }
    }
  }

  private errorGetAllTerminal() {
    return (error: HttpErrorResponse) => {
      const errorMessage = 'Something went wrong, Please contact your administrator.';
      this.errorNotification(errorMessage, error.status);
      this.showNoRowData();
    }
  }

  private responseCreateAmdUpdate(message: string) {
    return (response: any) => {
      this.getAllTerminalWithDelay();
      this.dialog.closeAll();
      this.successNotification(message, response.status);
    }
  }

  private errorCreateAndUpdate() {
    return (error: HttpErrorResponse) => this.errorNotification(JSON.stringify(error.message), error.status);
  }

  private responseDelete() {
    return (response: any) => {
      this.notifierService.notify(NotificationTypeEnum.SUCCESS, 'Data deleted successfully', response.status);
      this.getAllTerminalWithDelay();
    }
  }

  private errorDelete() {
    return (error: HttpErrorResponse) => {
      this.notifierService.notify(NotificationTypeEnum.ERROR, error.message, error.status)
    }
  }

  private responseGetAllTerminalType() {
    return (response: TerminalTypeModel[]) => {
      response.forEach(x => {
        this.terminalTypeList.push({
          value: String(x.msgTemplate),
          viewValue: x.terminalType
        })
      })
    }
  }

  successNotification(message: string, statusCode: number) {
    this.notifierService.notify(NotificationTypeEnum.SUCCESS, message, statusCode);
  }

  errorNotification(message: string, statusCode: number) {
    this.notifierService.notify(NotificationTypeEnum.ERROR, message, statusCode)
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
