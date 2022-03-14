import {Component} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {Iso8583DialectService} from "../../../../../../../services/module-service/iso8583-dialect.service";
import {PopupMessageService} from "../../../../../../../services/popup-message-service/popup-message.service";

@Component({
  selector: 'app-action-button-group-iso8583-dialect',
  templateUrl: './button-iso8583-dialect.component.html',
  styleUrls: ['./button-iso8583-dialect.component.css']
})
export class ButtonIso8583DialectComponent implements AgRendererComponent {

  constructor(
    private iso8583DialectService: Iso8583DialectService,
    private confirmationService: PopupMessageService
  ) {
  }

  agInit(params: ICellRendererParams): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  editButton() {
    this.iso8583DialectService.openDialog();
    this.iso8583DialectService.buttonStatus = 'edit';
  }

  deleteButton(event: Event) {
    this.confirmationService.iso8583DialectConfirm(event, this.iso8583DialectService)
  }
}
