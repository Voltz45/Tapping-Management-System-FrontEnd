import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {Papa} from 'ngx-papaparse';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {TransactionTableService} from "./service/transaction-table.service";
import {TransactionApiService} from "./service/transaction-api.service";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})

export class TransactionComponent implements OnInit, AfterViewInit {
  searchFilterForm!: FormGroup;
  columnOption!: FormGroup;
  columnOptionValue: string[] = [];

  constructor(private dataFb: FormBuilder,
              private papa: Papa,
              public transactionTableService: TransactionTableService,
              public transactionApiService: TransactionApiService) {
  }

  ngOnInit(): void {
    this.searchFilterForm = this.dataFb.group({
      dateFrom: [''],
      dateTo: [''],
      MTI: ['', Validators.pattern('[0-9]*')],
      HPAN: ['', Validators.pattern('[0-9]*')],
      terminalId: ['', Validators.pattern('[0-9]*')],
      merchantId: ['', Validators.pattern('[0-9]*')],
      merchantType: ['', Validators.pattern('[0-9]*')],
      currencyCode: ['', Validators.pattern('[0-9]*')],
      amount: ['', Validators.pattern('[0-9]*')],
      responseCode: ['', Validators.pattern('[0-9]*')],
      transactionId: ['', Validators.pattern('[0-9]*')],
      networkId: ['', Validators.pattern('[0-9]*')],
      RRN: ['', Validators.pattern('[0-9]*')],
      srcAccount: ['', Validators.pattern('[0-9]*')],
      destAccount: ['', Validators.pattern('[0-9]*')],
    });

    this.columnOption = this.dataFb.group({
      column: [this.columnOptionValue]
    });

    this.transactionTableService.columnLists.forEach(x => {
      this.columnOptionValue.push(x.value);
    })
  }

  ngAfterViewInit(): void {
    this.stylingAgFooter();
  }

  //Extended Styling with DOM
  stylingAgFooter() {
    const ag = document.querySelector('.ag-paging-panel') as HTMLElement;
    ag.style.flexDirection = 'row-reverse';
    ag.style.alignItems = 'center';
    ag.style.justifyContent = 'center';
    ag?.appendChild(document.querySelector('.page-size-container') as Node);
  }

  //Button Listener
  expandButton() {
    const test = document.querySelector('.transaction-header-card');
    if (test?.classList.contains('expanded')) {
      test.classList.remove('expanded');
    } else {
      test?.classList.add('expanded');
    }
  }

