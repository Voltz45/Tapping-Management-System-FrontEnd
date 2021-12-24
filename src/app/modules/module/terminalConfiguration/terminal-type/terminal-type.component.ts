import {Component, OnInit} from '@angular/core';
import {
  ChannelTypeService
} from "../../../services/terminal-configuration-service/terminal-type-service/channel-type.service";
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
    public terminalTypeService: ChannelTypeService,
    public terminalTypeTableService: TerminalTypeTableService
  ) {
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.dialog.open(CreateUpdateDialogTerminalTypeComponent, this.terminalTypeService.dialogConfig);
    this.terminalTypeService.buttonDialogStatus = 'create';
  }

  onFilterTextBoxChanged() {
    this.terminalTypeTableService.onFilter('search-filter');
  }

  refreshTable() {
    this.terminalTypeService.getAllChannelTypeWithDelay();
  }
}
