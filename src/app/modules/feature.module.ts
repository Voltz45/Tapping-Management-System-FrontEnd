import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./module/dashboard/dashboard.component";
import {AlertAnalysisComponent} from "./module/investigation/alert-analysis/alert-analysis.component";
import {TerminalListComponent} from './module/acquirer/terminal-list/terminal-list.component';
import {AlertComponent} from './module/acquirer/alert/alert.component';
import {
  Iso8583configurationComponent
} from './module/external-interfaces/iso8583configuration/iso8583configuration.component';
import {Iso20022Component} from './module/external-interfaces/iso20022/iso20022.component';
import {JsonConfigurationComponent} from './module/external-interfaces/json-configuration/json-configuration.component';
import {NDCComponent} from './module/external-interfaces/ndc/ndc.component';
import {XmlConfigurationComponent} from './module/external-interfaces/xml-configuration/xml-configuration.component';
import {TerminalComponent} from './module/terminalConfiguration/terminal/terminal.component';
import {TransactionComponent} from './module/transaction/transaction.component';
import {PrivateSchemeComponent} from './module/userManagement/private-scheme/private-scheme.component';
import {RolesComponent} from './module/userManagement/roles/roles.component';
import {UserComponent} from './module/userManagement/user/user.component';
import {ARPComponent} from './module/system/applicationParameters/arp/arp.component';
import {MatCardModule} from "@angular/material/card";
import {NgxEchartsModule} from "ngx-echarts";
import {WebsocketService} from "./services/websocket-service/websocket.service";
import {TransactionRateChartService} from "./services/chart-services/transaction-rate-chart.service";
import {
  TransactionrateWidgetChartComponent
} from './module/dashboard/transactionrate-widget-chart/transactionrate-widget-chart.component';
import {TransactionStatusComponent} from './module/dashboard/transaction-status/transaction-status.component';
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
import {DatePickerComponent} from './module/transaction/widget-transaction/date-picker/date-picker.component';
import {MatSelectModule} from "@angular/material/select";
import {AgGridModule} from 'ag-grid-angular';
import {TransactionApiService} from "./services/transaction-service/transaction-api.service";
import {TransactionTableService} from "./services/transaction-service/transaction-table.service";
import {TableComponent} from './module/transaction/widget-transaction/table/table.component';
import {DashboardService} from "./services/dashboard-service/dashboard.service";
import {HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import {InterfacesListComponent} from './module/dashboard/interfaces-list/interfaces-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SystemParametersComponent} from './module/system/system-parameters/system-parameters.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TerminalService} from "./services/terminal-configuration-service/terminal-service/terminal.service";
import {
  CreateUpdateDialogComponent
} from './module/terminalConfiguration/terminal/widget/create-update-dialog/create-update-dialog.component';
import {HpanDialogComponent} from './module/transaction/widget-transaction/hpan-dialog/hpan-dialog.component';
import {
  ActionButtonGroupComponent
} from './module/terminalConfiguration/terminal/widget/action-button-group/action-button-group.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {
  TerminalTableComponent
} from './module/terminalConfiguration/terminal/widget/terminal-table/terminal-table.component';
import {TerminalTableService} from "./services/terminal-configuration-service/terminal-service/terminal-table.service";
import {
  TerminalTypeComponent
} from './module/terminalConfiguration/terminal-type/terminal-type/terminal-type.component';
import {
  TerminalTypeService
} from "./services/terminal-configuration-service/terminal-type-service/terminal-type.service";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {TabViewModule} from "primeng/tabview";


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
    InterfacesListComponent,
    SystemParametersComponent,
    CreateUpdateDialogComponent,
    HpanDialogComponent,
    ActionButtonGroupComponent,
    TerminalTableComponent,
    TerminalTypeComponent,
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
    MatSelectModule,
    HttpClientModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
    ToastModule,
    RippleModule,
    TabViewModule
  ],
  providers: [
    WebsocketService,
    TransactionRateChartService,
    TransactionApiService,
    TransactionTableService,
    DashboardService,
    TerminalService,
    TerminalTableService,
    TerminalTypeService,
  ]
})
export class FeatureModule {
}
