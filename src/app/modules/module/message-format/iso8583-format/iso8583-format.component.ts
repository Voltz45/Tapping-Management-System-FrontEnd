import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Iso8583FormatService} from "../../../../services/module-service/iso8583-format.service";
import {Iso8583FormatTableService} from "../../../../services/module-service/iso8583-format-table.service";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-iso8583-format',
  templateUrl: './iso8583-format.component.html',
  styleUrls: ['./iso8583-format.component.css']
})
export class Iso8583FormatComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store,
    public dialog: MatDialog,
    public iso8583FormatService: Iso8583FormatService,
    public iso8583FormatTableService: Iso8583FormatTableService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  showDialog() {
    this.iso8583FormatService.buttonStatus = 'create';
    this.iso8583FormatService.openDialog();
  }

  onFilterTextBoxChanged() {
    this.iso8583FormatTableService.onFilter('search-filter');
  }

  refreshTable() {
    this.iso8583FormatService.getAllIso8583FormatWithDelay();
  }
}
