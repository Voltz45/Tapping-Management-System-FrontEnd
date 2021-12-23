import {Component, OnInit} from '@angular/core';
import {
  CreateUpdateIso8583DialectDialogComponent
} from "./widget/create-update-iso8583-dialect-dialog/create-update-iso8583-dialect-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  Iso8583DialectService
} from "../../../../services/external-interfaces/iso8583Configuration/iso8583-dialect/iso8583-dialect.service";
import {
  Iso8583DialectTableService
} from "../../../../services/external-interfaces/iso8583Configuration/iso8583-dialect/iso8583-dialect-table.service";

@Component({
  selector: 'app-iso8583-dialect',
  templateUrl: './iso8583-dialect.component.html',
  styleUrls: ['./iso8583-dialect.component.css']
})
export class Iso8583DialectComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private iso8583DialectService: Iso8583DialectService,
    private iso8583DialectTableService: Iso8583DialectTableService
  ) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.iso8583DialectService.buttonStatus = 'create';
    this.dialog.open(CreateUpdateIso8583DialectDialogComponent, {autoFocus: false, disableClose: true, width: '55%'});
  }

  onFilterTextBoxChanged() {
    this.iso8583DialectTableService.onFilter('search-filter');
  }

  refreshTable() {
    this.iso8583DialectService.getAllIso8583DialectWithDelay();
  }
}
