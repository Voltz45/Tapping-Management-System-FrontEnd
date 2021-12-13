import {Injectable} from '@angular/core';
import * as echarts from 'echarts';
import {WebsocketService} from "../websocket-service/websocket.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionRateChartService {
  constructor(private websocketService: WebsocketService) {
  }

  interval: any;
  public _updateOptions: any;

  private timeStamps = (function () {
    let now = new Date();
    let res = [];
    let len = 50;
    while (len--) {
      res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
      now = new Date(+now - 1000);
    }
    return res;
  })();

  private data = (function () {
    let res = [];
    let len = 50;
    while (len--) {
      res.push(0);
    }
    return res;
  })();

  private data2: number[] = (function () {
    let res = [];
    let len = 0;
    while (len < 50) {
      res.push(0);
      len++;
    }
    return res;
  })();

  public _option: echarts.EChartsOption = {
    grid: {
      top: 70,
      bottom: 30
    },
    title: {
      text: 'Transaction Rate',
      show: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        magicType: {
          type: ['line', 'bar']
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: {
      id: 'dataZoomX',
      type: 'inside',
      filterMode: 'filter'
    },
    xAxis: [
      {
        type: 'category',
        data: this.timeStamps,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Price',
        boundaryGap: [0, 0]
      },
    ],
    series: [
      {
        name: 'SYN',
        type: 'bar',
        data: this.data,
        // showSymbol: false,
      },
      {
        name: 'ACK',
        type: 'bar',
        data: this.data2,
        // showSymbol: false,
      }
    ],
  };

  public chartRateTimer() {
    this.interval = setInterval(() => {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

      this.data.shift();
      this.data.push(Math.round(Math.random() * 1000)); //change this value to Transaction rate value
      this.data2.shift();
      this.data2.push(Math.round(Math.random() * 500)); //change this value to Transaction rate value

      this.timeStamps.shift();
      this.timeStamps.push(axisData);

      this._updateOptions = {
        xAxis: [
          {
            data: this.timeStamps
          }
        ],
        series: [
          {
            data: this.data
          },
          {
            data: this.data2
          }
        ]
      };
    }, 1000);
  }
}
