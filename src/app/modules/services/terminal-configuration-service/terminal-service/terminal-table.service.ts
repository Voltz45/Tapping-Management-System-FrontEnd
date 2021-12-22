import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";

@Injectable({
  providedIn: 'root'
})
export class TerminalTableService {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;

  sortModel = [
    {
      colId: 'transactionDate',
      sort: 'desc'
    }
  ]
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 110,
    editable: false,
    lockPosition: true
  };
  columnDefs: ColDef[] = [
    {field: 'id', hide: true, headerClass: 'terminal-header-color'},
    {
      field: 'channelId',
      sortable: true,
      sort: 'asc',
      headerClass: 'terminal-header-color'
    },
    {field: 'channelType', sortable: true, headerClass: 'terminal-header-color'},
    {field: 'ipAddress', sortable: true, headerClass: 'terminal-header-color'},
    {field: 'port', sortable: true, headerClass: 'terminal-header-color'},
    {field: 'timeTrace', hide: true, headerClass: 'terminal-header-color'},
    {
      field: 'channelStatus',
      sortable: true,
      headerClass: 'terminal-header-color',
      cellRenderer: 'tag'
    },
    {
      field: 'onPremise',
      sortable: true,
      headerClass: 'terminal-header-color',
      cellRenderer: 'tag'
    },
    {
      field: 'action',
      sortable: true,
      resizable: false,
      cellRenderer: 'actionButtonGroup',
      headerClass: 'terminal-header-color'
    }
  ];

  constructor() {
  }

  onFilter(searchInputClass: string) {
    this.gridApi.setQuickFilter((document.getElementById(searchInputClass) as HTMLInputElement)?.value)
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
