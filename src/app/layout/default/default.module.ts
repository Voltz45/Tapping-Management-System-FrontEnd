import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from "./default.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FeatureModule} from "../../modules/feature.module";

@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    FeatureModule,
    SharedModule,
    RouterModule
  ]
})
export class DefaultModule {
}
