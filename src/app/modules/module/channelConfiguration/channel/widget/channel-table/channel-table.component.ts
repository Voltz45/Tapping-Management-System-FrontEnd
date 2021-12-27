import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {
  ActionButtonGroupTerminalComponent
} from "../action-button-group-terminal/action-button-group-terminal.component";
import {ChannelTableService} from "../../../../../../services/module-service/channel-table.service";
import {OverlayLoadingComponent} from "../../../../global-widget/overlay-loading/overlay-loading.component";
import {TagComponent} from "../../../../global-widget/tag/tag.component";
import {ChannelService} from "../../../../../../services/module-service/channel.service";

@Component({
  selector: 'channel-table',
  templateUrl: './channel-table.component.html',
  styleUrls: ['./channel-table.component.css']
})
export class ChannelTableComponent implements OnInit, OnDestroy {
  frameworkComponents = {
    actionButtonGroup: ActionButtonGroupTerminalComponent,
    overlayLoading: OverlayLoadingComponent,
    tag: TagComponent
  };
  overlayLoadingTemplate = 'overlayLoading';

  constructor(
    private terminalService: ChannelService,
    public terminalTableService: ChannelTableService
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.terminalTableService.gridApi.destroy();
    this.terminalService.terminalTypeList.length = 0;
  }

  onGridReady(params: GridReadyEvent) {
    this.terminalTableService.gridApi = params.api;
    this.terminalTableService.gridColumnApi = params.columnApi;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.terminalService.existingData = data.data;
  }

  runService() {
    this.terminalService.getAllTerminalTypeWithDelay();
    this.terminalTableService.showTableLoading();
    this.terminalService.getAllTerminalWithDelay();
  }
}
