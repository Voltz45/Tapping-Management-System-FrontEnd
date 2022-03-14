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
import {ChannelComponent} from './module/channelConfiguration/channel/channel.component';
import {TransactionComponent} from './module/transaction/transaction.component';
import {PrivateSchemeComponent} from './module/userManagement/private-scheme/private-scheme.component';
import {RolesComponent} from './module/userManagement/roles/roles.component';
import {UserComponent} from './module/userManagement/user/user.component';
import {ARPComponent} from './module/system/applicationParameters/arp/arp.component';
import {MatCardModule} from "@angular/material/card";
import {NgxEchartsModule} from "ngx-echarts";
import {WebsocketService} from "../services/module-service/websocket.service";
import {TransactionRateChartService} from "../services/module-service/transaction-rate-chart.service";
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
import {TransactionApiService} from "../services/module-service/transaction-api.service";
import {TransactionTableService} from "../services/module-service/transaction-table.service";
import {TableComponent} from './module/transaction/widget-transaction/table/table.component';
import {DashboardService} from "../services/module-service/dashboard.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatExpansionModule} from "@angular/material/expansion";
import {InterfacesListComponent} from './module/dashboard/interfaces-list/interfaces-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SystemParametersComponent} from './module/system/system-parameters/system-parameters.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ChannelService} from "../services/module-service/channel.service";
import {
  DialogChannelComponent
} from './module/channelConfiguration/channel/widget/create-update-dialog/dialog-channel.component';
import {HpanDialogComponent} from './module/transaction/widget-transaction/hpan-dialog/hpan-dialog.component';
import {
  ActionButtonGroupTerminalComponent
} from './module/channelConfiguration/channel/widget/action-button-group-terminal/action-button-group-terminal.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {
  ChannelTableComponent
} from './module/channelConfiguration/channel/widget/channel-table/channel-table.component';
import {ChannelTableService} from "../services/module-service/channel-table.service";
import {ChannelTypeComponent} from './module/channelConfiguration/channel-type/channel-type.component';
import {ChannelTypeService} from "../services/module-service/channel-type.service";
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
import {OverlayLoadingComponent} from './module/global-widget/overlay-loading/overlay-loading.component';
import {MessageModule} from "primeng/message";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {TagModule} from "primeng/tag";
import {TagComponent} from './module/global-widget/tag/tag.component';
import {DropdownModule} from "primeng/dropdown";
import {Iso8583DialectService} from "../services/module-service/iso8583-dialect.service";
import {
  CreateUpdateDialogChannelTypeComponent
} from "./module/channelConfiguration/channel-type/widget/create-update-dialog/create-update-channelType-dialog.component";
import {
  ChannelTypeTableComponent
} from './module/channelConfiguration/channel-type/widget/channel-type-table/channel-type-table.component';
import {ChannelTypeTableService} from "../services/module-service/channel-type-table.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {
  ActionButtonGroupChannelTypeComponent
} from './module/channelConfiguration/channel-type/widget/action-button-group-channel-type/action-button-group-channel-type.component';
import {
  Iso8583DialectTableComponent
} from './module/external-interfaces/iso8583configuration/iso8583-dialect/widget/iso8583-dialect-table/iso8583-dialect-table.component';
import {
  DialogIso8583DialectComponent
} from './module/external-interfaces/iso8583configuration/iso8583-dialect/widget/create-update-iso8583-dialect-dialog/dialog-iso8583-dialect.component';
import {
  ButtonIso8583DialectComponent
} from './module/external-interfaces/iso8583configuration/iso8583-dialect/widget/action-button-group-iso8583-dialect/button-iso8583-dialect.component';
import {Iso8583FormatComponent} from './module/message-format/iso8583-format/iso8583-format.component';
import {
  Iso8583FormatTableComponent
} from './module/message-format/iso8583-format/widget/iso8583-format-table/iso8583-format-table.component';
import {
  ActionButtonGroupIso8583FormatComponent
} from './module/message-format/iso8583-format/widget/action-button-group-iso8583-format/action-button-group-iso8583-format.component';
import {
  CreateUpdateDialogIso8583FormatComponent
} from './module/message-format/iso8583-format/widget/create-update-dialog-iso8583-format/create-update-dialog-iso8583-format.component';
import {AuthenticationService} from "../services/authentication-service/authentication.service";
import {UserService} from "../services/user-service/user.service";
import {AuthenticationGuard} from "../guard/authentication.guard";
import {AuthInterceptor} from "../interceptor/auth.interceptor";
import {LoginComponent} from "./module/login/login.component";
import {
  Iso8583FieldTableComponent
} from './module/external-interfaces/iso8583configuration/iso8583-field-configuration/widget/iso8583-field-table/iso8583-field-table.component';
import {
  Iso8583FieldFormComponent
} from './module/external-interfaces/iso8583configuration/iso8583-field-configuration/widget/create-update-iso8583-field-form/iso8583-field-form.component';
import {RouterModule} from "@angular/router";
import {Iso8583FieldService} from "../services/module-service/iso8583-field.service";
import {MatRadioModule} from "@angular/material/radio";


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
    ChannelComponent,
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
    DialogIso8583DialectComponent,
    HpanDialogComponent,
    ActionButtonGroupTerminalComponent,
    ChannelTableComponent,
    ChannelTypeComponent,
    Iso8583DialectComponent,
    Iso8583FieldConfigurationComponent,
    Iso8583ResponseMappingComponent,
    OverlayLoadingComponent,
    TagComponent,
    CreateUpdateDialogChannelTypeComponent,
    ChannelTypeTableComponent,
    DialogChannelComponent,
    ActionButtonGroupChannelTypeComponent,
    Iso8583DialectTableComponent,
    DialogIso8583DialectComponent,
    ButtonIso8583DialectComponent,
    Iso8583FormatComponent,
    Iso8583FormatTableComponent,
    ActionButtonGroupIso8583FormatComponent,
    CreateUpdateDialogIso8583FormatComponent,
    LoginComponent,
    Iso8583FieldTableComponent,
    Iso8583FieldFormComponent
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
    ProgressSpinnerModule,
    RouterModule,
    MatRadioModule
  ],
  providers: [
    WebsocketService,
    TransactionRateChartService,
    TransactionApiService,
    TransactionTableService,
    DashboardService,
    ChannelService,
    ChannelTableService,
    ChannelTypeService,
    Iso8583DialectService,
    ChannelTypeTableService,
    Iso8583FieldService,
    AuthenticationService, UserService, AuthenticationGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class FeatureModule {
}
