import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {ChannelTableService} from "../../../../../../services/module-service/channel-table.service";
import {ChannelService} from "../../../../../../services/module-service/channel.service";
import {Store} from "@ngxs/store";

@Component({
  selector: 'channel-table',
  templateUrl: './channel-table.component.html',
  styleUrls: ['./channel-table.component.css']
})
export class ChannelTableComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store,
    private channelService: ChannelService,
    public channelTableService: ChannelTableService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.channelTableService.gridApi.destroy();
    this.channelService.channelList.length = 0;
  }

  onGridReady(params: GridReadyEvent) {
    this.channelTableService.gridApi = params.api;
    this.channelTableService.gridColumnApi = params.columnApi;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.channelService.ExistingData = data.data;
  }

  runService() {
    this.channelTableService.showTableLoading();
    this.channelService.getAllChannelWithDelay();
  }

  get animateRow() {
    return this.channelTableService.animateRow;
  }

  get columnDefs() {
    return this.channelTableService.columnDefs;
  }

  get defaultColDef() {
    return this.channelTableService.defaultColDef;
  }

  get rowHeight() {
    return this.channelTableService.rowHeight;
  }

  get headerHeight() {
    return this.channelTableService.headerHeight;
  }

  get overlayLoadingTemplate() {
    return this.channelTableService.overlayLoadingTemplate;
  }

  get frameworkComponents() {
    return this.channelTableService.frameworkComponents;
  }
}
