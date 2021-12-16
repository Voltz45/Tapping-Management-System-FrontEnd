import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateDialogComponent} from "./widget/create-update-dialog/create-update-dialog.component";
import {
  TerminalTableService
} from "../../../services/terminal-configuration-service/terminal-service/terminal-table.service";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit, OnDestroy {

  constructor(
    public dialog: MatDialog,
    public terminalTableService: TerminalTableService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  openDialog() {
    this.terminalTableService.buttonStatus = 'create';
    this.dialog.open(CreateUpdateDialogComponent, {autoFocus: false});
  }
}
