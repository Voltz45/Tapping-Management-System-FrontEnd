import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./layout/default/default.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";

const routes: Routes = [{
  path: 'TMS-Home/dashboard',
  component: DefaultComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
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
export class AppRoutingModule { }
