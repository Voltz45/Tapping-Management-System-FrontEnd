import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AlertAnalysisComponent} from "./investigation/alert-analysis/alert-analysis.component";
import {TerminalListComponent} from './Acquirer/terminal-list/terminal-list.component';
import {AlertComponent} from './Acquirer/alert/alert.component';
import {Iso8583configurationComponent} from './External-interfaces/iso8583configuration/iso8583configuration.component';
import {Iso20022Component} from './External-interfaces/iso20022/iso20022.component';
import {JsonConfigurationComponent} from './External-interfaces/json-configuration/json-configuration.component';
import {NDCComponent} from './External-interfaces/ndc/ndc.component';
import {XmlConfigurationComponent} from './External-interfaces/xml-configuration/xml-configuration.component';
import {TerminalComponent} from './terminalConfiguration/terminal/terminal.component';
import {TransactionComponent} from './transaction/transaction.component';
import {PrivateSchemeComponent} from './userManagement/private-scheme/private-scheme.component';
import {RolesComponent} from './userManagement/roles/roles.component';
import {UserComponent} from './userManagement/user/user.component';
import {ARPComponent} from './system/applicationParameters/arp/arp.component';
import {MatCardModule} from "@angular/material/card";
import {NgxEchartsModule} from "ngx-echarts";
import {WebsocketService} from "./services/websocket.service";
import {TransactionRateChartService} from "./services/chart-services/transaction-rate-chart.service";
import {
  TransactionrateWidgetChartComponent
} from './dashboard/transactionrate-widget-chart/transactionrate-widget-chart.component';
import {TransactionStatusComponent} from './dashboard/transaction-status/transaction-status.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {DatePickerComponent} from './transaction/widget-transaction/date-picker/date-picker.component';
import {MatSelectModule} from "@angular/material/select";
import {AgGridModule} from 'ag-grid-angular';
import {TransactionApiService} from "./transaction/service/transaction-api.service";
import {TransactionTableService} from "./transaction/service/transaction-table.service";
import {TableComponent} from './transaction/widget-transaction/table/table.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AlertAnalysisComponent,
    TerminalListComponent,
    AlertComponent,
    Iso8583configurationComponent,
    Iso20022Component,
    JsonConfigurationComponent,
    NDCComponent,
    XmlConfigurationComponent,
    TerminalComponent,
    TransactionComponent,
    PrivateSchemeComponent,
    RolesComponent,
    UserComponent,
    ARPComponent,
    TransactionrateWidgetChartComponent,
    TransactionStatusComponent,
    DatePickerComponent,
    TableComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    AgGridModule.withComponents([]),
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    BrowserAnimationsModule,
    NgxMatNativeDateModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [
    WebsocketService,
    TransactionRateChartService,
    TransactionApiService,
    TransactionTableService
  ]
})
export class FeatureModule {
}
