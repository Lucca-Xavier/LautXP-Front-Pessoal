import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrudUsuarioComponent } from './usuario/crud-usuario/crud-usuario.component';


@NgModule({
  declarations: [
    PerfilComponent,
    UsuarioComponent,
    CrudUsuarioComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    ReactiveFormsModule,
    TableModule,
    UtilitiesModule,
    SharedModule
  ]
})
export class SistemaModule { }
