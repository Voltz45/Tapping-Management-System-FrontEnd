import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/module-service/dashboard.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../services/authentication-service/authentication.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  currentDate = new Date();
  hours = this.currentDate.getHours();
  greet: string = '';

  constructor(
    private dashboardService: DashboardService,
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.dataUser = this.authenticationService.getUserFromLocalCache();
    this.giveGreetingByCurrentTime();
  }

  exportButtonListener() {
    this._snackBar.open('Export Button Work Perfectly Sir!', 'Close');
  }

  giveGreetingByCurrentTime(){
    if (this.hours < 12){
      this.greet = 'Good Morning';
    } else if (this.hours >= 12 && this.hours <= 17) {
      this.greet = 'Good Afternoon';
    } else if (this.hours >= 17 && this.hours <= 24) {
      this.greet = 'Good Evening';
    }
  }
}
