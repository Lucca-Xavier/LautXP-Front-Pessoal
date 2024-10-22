import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutDefaultComponent } from './layout/layout-default/layout-default.component';
import { LoginComponent } from './login/login.component';
import { DashboardExternoComponent } from './dashboard-externo/dashboard-externo/dashboard-externo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboardexterno',
    component: DashboardExternoComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],

  },
  {
    path: 'home',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./module/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },

      {
        path: 'vendas',
        loadChildren: ()=>
          import('./module/vendas/vendas.module').then((m) => m.VendasModule)
      },
      {
        path: 'cadastro',
        loadChildren: () =>
          import('./module/cadastro/cadastro.module').then((m) => m.CadastroModule)
      },
      {
        path: 'sistema',
        loadChildren: () =>
          import('./module/sistema/sistema.module').then((m) => m.SistemaModule)
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
