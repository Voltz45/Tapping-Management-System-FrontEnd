import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {
  ActionButtonGroupTerminalComponent
} from "../../modules/module/channelConfiguration/channel/widget/action-button-group-terminal/action-button-group-terminal.component";
import {OverlayLoadingComponent} from "../../modules/module/global-widget/overlay-loading/overlay-loading.component";
import {TagComponent} from "../../modules/module/global-widget/tag/tag.component";

@Injectable({
  providedIn: 'root'
})
export class ChannelTableService {
  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  animateRow: boolean = true;
  rowHeight: number = 40;
  headerHeight: number = 40;
  overlayLoadingTemplate = 'overlayLoading';
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupTerminalComponent,
    overlayLoading: OverlayLoadingComponent,
    tag: TagComponent
  };
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 110,
    editable: false,
    lockPosition: true,
    headerClass: 'channel-header-color'
  };
  columnDefs: ColDef[] = [
    {field: 'id', hide: true},
    {field: 'channelId', sort: 'asc'},
    {field: 'channelType.channelType', headerName: 'Channel Type'},
    {field: 'ipAddress'},
    {field: 'port'},
    {field: 'timeTrace', hide: true},
    {field: 'channelStatus', cellRenderer: 'tag'},
    {field: 'isOnPremise', cellRenderer: 'tag'},
    {field: 'action', resizable: false, cellRenderer: 'actionButtonGroup'}
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
