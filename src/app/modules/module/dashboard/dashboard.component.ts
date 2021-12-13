import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard-service/dashboard.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  exportButtonListener() {
    this._snackBar.open('Export Button Work Perfectly Sir!', 'Close');
  }

}
