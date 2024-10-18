import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './produto/produto.component';
import { CampanhaComponent } from './campanha/campanha.component';
import { PublicidadeComponent } from './publicidade/publicidade.component';

const routes: Routes = [
  { path: 'cliente', component: ClienteComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'campanha', component: CampanhaComponent },
  {path: 'publicidade', component: PublicidadeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
