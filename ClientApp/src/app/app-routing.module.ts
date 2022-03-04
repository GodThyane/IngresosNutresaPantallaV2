import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentsComponent} from "./components/departments/departments.component"; // CLI imports router

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: '',   redirectTo: '/departments', pathMatch: 'full' }, // redirect to `first-component`
];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
