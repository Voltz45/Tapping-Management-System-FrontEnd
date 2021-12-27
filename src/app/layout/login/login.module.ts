import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login.component";
import {AuthenticationService} from "../../globalServices/authentication.service";
import {AuthenticationGuard} from "../../guard/authentication.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UserService} from "./service/user.service";
import {AuthInterceptor} from "../../interceptor/auth.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService, UserService, AuthenticationGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class LoginModule {
}
