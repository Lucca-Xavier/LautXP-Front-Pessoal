import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing.module';
import { NavModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendasComponent } from './vendas/vendas.component';
import { CrudVendasComponent } from './vendas/crud-vendas/crud-vendas.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    VendasComponent,
    CrudVendasComponent,
  ],
  imports: [
    CommonModule,
    VendasRoutingModule,
    TableModule,
    UtilitiesModule,
    NavModule,
    TabsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class VendasModule { }
