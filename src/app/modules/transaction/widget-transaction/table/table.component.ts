import {Component, Input, OnInit} from '@angular/core';
import {RowClickedEvent} from "ag-grid-community";
import {TransactionTableService} from "../../service/transaction-table.service";

@Component({
  selector: 'transaction-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() headerColHeight: any;
  @Input() paginationSize: any;
  @Input() defaultColDef: any;
  @Input() rowData: any;
  @Input() columnDefs: any;

  constructor(private transactionTableService: TransactionTableService) {
  }

  ngOnInit(): void {
  }

  onCellClicked($event: RowClickedEvent) {
    console.log($event)
  }

  onGridReady(params: any) {
    this.transactionTableService.gridApi = params.api;
    this.transactionTableService.gridColumnApi = params.columnApi;
  }
}
