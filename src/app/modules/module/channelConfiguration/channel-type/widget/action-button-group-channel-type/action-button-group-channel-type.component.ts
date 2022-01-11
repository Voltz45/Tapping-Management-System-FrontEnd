import {Component} from '@angular/core';
import {ChannelTypeService} from "../../../../../../services/module-service/channel-type.service";
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from 'ag-grid-community';
import {PopupMessageService} from "../../../../../../services/popup-message-service/popup-message.service";

@Component({
  selector: 'app-action-button-group-channel-type',
  templateUrl: './action-button-group-channel-type.component.html',
  styleUrls: ['./action-button-group-channel-type.component.css']
})
export class ActionButtonGroupChannelTypeComponent implements AgRendererComponent {

  constructor(
    private channelTypeService: ChannelTypeService,
    private confirmationService: PopupMessageService
  ) {
  }

  agInit(params: ICellRendererParams): void {

  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  editButton() {
    this.channelTypeService.openDialog();
    this.channelTypeService.buttonDialogStatus = 'edit';
  }

  deleteButton(event: Event) {
    this.confirmationService.channelTypeConfirm(event, this.channelTypeService);
  }
}
