import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardModule, GridModule } from '@coreui/angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartjsModule } from '@coreui/angular-chartjs';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    CardModule,
    GridModule,
    ChartjsModule
  ]
})
export class DashboardModule { }
