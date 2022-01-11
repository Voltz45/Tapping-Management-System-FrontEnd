import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
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
    public channelService: ChannelService,
    public channelTableService: ChannelTableService
  ) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.channelService.buttonStatus = 'create';
    this.channelService.openDialog();
  }

  onFilterTextBoxChanged() {
    this.channelTableService.onFilter('search-filter');
  }

  refreshTable() {
    this.channelService.getAllChannelWithDelay();
  }
}

