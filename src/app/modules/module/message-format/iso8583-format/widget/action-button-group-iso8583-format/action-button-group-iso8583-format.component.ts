import {Component} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {Iso8583FormatService} from "../../../../../../services/module-service/iso8583-format.service";
import {PopupMessageService} from "../../../../../../services/popup-message-service/popup-message.service";

@Component({
  selector: 'app-action-button-group-iso8583-format',
  templateUrl: './action-button-group-iso8583-format.component.html',
  styleUrls: ['./action-button-group-iso8583-format.component.css']
})
export class ActionButtonGroupIso8583FormatComponent implements AgRendererComponent {
  cellValue: string = '';

  constructor(
    private iso8583FormatService: Iso8583FormatService,
    private confirmationService: PopupMessageService
  ) { }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  editButton() {
    this.iso8583FormatService.openDialog();
    this.iso8583FormatService.buttonStatus = 'edit';
  }

  deleteButton(event: Event) {
    this.confirmationService.messageFormatConfirm(event, this.iso8583FormatService)
  }
}
