import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {UserModel} from "../../../model/user-model/user.model";
import {AuthenticationService} from "../../../services/authentication-service/authentication.service";
import {HeaderTypeEnum} from "../../../enum/header-type.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationTypeEnum} from "../../../enum/notification-type.enum";
import {NotificationService} from "../../../services/notification-service/notification.service";

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
    private route: ActivatedRoute,
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
      // this.router.navigateByUrl('/TMS/login');
    }
  }

  public onLogin(user: UserModel): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || 'TMS-Home/dashboard';
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<UserModel> | any) => {
          const token = response.headers.get(HeaderTypeEnum.JWT_TOKEN);
          if (token != null) {
            this.authenticationService.saveToken(token);
          }
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl(returnUrl);
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationTypeEnum.ERROR, errorResponse.error.message, errorResponse.status);
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(notificationTypeEnum: NotificationTypeEnum, message: string, statusCode: number): void {
    if (message) {
      this.notificationService.notify(notificationTypeEnum, message, statusCode);
    } else {
      this.notificationService.notify(notificationTypeEnum, 'An Error Occured. Please Try Again', statusCode);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}