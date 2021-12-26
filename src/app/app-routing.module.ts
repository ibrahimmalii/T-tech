import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home', 
    loadChildren: () => import('./components/roles/roles.module').then(m => m.RolesModule),canActivate: [AuthenticationGuard]
  },
  {
    path: 'unAuthorized',
    component: UnAuthorizedComponent
  },{
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
