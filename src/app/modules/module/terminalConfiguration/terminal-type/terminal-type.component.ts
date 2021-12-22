import {Component, OnInit} from '@angular/core';
import {
  TerminalTypeService
} from "../../../services/terminal-configuration-service/terminal-type-service/terminal-type.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CreateUpdateDialogTerminalTypeComponent
} from "./widget/create-update-dialog/create-update-terminalType-dialog.component";
import {
  TerminalTypeTableService
} from "../../../services/terminal-configuration-service/terminal-type-service/terminal-type-table.service";

@Component({
  selector: 'app-terminal-type',
  templateUrl: './terminal-type.component.html',
  styleUrls: ['./terminal-type.component.css']
})
export class TerminalTypeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public terminalTypeService: TerminalTypeService,
    public terminalTypeTableService: TerminalTypeTableService
  ) {
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.dialog.open(CreateUpdateDialogTerminalTypeComponent, {
      autoFocus: false, disableClose: true, width: '55%'
    });
    this.terminalTypeService.buttonDialogStatus = 'create';
  }

  onFilterTextBoxChanged() {
    this.terminalTypeTableService.onFilter('search-filter');
  }

  refreshTable() {
    this.terminalTypeService.getAllTerminalTypeWithDelay();
  }
}
