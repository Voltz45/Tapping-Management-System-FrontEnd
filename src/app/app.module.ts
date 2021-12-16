import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultModule} from "./layout/default/default.module";
import {LoginModule} from "./layout/login/login.module";
import {NotificationModule} from "./notification/notification.module";
import {NotificationService} from "./layout/service/notification.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    LoginModule,
    NotificationModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
