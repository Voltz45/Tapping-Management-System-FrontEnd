import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'transaction-status',
  templateUrl: './transaction-status.component.html',
  styleUrls: ['./transaction-status.component.css']
})
export class TransactionStatusComponent implements OnInit {
  @Input() status: string = '';
  updateDate: any;

  constructor() {
  }

  ngOnInit(): void {
    this.updateDate = new Date().toLocaleString().replace(' AM', '').replace(' PM', '');
    setInterval(() => {
      this.updateDate = new Date().toLocaleString().replace(' AM', '').replace(' PM', '');
    }, 5000)
  }
}
