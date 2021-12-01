import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {User} from "../model/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {HeaderTypeEnum} from "../enum/header-type.enum";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading?: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('/dashboard');
    }else {
      this.router.navigateByUrl('/login');
    }
  }
  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User> | any) => {
          const token = response.headers.get(HeaderTypeEnum.JWT_TOKEN);
          if (token != null) {
            this.authenticationService.saveToken(token);
          }
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/dashboard');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationTypeEnum.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }


  private sendErrorNotification(notificationTypeEnum: NotificationTypeEnum, message: string): void {
    if (message){
      this.notificationService.notify(notificationTypeEnum, message);
    }else {
      this.notificationService.notify(notificationTypeEnum, 'An Error Occured. Please Try Again');
    }

  }

  ngOnDestroy():void{
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
