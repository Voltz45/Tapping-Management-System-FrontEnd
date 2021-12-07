import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {ColDef, ColumnApi, GridApi, RowClickedEvent} from "ag-grid-community";
import {Papa} from 'ngx-papaparse';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export interface PeriodicElement {
  amount: string;
  currencyCode: number;
  destAccount: number;
  HPAN: number;
  merchantId: number;
  merchantType: number;
  MTI: number;
  networkDate: number;
  networkId: number;
  responseCode: string;
  RRN: number;
  srcAccount: number;
  terminalId: number;
  transactionDate: number;
  transactionId: number;
}

export interface columnList {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild('testState') testState!: MatSelect;
  @ViewChild('selectButton', {read: ElementRef}) selectButtonComponent!: ElementRef;

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
      }
    },
    {field: 'transactionId', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'networkId', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'RRN', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'srcAccount', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
    {field: 'destAccount', sortable: true, minWidth: 150, maxWidth: 200, headerClass: 'transaction-header-color'},
  ];

  rowData: PeriodicElement[] = [
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '00',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '22',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 361,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '50',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '00',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '22',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 361,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '50',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '00',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '22',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 361,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '50',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '00',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 360,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '22',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
    {
      amount: '123456789012',
      currencyCode: 361,
      destAccount: 7070,
      HPAN: 182302,
      merchantId: 123,
      merchantType: 1232,
      MTI: 12,
      networkDate: 123,
      networkId: 123,
      responseCode: '50',
      RRN: 12312,
      srcAccount: 12313,
      terminalId: 1231,
      transactionDate: 1231,
      transactionId: 123,
    },
  ];
  columnLists: columnList[] = [
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
  form!: FormGroup;
  columnOption!: FormGroup;
  columnOptionValue: string[] = [];
  public defaultColDef: any;
  paginationSize = 5;

  constructor(private dataFb: FormBuilder, private papa: Papa) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 110,
      editable: false,
      resizable: true,
    };
  }

  ngAfterViewInit(): void {
    this.stylingAgFooter();
  }

  ngOnInit(): void {
    this.form = this.dataFb.group({
      dateFrom: [''],
      dateTo: ['']
    });

    this.columnOption = this.dataFb.group({
      column: [this.columnOptionValue]
    });

    this.columnLists.forEach(x => {
      this.columnOptionValue.push(x.value);
    })
  }

  testButton() {
    const test = document.querySelector('.test-card');
    if (test?.classList.contains('test-height')) {
      test.classList.remove('test-height');
    } else {
      test?.classList.add('test-height');
    }
  }

  selectChange($event: MatSelectChange) {
    this.columnOptionValue.forEach(x => {
      if ($event.value.includes(x)) {
        this.gridColumnApi.setColumnVisible(x, true);
      } else {
        this.gridColumnApi.setColumnVisible(x, false);
      }
    })
  }

  clearButton() {
    this.form.reset();
  }

  searchButton() {
    console.log(this.form.value);
  }

  onCellClicked($event: RowClickedEvent) {
    console.log($event)
  }

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  onPageSizeChanged() {
    const value = (<HTMLInputElement>document.getElementById('page-size')).value;
    this.gridApi?.paginationSetPageSize(Number(value));
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onExport() {
    const test = this.gridApi.getDataAsCsv()!;
    this.papa.parse(test, {
      header: true,
      complete: results => {
        this.exportJsonAsExcelFile(results.data, 'transactionTableExport');
      }
    })
  }

  exportJsonAsExcelFile(json: any[], excelFileName: string) {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workBook: XLSX.WorkBook = {Sheets: {'data': workSheet}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(workBook, {bookType: 'xlsx', type: 'array'});
    TransactionComponent.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private static saveAsExcelFile(excelBuffer: any, excelFileName: string) {
    const data: Blob = new Blob([excelBuffer], {type: '.xlsx'});
    FileSaver.saveAs(data, excelFileName + ' - ' + new Date().toLocaleString() + '.xlsx');
  }

  stylingAgFooter() {
    const ag = document.querySelector('.ag-paging-panel') as HTMLElement;
    ag.style.flexDirection = 'row-reverse';
    ag.style.alignItems = 'center';
    ag.style.justifyContent = 'center';
    ag?.appendChild(document.querySelector('.example-header') as Node);
  }
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
