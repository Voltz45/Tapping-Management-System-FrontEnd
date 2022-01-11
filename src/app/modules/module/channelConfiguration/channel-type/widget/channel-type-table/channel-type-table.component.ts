import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChannelTypeTableService} from "../../../../../../services/module-service/channel-type-table.service";
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {ChannelTypeService} from "../../../../../../services/module-service/channel-type.service";

@Component({
  selector: 'channel-type-table',
  templateUrl: './channel-type-table.component.html',
  styleUrls: ['./channel-type-table.component.css']
})
export class ChannelTypeTableComponent implements OnInit, OnDestroy {

  constructor(
    private channelTypeService: ChannelTypeService,
    private channelTypeTableService: ChannelTypeTableService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.channelTypeTableService.destroyGrid();
    this.channelTypeService.dialectMsgTemplateList.length = 0;
  }

  onGridReady(params: GridReadyEvent) {
    this.channelTypeTableService.gridApi = params.api;
    this.channelTypeTableService.gridColumnApi = params.columnApi;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.channelTypeService.ExistingData = data.data;
  }

  runService() {
    this.channelTypeTableService.showTableLoading();
    this.channelTypeService.getAllChannelTypeWithDelay();
  }

  get animateRow() {
    return this.channelTypeTableService.animateRow;
  }

  get columnDefs() {
    return this.channelTypeTableService.columnDefs;
  }

  get defaultColDef() {
    return this.channelTypeTableService.defaultColDef;
  }

  get rowHeight() {
    return this.channelTypeTableService.rowHeight;
  }

  get headerHeight() {
    return this.channelTypeTableService.headerHeight;
  }

  get overlayLoadingTemplate() {
    return this.channelTypeTableService.overlayLoadingTemplate;
  }

  get frameworkComponents() {
    return this.channelTypeTableService.frameworkComponents;
  }
}
