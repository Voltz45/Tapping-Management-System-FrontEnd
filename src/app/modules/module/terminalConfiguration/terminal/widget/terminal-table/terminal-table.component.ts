import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {
  ActionButtonGroupTerminalComponent
} from "../action-button-group-terminal/action-button-group-terminal.component";
import {
  TerminalTableService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal-table.service";
import {OverlayLoadingComponent} from "../../../../global-widget/overlay-loading/overlay-loading.component";
import {TagComponent} from "../../../../global-widget/tag/tag.component";
import {
  TerminalService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal.service";

@Component({
  selector: 'terminal-table',
  templateUrl: './terminal-table.component.html',
  styleUrls: ['./terminal-table.component.css']
})
export class TerminalTableComponent implements OnInit, OnDestroy {
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupTerminalComponent,
    overlayLoading: OverlayLoadingComponent,
    tag: TagComponent
  };
  overlayLoadingTemplate = 'overlayLoading';

  constructor(
    private terminalService: TerminalService,
    public terminalTableService: TerminalTableService
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.terminalTableService.gridApi.destroy();
    this.terminalService.terminalTypeList.length = 0;
  }

  onGridReady(params: GridReadyEvent) {
    this.terminalTableService.gridApi = params.api;
    this.terminalTableService.gridColumnApi = params.columnApi;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.terminalService.existingData = data.data;
  }

  runService() {
    this.terminalService.getAllTerminalTypeWithDelay();
    this.terminalTableService.showTableLoading();
    this.terminalService.getAllTerminalWithDelay();
  }
}
