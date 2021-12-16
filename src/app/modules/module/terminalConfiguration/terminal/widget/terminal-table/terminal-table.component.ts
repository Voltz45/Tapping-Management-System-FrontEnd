import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {TerminalModel} from "../../../../../model/TerminalModel";
import {ActionButtonGroupComponent} from "../action-button-group/action-button-group.component";
import {
  TerminalTableService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal-table.service";
import {
  TerminalService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal.service";

@Component({
  selector: 'terminal-table',
  templateUrl: './terminal-table.component.html',
  styleUrls: ['./terminal-table.component.css']
})
export class TerminalTableComponent implements OnInit {
  rowData: TerminalModel[] = [];
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupComponent
  };
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

  constructor(
    public terminalTableService: TerminalTableService
  ) {
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.terminalTableService.gridApi = params.api;
    this.terminalTableService.showTableLoading();
    this.terminalTableService.getAllTerminalWithDelay();
  }

  onCellClicked(data: RowClickedEvent) {
    this.terminalTableService.existingData = data.data;
  }
}
