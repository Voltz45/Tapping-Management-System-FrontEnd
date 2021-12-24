import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  TerminalTypeTableService
} from "../../../../../services/terminal-configuration-service/terminal-type-service/terminal-type-table.service";
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {
  ChannelTypeService
} from "../../../../../services/terminal-configuration-service/terminal-type-service/channel-type.service";

@Component({
  selector: 'terminal-type-table',
  templateUrl: './terminal-type-table.component.html',
  styleUrls: ['./terminal-type-table.component.css']
})
export class TerminalTypeTableComponent implements OnInit, OnDestroy {

  constructor(
    private terminalTypeService: ChannelTypeService,
    private terminalTypeTableService: TerminalTypeTableService
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
