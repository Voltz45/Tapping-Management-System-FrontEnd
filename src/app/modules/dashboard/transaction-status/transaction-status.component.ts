import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.css']
})
export class TransactionStatusComponent implements OnInit {
  @Input() status: string = '';

  constructor() {
  }

  ngOnInit(): void {

  }
}
