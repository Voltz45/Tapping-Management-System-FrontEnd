import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColDef, GridApi, GridReadyEvent} from "ag-grid-community";
import {TerminalModel} from "../../../model/TerminalModel";
import {
  ActionButtonGroupComponent
} from "./widget/action-button-group/action-button-group.component";
import {MatDialog} from "@angular/material/dialog";
import {TerminalService} from "../../../services/terminal-service/terminal.service";
import {
  CreateUpdateDialogComponent
} from "../../system/system-parameters/create-update-dialog/create-update-dialog.component";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, OnDestroy {

  columnDefs: ColDef[] = [
    {field: 'id', hide: true},
    {field: 'terminalId'},
    {field: 'terminalType'},
    {field: 'ipAddress'},
    {field: 'port'},
    {field: 'timeTrace', hide: true},
    {field: 'action', cellRenderer: 'actionButtonGroup'}
  ]

  rowData: TerminalModel[] = [];
  gridApi: GridApi | any;
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupComponent
  };
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

  constructor(
    public dialog: MatDialog,
    private systemParametersService: TerminalService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.gridApi.destroy();
  }


  getAllTerminal(param: GridReadyEvent) {
    this.gridApi.showLoadingOverlay();
    this.systemParametersService.getAllTerminal().subscribe((response) => {
      param.api.setRowData(response);
      this.gridApi.hideOverlay();
    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getAllTerminal(params);
  }

  openDialog() {
    this.dialog.open(CreateUpdateDialogComponent);
  }
}
