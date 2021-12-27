import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FooterComponent} from "./footer/footer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {HeaderService} from "../services/shared-service/header.service";
import {SidebarService} from "../services/shared-service/sidebar.service";


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDividerModule,
  ],
  providers: [
    HeaderService,
    SidebarService
  ]
})
export class SharedModule {
}
