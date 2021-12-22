import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateDialogComponent} from "./widget/create-update-dialog/create-update-dialog.component";
import {
  TerminalTableService
} from "../../../services/terminal-configuration-service/terminal-service/terminal-table.service";
import {TerminalService} from "../../../services/terminal-configuration-service/terminal-service/terminal.service";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public terminalService: TerminalService,
    public terminalTableService: TerminalTableService
  ) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.terminalService.buttonStatus = 'create';
    this.dialog.open(CreateUpdateDialogComponent, {autoFocus: false, disableClose: true, width: '55%'});
  }

  onFilterTextBoxChanged() {
    this.terminalTableService.onFilter('search-filter');
  }

  refreshTable() {
    this.terminalService.getAllTerminalWithDelay();
  }
}

