import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionRateChartService} from "../../../../services/module-service/transaction-rate-chart.service";
import {WebsocketService} from "../../../../services/module-service/websocket.service";

@Component({
  selector: 'transactionRate-widget-chart',
  templateUrl: './transactionrate-widget-chart.component.html',
  styleUrls: ['./transactionrate-widget-chart.component.css']
})
export class TransactionrateWidgetChartComponent implements OnInit, OnDestroy {

  constructor(public transactionRateService: TransactionRateChartService,
              public webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.transactionRateService.chartRateTimer();
    // this.webSocketService.openSocket();
  }

  ngOnDestroy() {
    clearInterval(this.transactionRateService.interval);
  }
}
