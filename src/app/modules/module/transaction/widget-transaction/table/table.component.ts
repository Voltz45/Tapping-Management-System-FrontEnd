import {Component, Input, OnInit} from '@angular/core';
import {RowClickedEvent} from "ag-grid-community";
import {TransactionTableService} from "../../../../services/transaction-service/transaction-table.service";
import {TransactionMessageModel} from "../../../../model/TransactionMessageModel";
import {TransactionMessage} from "../../interface/transaction-message";
import {TransactionApiService} from "../../../../services/transaction-service/transaction-api.service";

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
  @Input() autoHeight: string = '';

  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

  constructor(
    private transactionTableService: TransactionTableService,
    private transactionApiService: TransactionApiService) {
  }

  ngOnInit(): void {
  }

  onCellClicked(data: RowClickedEvent) {
    this.transactionTableService.additionalData = data.data;
    console.log(this.transactionTableService.additionalData)
  }

  onGridReady(params: any) {
    this.transactionTableService.gridApi = params.api;
    this.transactionTableService.gridColumnApi = params.columnApi;
    this.transactionTableService.gridApi.showLoadingOverlay();
    if (this.rowData == []) {
      this.transactionApiService.getAllTransactionMessage().subscribe({
        next: this.responseHandler.bind(this),
        error: this.errorHandler.bind(this)
      })
    }
  }

  //Api
  responseHandler(response: TransactionMessageModel[]) {
    const transactionTable = document.querySelector('.ag-theme-alpine') as HTMLElement;
    let responseData: TransactionMessage[] = [];
    response.forEach(x => {
      responseData.push({
        amount: x.amount,
        currencyCode: x.countryCode,
        destAccount: 0,
        HPAN: x.hpan,
        merchantId: x.merchantId,
        merchantType: '',
        MTI: x.mti,
        networkDate: x.TrxDate,
        networkId: x.networkID,
        responseCode: x.responseCode,
        RRN: x.rrn,
        srcAccount: 0,
        terminalId: 0,
        transactionDate: x.TrxDate,
        transactionId: x.transactionId
      });
      this.rowData = responseData;
      transactionTable.style.height = 'auto';
      this.transactionTableService.gridApi.setDomLayout('autoHeight');
      this.transactionTableService.gridApi.hideOverlay();
    })
  }

  errorHandler(error: any) {
    this.transactionTableService.gridApi.showNoRowsOverlay();
  }
}

export let additionalData: TransactionMessage;
