import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./module/dashboard/dashboard.component";
import {AlertAnalysisComponent} from "./module/investigation/alert-analysis/alert-analysis.component";
import {TerminalListComponent} from './module/acquirer/terminal-list/terminal-list.component';
import {AlertComponent} from './module/acquirer/alert/alert.component';
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
  ActionButtonGroupTerminalComponent
} from './module/terminalConfiguration/terminal/widget/action-button-group-terminal/action-button-group-terminal.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {
  TerminalTableComponent
} from './module/terminalConfiguration/terminal/widget/terminal-table/terminal-table.component';
import {TerminalTableService} from "./services/terminal-configuration-service/terminal-service/terminal-table.service";
import {TerminalTypeComponent} from './module/terminalConfiguration/terminal-type/terminal-type.component';
import {
  TerminalTypeService
} from "./services/terminal-configuration-service/terminal-type-service/terminal-type.service";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {TabViewModule} from "primeng/tabview";
import {
  Iso8583DialectComponent
} from './module/external-interfaces/iso8583configuration/iso8583-dialect/iso8583-dialect.component';
import {
  Iso8583FieldConfigurationComponent
} from './module/external-interfaces/iso8583configuration/iso8583-field-configuration/iso8583-field-configuration.component';
import {
  Iso8583ResponseMappingComponent
} from './module/external-interfaces/iso8583configuration/iso8583-response-mapping/iso8583-response-mapping.component';
import {ProgressBarModule} from "primeng/progressbar";
import {
  OverlayLoadingComponent
} from './module/terminalConfiguration/global-widget/overlay-loading/overlay-loading.component';
import {MessageModule} from "primeng/message";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {TagModule} from "primeng/tag";
import {TagComponent} from './module/terminalConfiguration/global-widget/tag/tag.component';
import {DropdownModule} from "primeng/dropdown";
import {DialectMessageService} from "./services/dialect-message-service/dialect-message.service";
import {
  CreateUpdateDialogTerminalTypeComponent
} from "./module/terminalConfiguration/terminal-type/widget/create-update-dialog/create-update-terminalType-dialog.component";
import {
  TerminalTypeTableComponent
} from './module/terminalConfiguration/terminal-type/widget/terminal-type-table/terminal-type-table.component';
import {
  TerminalTypeTableService
} from "./services/terminal-configuration-service/terminal-type-service/terminal-type-table.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {
  ActionButtonGroupTerminalTypeComponent
} from './module/terminalConfiguration/terminal-type/widget/action-button-group-terminal-type/action-button-group-terminal-type.component';
import {
  Iso8583DialectTableComponent
} from './module/external-interfaces/iso8583configuration/iso8583-dialect/widget/iso8583-dialect-table/iso8583-dialect-table.component';
import {
  CreateUpdateIso8583DialectDialogComponent
} from './module/external-interfaces/iso8583configuration/iso8583-dialect/widget/create-update-iso8583-dialect-dialog/create-update-iso8583-dialect-dialog.component';
import {
  ActionButtonGroupIso8583DialectComponent
} from './module/external-interfaces/iso8583configuration/iso8583-dialect/widget/action-button-group-iso8583-dialect/action-button-group-iso8583-dialect.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AlertAnalysisComponent,
    TerminalListComponent,
    AlertComponent,
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
    ActionButtonGroupTerminalComponent,
    TerminalTableComponent,
    TerminalTypeComponent,
    Iso8583DialectComponent,
    Iso8583FieldConfigurationComponent,
    Iso8583ResponseMappingComponent,
    OverlayLoadingComponent,
    TagComponent,
    CreateUpdateDialogTerminalTypeComponent,
    TerminalTypeTableComponent,
    ActionButtonGroupTerminalTypeComponent,
    Iso8583DialectTableComponent,
    CreateUpdateIso8583DialectDialogComponent,
    ActionButtonGroupIso8583DialectComponent,
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
    TabViewModule,
    ProgressBarModule,
    MessageModule,
    InputTextModule,
    DialogModule,
    TagModule,
    DropdownModule,
    ProgressSpinnerModule
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
    DialectMessageService,
    TerminalTypeTableService
  ]
})
export class FeatureModule {
}
