import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";

@Injectable({
  providedIn: 'root'
})
export class TerminalTypeTableService {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  defaultColDef: ColDef = {
    flex: 1,
    editable: false,
    sortable: true
  };

  columnDefs: ColDef[] = [
    {field: 'id', hide: true, headerClass: 'terminal-type-header-color'},
    {field: 'channelType', sort: 'asc', headerClass: 'terminal-type-header-color'},
    {field: 'dialectMsgTemplateId', headerName: 'Message Template', headerClass: 'terminal-type-header-color'},
    {field: 'description', width: 200, headerClass: 'terminal-type-header-color'},
    {field: 'actions', maxWidth: 100, cellRenderer: 'actionButtonGroup', headerClass: 'terminal-type-header-color'}
  ]

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
}
