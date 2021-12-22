import {Component} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {CreateUpdateDialogComponent} from "../create-update-dialog/create-update-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  TerminalService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal.service";

@Component({
  selector: 'app-action-button-group-terminal',
  templateUrl: './action-button-group-terminal.component.html',
  styleUrls: ['./action-button-group-terminal.component.css']
})
export class ActionButtonGroupTerminalComponent implements AgRendererComponent {

  cellValue: string = '';

  constructor(
    private terminalService: TerminalService,
    private dialog: MatDialog
  ) {
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  editButton() {
    this.dialog.open(CreateUpdateDialogComponent, {autoFocus: false, disableClose: true, width: '55%'});
    this.terminalService.buttonStatus = 'edit';
  }

  deleteButton() {
    this.terminalService.onDeleteTerminal();
    // this.terminalService.onGetAllTerminal();
  }
}