  searchButton() {
    let test = this.transactionApiService.rowData;
    const valueMTI = Number(this.searchFilterForm.controls['MTI'].value);
    const valueHPAN = Number(this.searchFilterForm.controls['HPAN'].value);
    const valueTerminalId = Number(this.searchFilterForm.controls['terminalId'].value);
    const valueMerchantId = Number(this.searchFilterForm.controls['merchantId'].value);
    const valueMerchantType = Number(this.searchFilterForm.controls['merchantType'].value);
    const valueCurrencyCode = Number(this.searchFilterForm.controls['currencyCode'].value);
    const valueAmount = String(this.searchFilterForm.controls['amount'].value);
    const valueResponseCode = String(this.searchFilterForm.controls['responseCode'].value);
    const valueTransactionId = Number(this.searchFilterForm.controls['transactionId'].value);
    const valueNetworkId = Number(this.searchFilterForm.controls['networkId'].value);
    const valueRRN = Number(this.searchFilterForm.controls['RRN'].value);
    const valueSrcAccount = Number(this.searchFilterForm.controls['srcAccount'].value);
    const valueDestAccount = Number(this.searchFilterForm.controls['destAccount'].value);

    if (this.searchFilterForm.controls['MTI'].value != '') {
      test = test.filter(
        value => {
          return value.MTI == valueMTI
        }
      )
    }

    if (this.searchFilterForm.controls['HPAN'].value != '') {
      test = test.filter(
        value => {
          return value.HPAN == valueHPAN
        }
      )
    }

    if (this.searchFilterForm.controls['terminalId'].value != '') {
      test = test.filter(
        value => {
          return value.terminalId == valueTerminalId
        }
      )
    }

    if (this.searchFilterForm.controls['merchantId'].value != '') {
      test = test.filter(
        value => {
          return value.merchantId == valueMerchantId
        }
      )
    }

    if (this.searchFilterForm.controls['merchantType'].value != '') {
      test = test.filter(
        value => {
          return value.merchantType == valueMerchantType
        }
      )
    }

    if (this.searchFilterForm.controls['currencyCode'].value != '') {
      test = test.filter(
        value => {
          return value.currencyCode == valueCurrencyCode
        }
      )
    }

    if (this.searchFilterForm.controls['amount'].value != '') {
      test = test.filter(
        value => {
          return value.amount == valueAmount
        }
      )
    }

    if (this.searchFilterForm.controls['responseCode'].value != '') {
      test = test.filter(
        value => {
          return value.responseCode == valueResponseCode
        }
      )
    }

    if (this.searchFilterForm.controls['transactionId'].value != '') {
      test = test.filter(
        value => {
          return value.transactionId == valueTransactionId
        }
      )
    }

    if (this.searchFilterForm.controls['networkId'].value != '') {
      test = test.filter(
        value => {
          return value.networkId == valueNetworkId
        }
      )
    }

    if (this.searchFilterForm.controls['RRN'].value != '') {
      test = test.filter(
        value => {
          return value.RRN == valueRRN
        }
      )
    }

    if (this.searchFilterForm.controls['srcAccount'].value != '') {
      test = test.filter(
        value => {
          return value.srcAccount == valueSrcAccount
        }
      )
    }

    if (this.searchFilterForm.controls['destAccount'].value != '') {
      test = test.filter(
        value => {
          return value.destAccount == valueDestAccount
        }
      )
    }

    //Update data Table by filter
    this.transactionTableService.gridApi.setRowData(test);

    if (
      (this.searchFilterForm.controls['MTI'].value == null || this.searchFilterForm.controls['MTI'].value != '') &&
      (this.searchFilterForm.controls['HPAN'].value == null || this.searchFilterForm.controls['HPAN'].value != '') &&
      (this.searchFilterForm.controls['terminalId'].value == null || this.searchFilterForm.controls['terminalId'].value != '') &&
      (this.searchFilterForm.controls['merchantId'].value == null || this.searchFilterForm.controls['merchantId'].value != '') &&
      (this.searchFilterForm.controls['merchantType'].value == null || this.searchFilterForm.controls['merchantType'].value != '') &&
      (this.searchFilterForm.controls['currencyCode'].value == null || this.searchFilterForm.controls['currencyCode'].value != '') &&
      (this.searchFilterForm.controls['amount'].value == null || this.searchFilterForm.controls['amount'].value != '') &&
      (this.searchFilterForm.controls['responseCode'].value == null || this.searchFilterForm.controls['responseCode'].value != '') &&
      (this.searchFilterForm.controls['transactionId'].value == null || this.searchFilterForm.controls['transactionId'].value != '') &&
      (this.searchFilterForm.controls['networkId'].value == null || this.searchFilterForm.controls['networkId'].value != '') &&
      (this.searchFilterForm.controls['RRN'].value == null || this.searchFilterForm.controls['RRN'].value != '') &&
      (this.searchFilterForm.controls['srcAccount'].value == null || this.searchFilterForm.controls['srcAccount'].value != '') &&
      (this.searchFilterForm.controls['destAccount'].value == null || this.searchFilterForm.controls['destAccount'].value != '')
    ) {
      this.transactionTableService.gridApi.setRowData(this.transactionApiService.rowData);
    }
  }

  clearButton() {
    this.searchFilterForm.reset();
    this.transactionTableService.gridApi.setRowData(this.transactionApiService.rowData);
  }

  //Export excel button
  onExport() {
    const stringCSV = this.transactionTableService.gridApi.getDataAsCsv()!;
    this.papa.parse(stringCSV, {
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
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  saveAsExcelFile(excelBuffer: any, excelFileName: string) {
    const data: Blob = new Blob([excelBuffer], {type: '.xlsx'});
    FileSaver.saveAs(data, excelFileName + ' - ' + new Date().toLocaleString() + '.xlsx');
  }

  //Option Listener
  selectChange($event: MatSelectChange) {
    this.columnOptionValue.forEach(x => {
      if ($event.value.includes(x)) {
        this.transactionTableService.gridColumnApi.setColumnVisible(x, true);
      } else {
        this.transactionTableService.gridColumnApi.setColumnVisible(x, false);
      }
    })
  }

  onPageSizeChanged() {
    const value = (<HTMLInputElement>document.getElementById('page-size')).value;
    this.transactionTableService.gridApi?.paginationSetPageSize(Number(value));
  }
}
