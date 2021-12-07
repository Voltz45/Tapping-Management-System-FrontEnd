import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./layout/default/default.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {AlertAnalysisComponent} from "./modules/investigation/alert-analysis/alert-analysis.component";
import {TerminalListComponent} from "./modules/Acquirer/terminal-list/terminal-list.component";
import {AlertComponent} from "./modules/Acquirer/alert/alert.component";
import {
  Iso8583configurationComponent
} from "./modules/External-interfaces/iso8583configuration/iso8583configuration.component";
import {Iso20022Component} from "./modules/External-interfaces/iso20022/iso20022.component";
import {
  JsonConfigurationComponent
} from "./modules/External-interfaces/json-configuration/json-configuration.component";
import {NDCComponent} from "./modules/External-interfaces/ndc/ndc.component";
import {XmlConfigurationComponent} from "./modules/External-interfaces/xml-configuration/xml-configuration.component";
import {TerminalComponent} from "./modules/terminalConfiguration/terminal/terminal.component";
import {TransactionComponent} from "./modules/transaction/transaction.component";
import {PrivateSchemeComponent} from "./modules/userManagement/private-scheme/private-scheme.component";
import {RolesComponent} from "./modules/userManagement/roles/roles.component";
import {UserComponent} from "./modules/userManagement/user/user.component";
import {ARPComponent} from "./modules/system/applicationParameters/arp/arp.component";

const routes: Routes = [
  {
    path: 'TMS-Home',
    component: DefaultComponent,
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
        path: 'external-interfaces',
        children: [
          {
            path: 'iso8583-configuration',
            component: Iso8583configurationComponent
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
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'TMS-Home/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
