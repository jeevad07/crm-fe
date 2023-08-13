import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { GadminComponent } from './gadmin/gadmin.component';
import { CadminComponent } from './cadmin/cadmin.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';

import { FormsModule ,ReactiveFormsModule} from '@angular/forms'

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersComponent } from './customers/customers.component';
import { NgbNavConfig, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LayoutComponent,
    GadminComponent,
    CadminComponent,
    UsersComponent,
    NavbarComponent,
    SidebarComponent,
    CustomersComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbNavModule
  ],
  providers: [NgbNavConfig]
})
export class LayoutModule { }
