import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { GadminComponent } from './gadmin/gadmin.component';
import { GadminGuardService } from './guard-role-module/gadmin-guard.service';
import { CadminComponent } from './cadmin/cadmin.component';
import { CadminGuardService } from './guard-role-module/cadmin-duard.service';
import { UsersGuardService } from './guard-role-module/users-guard.service';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: 'cadmin', component: CadminComponent ,canActivate:[CadminGuardService]},
  { path: 'gadmin', component: GadminComponent ,canActivate:[GadminGuardService]},
  { path: 'users', component: UsersComponent ,canActivate:[UsersGuardService]},
  {path:'home',component:SidebarComponent,canActivate:[GadminGuardService]},
  {path: 'customers',component:CustomersComponent,canActivate:[CadminGuardService]}
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
