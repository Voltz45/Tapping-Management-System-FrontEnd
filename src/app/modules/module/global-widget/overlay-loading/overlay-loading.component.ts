import {Component} from '@angular/core';
import {ILoadingOverlayAngularComp} from "ag-grid-angular";
import {ILoadingOverlayParams} from "ag-grid-community";

@Component({
  selector: 'app-overlay-loading',
  templateUrl: './overlay-loading.component.html',
  styleUrls: ['./overlay-loading.component.css']
})
export class OverlayLoadingComponent implements ILoadingOverlayAngularComp {
  progressBarStyle = {'height': '6px'};

  constructor() {
  }

  agInit(params: ILoadingOverlayParams): void {
  }

}
