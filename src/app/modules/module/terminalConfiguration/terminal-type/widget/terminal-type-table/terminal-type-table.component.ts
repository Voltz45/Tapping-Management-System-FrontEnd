import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  TerminalTypeTableService
} from "../../../../../services/terminal-configuration-service/terminal-type-service/terminal-type-table.service";
import {OverlayLoadingComponent} from "../../../global-widget/overlay-loading/overlay-loading.component";
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {
  TerminalTypeService
} from "../../../../../services/terminal-configuration-service/terminal-type-service/terminal-type.service";
import {
  ActionButtonGroupTerminalTypeComponent
} from "../action-button-group-terminal-type/action-button-group-terminal-type.component";

@Component({
  selector: 'terminal-type-table',
  templateUrl: './terminal-type-table.component.html',
  styleUrls: ['./terminal-type-table.component.css']
})
export class TerminalTypeTableComponent implements OnInit, OnDestroy {
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupTerminalTypeComponent,
    overlayLoading: OverlayLoadingComponent
  };
  overlayLoadingTemplate = 'overlayLoading';

  constructor(
    private terminalTypeService: TerminalTypeService,
    public terminalTypeTableService: TerminalTypeTableService
  ) {
  }

  ngOnDestroy(): void {
    this.terminalTypeService.dialectMsgTemplateList.length = 0;
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.terminalTypeTableService.gridApi = params.api;
    this.terminalTypeTableService.gridColumnApi = params.columnApi;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.terminalTypeService.existingData = data.data;
  }

  runService() {
    this.terminalTypeService.getAllDialectMsgTemplateWithDelay();
    this.terminalTypeTableService.showTableLoading();
    this.terminalTypeService.getAllTerminalTypeWithDelay();
  }
}
