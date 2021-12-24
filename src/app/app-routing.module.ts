import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./layout/default/default.component";
import {DashboardComponent} from "./modules/module/dashboard/dashboard.component";
import {AlertAnalysisComponent} from "./modules/module/investigation/alert-analysis/alert-analysis.component";
import {TerminalListComponent} from "./modules/module/acquirer/terminal-list/terminal-list.component";
import {AlertComponent} from "./modules/module/acquirer/alert/alert.component";
import {Iso20022Component} from "./modules/module/external-interfaces/iso20022/iso20022.component";
import {
  JsonConfigurationComponent
} from "./modules/module/external-interfaces/json-configuration/json-configuration.component";
import {NDCComponent} from "./modules/module/external-interfaces/ndc/ndc.component";
import {
  XmlConfigurationComponent
} from "./modules/module/external-interfaces/xml-configuration/xml-configuration.component";
import {TerminalComponent} from "./modules/module/terminalConfiguration/terminal/terminal.component";
import {TransactionComponent} from "./modules/module/transaction/transaction.component";
import {PrivateSchemeComponent} from "./modules/module/userManagement/private-scheme/private-scheme.component";
import {RolesComponent} from "./modules/module/userManagement/roles/roles.component";
import {UserComponent} from "./modules/module/userManagement/user/user.component";
import {ARPComponent} from "./modules/module/system/applicationParameters/arp/arp.component";
import {SystemParametersComponent} from "./modules/module/system/system-parameters/system-parameters.component";
import {LoginComponent} from "./layout/login/login.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {TerminalTypeComponent} from "./modules/module/terminalConfiguration/terminal-type/terminal-type.component";
import {
  Iso8583DialectComponent
} from "./modules/module/external-interfaces/iso8583configuration/iso8583-dialect/iso8583-dialect.component";
import {
  Iso8583FieldConfigurationComponent
} from "./modules/module/external-interfaces/iso8583configuration/iso8583-field-configuration/iso8583-field-configuration.component";
import {
  Iso8583ResponseMappingComponent
} from "./modules/module/external-interfaces/iso8583configuration/iso8583-response-mapping/iso8583-response-mapping.component";
import {Iso8583FormatComponent} from "./modules/module/message-format/iso8583-format/iso8583-format.component";

const routes: Routes = [
  {
    path: 'TMS/login',
    component: LoginComponent
  },
  {
    path: 'TMS-Home',
    component: DefaultComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'investigation',
        children: [{
          path: 'alert-analysis',
          component: AlertAnalysisComponent
        }]
      },
      {
        path: 'acquirer',
        children: [
          {
            path: 'terminal-list',
            component: TerminalListComponent
          },
          {
            path: 'alert',
            component: AlertComponent
          }
        ]
      },
      {
        path: 'issuer',
        children: [
          {
            path: 'terminal-list',
            component: TerminalListComponent
          },
          {
            path: 'alert',
            component: AlertComponent
          }
        ]
      },
      {
        path: 'message-format',
        children: [
          {
            path: 'iso8583-format',
            component: Iso8583FormatComponent
          }
        ]
      },
      {
        path: 'external-interfaces',
        children: [
          {
            path: 'iso8583-configuration',
            children: [
              {
                path: 'iso8583-dialect',
                component: Iso8583DialectComponent
              },
              {
                path: 'iso8583Field-Configuration',
                component: Iso8583FieldConfigurationComponent
              },
              {
                path: 'iso8583-ResponseMapping',
                component: Iso8583ResponseMappingComponent
              },
            ]
          },
          {
            path: 'iso20022',
            component: Iso20022Component
          },
          {
            path: 'json-configuration',
            component: JsonConfigurationComponent
          },
          {
            path: 'NDC',
            component: NDCComponent
          },
          {
            path: 'xml-configuration',
            component: XmlConfigurationComponent
          },
        ]
      },
      {
        path: 'terminal-configuration',
        children: [
          {
            path: 'terminal',
            component: TerminalComponent
          },
          {
            path: 'terminal-type',
            component: TerminalTypeComponent
          }
        ]
      },
      {
        path: 'transaction',
        component: TransactionComponent
      },
      {
        path: 'user-management',
        children: [
          {
            path: 'private-scheme',
            component: PrivateSchemeComponent
          },
          {
            path: 'roles',
            component: RolesComponent
          },
          {
            path: 'user',
            component: UserComponent
          }
        ]
      },
      {
        path: 'system',
        children: [
          {
            path: 'application-parameters',
            children: [
              {
                path: 'ARP',
                component: ARPComponent
              }
            ]
          },
          {
            path: 'system-parameters',
            component: SystemParametersComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'TMS/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
