import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from "./default.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FeatureModule} from "../../modules/feature.module";
import {NotificationModule} from "../../notification/notification.module";

@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    FeatureModule,
    SharedModule,
    RouterModule,
    NotificationModule
  ]
})
export class DefaultModule {
}
