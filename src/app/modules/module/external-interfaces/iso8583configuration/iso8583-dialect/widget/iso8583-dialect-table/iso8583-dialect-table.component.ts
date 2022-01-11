import {Component, OnDestroy, OnInit} from '@angular/core';
import {Iso8583DialectTableService} from "../../../../../../../services/module-service/iso8583-dialect-table.service";
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";
import {Iso8583DialectService} from "../../../../../../../services/module-service/iso8583-dialect.service";

@Component({
  selector: 'iso8583-dialect-table',
  templateUrl: './iso8583-dialect-table.component.html',
  styleUrls: ['./iso8583-dialect-table.component.css']
})
export class Iso8583DialectTableComponent implements OnInit, OnDestroy {

  constructor(
    private iso8583DialectService: Iso8583DialectService,
    private iso8583DialectTableService: Iso8583DialectTableService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.iso8583DialectTableService.destroyGrid();
    this.iso8583DialectService.msgFormatIdList.length = 0;
  }

  onGridReady(params: GridReadyEvent) {
    this.iso8583DialectTableService.GridApi = params;
    this.iso8583DialectTableService.GridColumnApi = params;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.iso8583DialectService.ExistingData = data.data;
  }

  private runService() {
    this.iso8583DialectTableService.showTableLoading();
    this.iso8583DialectService.onGetAllIso8583Dialect();
  }

  get animateRow() {
    return this.iso8583DialectTableService.animateRow;
  }

  get columnDefs() {
    return this.iso8583DialectTableService.columnDefs;
  }

  get defaultColDef() {
    return this.iso8583DialectTableService.defaultColDef;
  }

  get rowHeight() {
    return this.iso8583DialectTableService.rowHeight;
  }

  get headerHeight() {
    return this.iso8583DialectTableService.headerHeight;
  }

  get overlayLoadingTemplate() {
    return this.iso8583DialectTableService.overlayLoadingTemplate;
  }

  get frameworkComponents() {
    return this.iso8583DialectTableService.frameworkComponents;
  }
}
