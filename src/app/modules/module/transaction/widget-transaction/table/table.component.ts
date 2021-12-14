import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RowClickedEvent} from "ag-grid-community";
import {maskHPAN, TransactionTableService} from "../../../../services/transaction-service/transaction-table.service";
import {TransactionMessageModel} from "../../../../model/TransactionMessageModel";
import {TransactionMessage} from "../../interface/transaction-message";
import {TransactionApiService} from "../../../../services/transaction-service/transaction-api.service";
import {HpanDialogComponent} from "../hpan-dialog/hpan-dialog.component";

@Component({
  selector: 'transaction-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() headerColHeight: any;
  @Input() paginationSize: any;
  @Input() defaultColDef: any;
  @Input() columnDefs: any;
  @Input() autoHeight: string = '';
  rowData: TransactionMessage[] = [];
  frameworkComponents: any;
  sortModel = [
    {
      colId: 'transactionDate',
      sort: 'desc'
    }
  ]

  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

  constructor(
    private transactionTableService: TransactionTableService,
    private transactionApiService: TransactionApiService) {
  }

  ngOnInit(): void {
    this.frameworkComponents = {
      medalCellRenderer: HpanDialogComponent,
    };
  }

  onCellClicked(data: RowClickedEvent) {
    this.transactionTableService.additionalData = data.data;
  }

  onGridReady(params: any) {
    this.transactionTableService.gridApi = params.api;
    this.transactionTableService.gridColumnApi = params.columnApi;
    this.transactionTableService.gridApi.showLoadingOverlay();

    if (this.rowData.length == 0) {
      setTimeout(() => {
        this.transactionApiService.getAllTransactionMessage().subscribe({
          next: this.responseHandler.bind(this),
          error: this.errorHandler.bind(this)
        });
      }, 500)
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
        destAccount: '',
        HPAN: maskHPAN(x.hpan, '*', 6, 4),
        clearHPAN: x.hpan,
        merchantId: x.merchantId,
        merchantType: x.merchantType,
        MTI: x.mti,
        networkDate: x.TrxDate,
        networkId: x.networkID,
        responseCode: x.responseCode,
        RRN: x.rrn,
        srcAccount: '',
        terminalId: x.terminalId,
        transactionDate: x.TrxDate,
        transactionId: x.transactionId,
        transType: x.transType
      });
      this.rowData = responseData;
      transactionTable.style.height = 'auto';
      this.transactionTableService.gridColumnApi.applyColumnState({state: this.sortModel});
      this.transactionTableService.gridApi.onSortChanged();
      this.transactionTableService.gridApi.setDomLayout('autoHeight');
      this.transactionTableService.gridApi.hideOverlay();
    })
  }

  errorHandler(error: any) {
    this.transactionTableService.gridApi.showNoRowsOverlay();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.transactionTableService.gridApi.destroy();
  }
}

export let additionalData: TransactionMessage;
