import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultModule} from "./layout/default/default.module";
import {LoginModule} from "./layout/login/login.module";
import {NotificationModule} from "./notification/notification.module";
import {NotificationService} from "./globalServices/notification.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DefaultModule,
    LoginModule,
    NotificationModule,
    ToastModule,
    ButtonModule,
    RippleModule
  ],
  providers: [NotificationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
