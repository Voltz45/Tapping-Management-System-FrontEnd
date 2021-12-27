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
    private terminalTypeService: ChannelTypeService,
    private terminalTypeTableService: ChannelTypeTableService
  ) {
  }

  ngOnDestroy(): void {
    this.terminalTypeService.DialectMsgTemplateList.length = 0;
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.terminalTypeTableService.gridApi = params.api;
    this.terminalTypeTableService.gridColumnApi = params.columnApi;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.terminalTypeService.ExistingData = data.data;
  }

  runService() {
    this.terminalTypeService.onGetAllDialectMsgTemplate();
    this.terminalTypeTableService.showTableLoading();
    this.terminalTypeService.getAllChannelTypeWithDelay();
  }

  get animateRow() {
    return this.terminalTypeTableService.animateRow;
  }

  get columnDefs() {
    return this.terminalTypeTableService.columnDefs;
  }

  get defaultColDef() {
    return this.terminalTypeTableService.defaultColDef;
  }

  get rowHeight() {
    return this.terminalTypeTableService.rowHeight;
  }

  get headerHeight() {
    return this.terminalTypeTableService.headerHeight;
  }

  get overlayLoadingTemplate() {
    return this.terminalTypeTableService.overlayLoadingTemplate;
  }

  get frameworkComponents() {
    return this.terminalTypeTableService.frameworkComponents;
  }
}
