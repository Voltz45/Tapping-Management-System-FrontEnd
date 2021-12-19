import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard-service/dashboard.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../globalServices/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataUser: any;

  constructor(
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.dataUser = this.authenticationService.getUserFromLocalCache();
  }

  exportButtonListener() {
    this._snackBar.open('Export Button Work Perfectly Sir!', 'Close');
  }

}
