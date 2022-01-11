import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {
  ActionButtonGroupIso8583FormatComponent
} from "../../modules/module/message-format/iso8583-format/widget/action-button-group-iso8583-format/action-button-group-iso8583-format.component";
import {OverlayLoadingComponent} from "../../modules/module/global-widget/overlay-loading/overlay-loading.component";

@Injectable({
  providedIn: 'root'
})
export class Iso8583FormatTableService {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  animateRow: boolean = true;
  rowHeight: number = 40;
  headerHeight: number = 40;
  overlayLoadingTemplate: string = 'overlayLoading';
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupIso8583FormatComponent,
    overlayLoading: OverlayLoadingComponent
  };
  sortModel = [
    {
      colId: 'messageFormat',
      sort: 'desc'
    }
  ];
  defaultColDef: ColDef = {
    flex: 1,
    editable: false,
    sortable: true,
    lockPosition: true,
    headerClass: 'iso8583Format-header-color'
  };
  columnDefs: ColDef[] = [
    {field: 'messageFormatId', hide: true},
    {field: 'messageFormat', headerName: 'Message Format', sort: 'asc'},
    {field: 'description'},
    {field: 'actions', maxWidth: 100,sortable: false,cellRenderer: 'actionButtonGroup'}
  ]

  constructor() { }

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

  applyFirstColSorting() {
    this.gridColumnApi.applyColumnState({state: this.sortModel})
    this.gridApi.onSortChanged();
  }

  setRowData(data: any[]) {
    this.gridApi.setRowData(data);
  }

  destroyGrid() {
    this.gridApi.destroy();
  }

  set GridApi(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  set GridColumnApi(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;
  }
}
