import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SystemParametersService} from "../../../services/systemParameters-service/system-parameters.service";
import {ColDef, GridApi, GridReadyEvent} from "ag-grid-community";
import {TerminalModel} from "../../../model/TerminalModel";
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateDialogComponent} from "./create-update-dialog/create-update-dialog.component";

@Component({
  selector: 'app-system-parameters',
  templateUrl: './system-parameters.component.html',
  styleUrls: ['./system-parameters.component.css']
})
export class SystemParametersComponent implements OnInit, AfterViewInit {
  columnDefs: ColDef[] = [
    {field: 'id'},
    {field: 'terminalId'},
    {field: 'terminalType'},
    {field: 'ipAddress'},
    {field: 'port'},
    {field: 'timeTrace', hide: true}
  ]

  rowData: TerminalModel[] = [];
  gridApi: GridApi | any;
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

  constructor(
    public dialog: MatDialog,
    private systemParametersService: SystemParametersService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

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
