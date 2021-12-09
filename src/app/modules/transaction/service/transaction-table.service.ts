import {Injectable} from '@angular/core';
import {ColDef, ColumnApi, GridApi} from "ag-grid-community";
import {ColumnList} from "../interface/column-list";

@Injectable({
  providedIn: 'root'
})
export class TransactionTableService {

  constructor() {
  }

  gridApi!: GridApi;
  gridColumnApi!: ColumnApi;
  headerColHeight: number = 30;
  paginationSize = 5;
  defaultColDef = {
    flex: 1,
    minWidth: 110,
    editable: false,
    resizable: true,
  };
  columnDefs: ColDef[] = [
    {field: 'transactionDate', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'networkDate', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'MTI', sortable: true, minWidth: 70, maxWidth: 100, headerClass: 'transaction-header-color'},
    {field: 'HPAN', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'terminalId', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'merchantId', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'merchantType', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'currencyCode', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'amount', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {
      field: 'responseCode',
      sortable: true,
      minWidth: 150,
      maxWidth: 200,
      valueParser: numberParser,
      headerClass: 'transaction-header-color',
      cellClassRules: {
        'rag-red': 'x != 00',
      },
    },
    {field: 'transactionId', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'networkId', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'RRN', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'srcAccount', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'destAccount', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
  ];
  columnLists: ColumnList[] = [
    {value: 'transactionDate', viewValue: 'Transaction Date'},
    {value: 'networkDate', viewValue: 'Network Date'},
    {value: 'MTI', viewValue: 'MTI'},
    {value: 'HPAN', viewValue: 'HPAN'},
    {value: 'terminalId', viewValue: 'Terminal Id'},
    {value: 'merchantId', viewValue: 'Merchant Id'},
    {value: 'merchantType', viewValue: 'Merchant Type'},
    {value: 'currencyCode', viewValue: 'Currency Code'},
    {value: 'amount', viewValue: 'Amount'},
    {value: 'responseCode', viewValue: 'Response Code'},
    {value: 'transactionId', viewValue: 'Transaction Id'},
    {value: 'networkId', viewValue: 'Network Id'},
    {value: 'RRN', viewValue: 'RRN'},
    {value: 'srcAccount', viewValue: 'Src Account'},
    {value: 'destAccount', viewValue: 'Dest Account'},
  ];
  sortColumnList = this.columnLists.sort((a, b) => a.value.localeCompare(b.value));
}

export function numberParser(params: any) {
  const newValue = params.newValue;
  let valueAsNumber;
  if (newValue === null || newValue === undefined || newValue === '') {
    valueAsNumber = null;
  } else {
    valueAsNumber = parseFloat(params.newValue);
  }
  return valueAsNumber;
}
