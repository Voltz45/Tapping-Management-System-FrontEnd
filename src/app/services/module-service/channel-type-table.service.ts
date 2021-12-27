import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";
import {OverlayLoadingComponent} from "../../modules/module/global-widget/overlay-loading/overlay-loading.component";
import {
  ActionButtonGroupTerminalTypeComponent
} from "../../modules/module/channelConfiguration/channel-type/widget/action-button-group-terminal-type/action-button-group-terminal-type.component";

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
    actionButtonGroup: ActionButtonGroupTerminalTypeComponent,
    overlayLoading: OverlayLoadingComponent
  };
  defaultColDef: ColDef = {
    flex: 1,
    editable: false,
    sortable: true
  };
  columnDefs: ColDef[] = [
    {field: 'id', hide: true, headerClass: 'channel-type-header-color'},
    {field: 'channelType', sort: 'asc', headerClass: 'channel-type-header-color'},
    {field: 'dialectMsgTemplateId', headerName: 'Message Template', headerClass: 'channel-type-header-color'},
    {field: 'description', width: 200, headerClass: 'channel-type-header-color'},
    {field: 'actions', maxWidth: 100, cellRenderer: 'actionButtonGroup', headerClass: 'channel-type-header-color'}
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
