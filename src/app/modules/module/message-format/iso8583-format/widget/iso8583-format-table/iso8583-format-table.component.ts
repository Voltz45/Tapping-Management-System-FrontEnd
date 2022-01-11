import {Component, OnInit} from '@angular/core';
import {Iso8583FormatService} from "../../../../../../services/module-service/iso8583-format.service";
import {Iso8583FormatTableService} from "../../../../../../services/module-service/iso8583-format-table.service";
import {GridReadyEvent, RowClickedEvent} from "ag-grid-community";

@Component({
  selector: 'iso8583-format-table',
  templateUrl: './iso8583-format-table.component.html',
  styleUrls: ['./iso8583-format-table.component.css']
})
export class Iso8583FormatTableComponent implements OnInit {

  constructor(
    private iso8583FormatService: Iso8583FormatService,
    private iso8583FormatTableService: Iso8583FormatTableService
  ) { }


  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.iso8583FormatTableService.GridApi = params;
    this.iso8583FormatTableService.GridColumnApi = params;
    this.runService();
  }

  onCellClicked(data: RowClickedEvent) {
    this.iso8583FormatService.ExistingData = data;
  }

  private runService() {
    this.iso8583FormatTableService.showTableLoading();
    this.iso8583FormatService.getAllIso8583FormatWithDelay();
  }

  get animateRow() {
    return this.iso8583FormatTableService.animateRow;
  }

  get columnDefs() {
    return this.iso8583FormatTableService.columnDefs;
  }

  get defaultColDef() {
    return this.iso8583FormatTableService.defaultColDef;
  }

  get rowHeight() {
    return this.iso8583FormatTableService.rowHeight;
  }

  get headerHeight() {
    return this.iso8583FormatTableService.headerHeight;
  }

  get overlayLoadingTemplate() {
    return this.iso8583FormatTableService.overlayLoadingTemplate;
  }

  get frameworkComponents() {
    return this.iso8583FormatTableService.frameworkComponents;
  }
}
