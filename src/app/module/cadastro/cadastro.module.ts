import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { NavModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { PessoaComponent } from './pessoa/pessoa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoComponent } from './produto/produto.component';
import { CrudProdutoComponent } from './produto/crud-produto/crud-produto.component';
import { CampanhaComponent } from './campanha/campanha.component';
import { CrudCampanhaComponent } from './campanha/crud-campanha/crud-campanha.component';
import { PublicidadeComponent } from './publicidade/publicidade.component';
import { CrudPublicidadeComponent } from './publicidade/crud-publicidade/crud-publicidade.component';
import { CrudClienteComponent } from './cliente/crud-cliente/crud-cliente.component';


@NgModule({
  declarations: [
    ClienteComponent,
    PessoaComponent,
    ProdutoComponent,
    CrudProdutoComponent,
    CampanhaComponent,
    CrudCampanhaComponent,
    PublicidadeComponent,
    CrudPublicidadeComponent,
    CrudClienteComponent,
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
