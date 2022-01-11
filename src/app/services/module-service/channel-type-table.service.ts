import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {OverlayLoadingComponent} from "../../modules/module/global-widget/overlay-loading/overlay-loading.component";
import {
  ActionButtonGroupChannelTypeComponent
} from "../../modules/module/channelConfiguration/channel-type/widget/action-button-group-channel-type/action-button-group-channel-type.component";

@Injectable({
  providedIn: 'root'
})
export class ChannelTypeTableService {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  animateRow: boolean = true;
  rowHeight: number = 40;
  headerHeight: number = 40;
  overlayLoadingTemplate: string = 'overlayLoading';
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupChannelTypeComponent,
    overlayLoading: OverlayLoadingComponent
  };
  defaultColDef: ColDef = {
    flex: 1,
    editable: false,
    sortable: true,
    headerClass: 'channel-type-header-color'
  };
  columnDefs: ColDef[] = [
    {field: 'id', hide: true},
    {field: 'channelType', sort: 'asc'},
    {field: 'dialectMessageTemplate.nameType', headerName: 'Message Template'},
    {field: 'description', width: 200},
    {field: 'actions', maxWidth: 100, cellRenderer: 'actionButtonGroup'}
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

  setAutoHeightTable() {
    this.gridApi.setDomLayout('autoHeight');
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
