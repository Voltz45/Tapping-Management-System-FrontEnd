import {Component, OnInit} from '@angular/core';
import {ChannelTypeService} from "../../../../services/module-service/channel-type.service";
import {MatDialog} from "@angular/material/dialog";
import {ChannelTypeTableService} from "../../../../services/module-service/channel-type-table.service";

@Component({
  selector: 'app-channel-type',
  templateUrl: './channel-type.component.html',
  styleUrls: ['./channel-type.component.css']
})
export class ChannelTypeComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public channelTypeService: ChannelTypeService,
    public channelTypeTableService: ChannelTypeTableService
  ) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.channelTypeService.buttonDialogStatus = 'create';
    this.channelTypeService.openDialog();
  }

  onFilterTextBoxChanged() {
    this.channelTypeTableService.onFilter('search-filter');
  }

  refreshTable() {
    this.channelTypeService.getAllChannelTypeWithDelay();
  }
}
