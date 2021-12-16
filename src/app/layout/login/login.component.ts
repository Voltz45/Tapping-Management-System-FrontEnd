import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {User} from "../model/user";
import {AuthenticationService} from "../service/authentication.service";
import {HeaderTypeEnum} from "../enum/header-type.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {NotificationService} from "../service/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading?: boolean;
  private subscriptions: Subscription[] = [];
  form!: FormGroup;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.login-container');

    sign_up_btn?.addEventListener('click', () => {
      container?.classList.add('sign-up-mode');
    })

    sign_in_btn?.addEventListener('click', () => {
      container?.classList.remove('sign-up-mode');
    })

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/TMS-Home/dashboard');
    } else {
      this.router.navigateByUrl('/TMS/login');
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
          this.router.navigateByUrl('/TMS-Home/dashboard');
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
    if (message) {
      this.notificationService.notify(notificationTypeEnum, message);
    } else {
      this.notificationService.notify(notificationTypeEnum, 'An Error Occured. Please Try Again');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
