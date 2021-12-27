import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RowClickedEvent} from "ag-grid-community";
import {maskHPAN, TransactionTableService} from "../../../../../services/module-service/transaction-table.service";
import {TransactionMessageModel} from "../../../../../model/modules-model/transaction-message-model";
import {TransactionMessageInterface} from "../../../../../interface/modules/transaction-message.interface";
import {TransactionApiService} from "../../../../../services/module-service/transaction-api.service";
import {HpanDialogComponent} from "../hpan-dialog/hpan-dialog.component";
import {NotificationService} from "../../../../../services/notification-service/notification.service";
import {NotificationTypeEnum} from "../../../../../enum/notification-type.enum";

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
  rowData: TransactionMessageInterface[] = [];
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
    private transactionApiService: TransactionApiService,
    private notifierService: NotificationService
  ) {
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
    let responseData: TransactionMessageInterface[] = [];
    if (response.length == 0) {
      this.transactionTableService.gridApi.showNoRowsOverlay();
    }
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
    this.notifierService.notify(NotificationTypeEnum.ERROR, 'status: ' + error.status + ' message: ' + error.statusText, error.status)
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.transactionTableService.gridApi.destroy();
  }
}

export let additionalData: TransactionMessageInterface;
