import {Component, OnInit} from '@angular/core';
import {Iso8583FieldTableService} from "../../../../../../../services/module-service/iso8583-field-table.service";

@Component({
  selector: 'iso8583-field-table',
  templateUrl: './iso8583-field-table.component.html',
  styleUrls: ['./iso8583-field-table.component.css']
})
export class Iso8583FieldTableComponent implements OnInit {

  constructor(
    private iso8583FieldTableService: Iso8583FieldTableService
  ) { }

  ngOnInit(): void {
  }

  get animateRow() {
    return this.iso8583FieldTableService.animateRow;
  }

  get columnDefs() {
    return this.iso8583FieldTableService.columnDefs;
  }

  get defaultColDef() {
    return this.iso8583FieldTableService.defaultColDef;
  }

  get rowHeight() {
    return this.iso8583FieldTableService.rowHeight;
  }

  get headerHeight() {
    return this.iso8583FieldTableService.headerHeight;
  }

  get overlayLoadingTemplate() {
    return this.iso8583FieldTableService.overlayLoadingTemplate;
  }

  get frameworkComponents() {
    return this.iso8583FieldTableService.frameworkComponents;
  }
}
