import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const layout= { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) }

const routes: Routes = [
  {path:'login',component:LoginComponent},
  layout,
  {path:'unauthorized',component:UnauthorizedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
