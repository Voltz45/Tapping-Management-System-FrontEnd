import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DefaultModule} from "./layout/default/default.module";
import {NotificationService} from "./services/notification-service/notification.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {StateConfigurationModule} from "./state-configuration/state-configuration.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    DefaultModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    StateConfigurationModule
  ],
  providers: [NotificationService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
