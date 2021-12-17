import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {ActionButtonGroupComponent} from "../action-button-group/action-button-group.component";
import {
  TerminalTableService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal-table.service";

@Component({
  selector: 'terminal-table',
  templateUrl: './terminal-table.component.html',
  styleUrls: ['./terminal-table.component.css']
})
export class TerminalTableComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    // this.terminalTableService.gridApi.destroy();
  }

  onGridReady(params: GridReadyEvent) {
    this.terminalTableService.gridApi = params.api;
    this.terminalTableService.gridColumnApi = params.columnApi;
    this.terminalTableService.getAllTerminalTypeWithDelay();
    this.onSetValueTerminalType();
    this.terminalTableService.showTableLoading();
    this.terminalTableService.getAllTerminalWithDelay();
  }

  onCellClicked(data: RowClickedEvent) {
    this.terminalTableService.existingData = data.data;
  }

  onSetValueTerminalType() {
    this.terminalTableService.terminalTypeList.forEach(x => {
      this.terminalTableService.terminalValue.push(x.value);
      this.terminalTableService.terminalTextValue.push(x.viewValue);
    })
  }
}
