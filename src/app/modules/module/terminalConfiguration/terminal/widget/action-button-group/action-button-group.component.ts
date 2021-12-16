import {Component} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {NotificationTypeEnum} from "../../../../../../layout/enum/notification-type.enum";
import {
  TerminalService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal.service";
import {
  TerminalTableService
} from "../../../../../services/terminal-configuration-service/terminal-service/terminal-table.service";
import {NotificationService} from "../../../../../../layout/service/notification.service";
import {CreateUpdateDialogComponent} from "../create-update-dialog/create-update-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-action-button-group',
  templateUrl: './action-button-group.component.html',
  styleUrls: ['./action-button-group.component.css']
})
export class ActionButtonGroupComponent implements AgRendererComponent {
  cellValue: string = '';

  constructor(
    private terminalTableService: TerminalTableService,
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
    this.dialog.open(CreateUpdateDialogComponent, {autoFocus: false});
    this.terminalTableService.buttonStatus = 'edit';
  }

  deleteButton() {
    this.terminalTableService.onDeleteTerminal();
  }
}
