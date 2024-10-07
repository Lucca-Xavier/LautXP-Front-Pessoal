import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { NavModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { PessoaComponent } from './pessoa/pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ClienteComponent,
    PessoaComponent
  ],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    TableModule,
    UtilitiesModule,
    NavModule,
    TabsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class CadastroModule { }
