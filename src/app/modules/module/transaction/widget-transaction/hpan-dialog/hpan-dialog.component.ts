import {Component, TemplateRef} from '@angular/core';
import {AgRendererComponent} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-hpan-dialog',
  templateUrl: './hpan-dialog.component.html',
  styleUrls: ['./hpan-dialog.component.css']
})
export class HpanDialogComponent implements AgRendererComponent {
  cellValue: string = '';
  clearHpan: string = '';

  constructor(public dialog: MatDialog) {
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.clearHpan = params.data.clearHPAN;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  buttonClicked(hpanDialog: TemplateRef<any>) {
    this.dialog.open(hpanDialog);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
