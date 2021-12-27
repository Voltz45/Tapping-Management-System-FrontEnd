import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateUpdateDialogComponent} from "./widget/create-update-dialog/create-update-dialog.component";
import {ChannelTableService} from "../../../../services/module-service/channel-table.service";
import {ChannelService} from "../../../../services/module-service/channel.service";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public terminalService: ChannelService,
    public terminalTableService: ChannelTableService
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

