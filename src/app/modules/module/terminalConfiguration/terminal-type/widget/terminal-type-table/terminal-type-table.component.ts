import {Component, OnInit} from '@angular/core';
import {
  TerminalTypeTableService
} from "../../../../../services/terminal-configuration-service/terminal-type-service/terminal-type-table.service";
import {ActionButtonGroupComponent} from "../../../global-widget/action-button-group/action-button-group.component";
import {OverlayLoadingComponent} from "../../../global-widget/overlay-loading/overlay-loading.component";
import {TagComponent} from "../../../global-widget/tag/tag.component";
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";

@Component({
  selector: 'terminal-type-table',
  templateUrl: './terminal-type-table.component.html',
  styleUrls: ['./terminal-type-table.component.css']
})
export class TerminalTypeTableComponent implements OnInit {
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupComponent,
    overlayLoading: OverlayLoadingComponent,
    tag: TagComponent
  };
  overlayLoadingTemplate = 'overlayLoading';

  constructor(public terminalTypeTableService: TerminalTypeTableService) {
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.terminalTypeTableService.gridApi = params.api;
    this.terminalTypeTableService.gridColumnApi = params.columnApi;
    this.terminalTypeTableService.getAllTerminalTypeWithDelay();
  }

  onCellClicked(data: RowClickedEvent) {

  }
}
