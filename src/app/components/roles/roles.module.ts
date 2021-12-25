import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { ClientComponent } from './client/client.component';
import { AuthurizationOneGuard } from 'src/app/guards/authurization-one.guard';
import { AuthurizationTwoGuard } from 'src/app/guards/authurization-two.guard';
import { AuthurizationThreeGuard } from 'src/app/guards/authurization-three.guard';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AuthurizationOneGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate: [AuthurizationTwoGuard]},
  {path: 'client', component: ClientComponent, canActivate: [AuthurizationThreeGuard]}
]

@NgModule({
  declarations: [
    AdminComponent,
    EmployeeComponent,
    ClientComponent
  ],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(routes)
  ]
})
export class RolesModule { }
