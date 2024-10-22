import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardExternoComponent } from './dashboard-externo/dashboard-externo.component';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';



const routes: Routes = [
  {
    path: '',
    component: DashboardExternoComponent
  }
];


@NgModule({
  declarations: [
    DashboardExternoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    ChartjsModule
  ],
  exports: [RouterModule]
})
export class DashboardExternoModule { }
