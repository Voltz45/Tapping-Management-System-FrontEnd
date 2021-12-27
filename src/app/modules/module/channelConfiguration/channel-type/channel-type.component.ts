import {Component, OnInit} from '@angular/core';
import {ChannelTypeService} from "../../../../services/module-service/channel-type.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CreateUpdateDialogTerminalTypeComponent
} from "./widget/create-update-dialog/create-update-terminalType-dialog.component";
import {ChannelTypeTableService} from "../../../../services/module-service/channel-type-table.service";

@Component({
  selector: 'app-channel-type',
  templateUrl: './channel-type.component.html',
  styleUrls: ['./channel-type.component.css']
})
export class ChannelTypeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public terminalTypeService: ChannelTypeService,
    public terminalTypeTableService: ChannelTypeTableService
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
