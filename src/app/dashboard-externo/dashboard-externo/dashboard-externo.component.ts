import { Component, ViewEncapsulation } from '@angular/core';
import { Cliente } from 'src/app/module/models/cliente';
import { ClienteService } from 'src/app/module/service/cliente.service';

@Component({
  selector: 'app-dashboard-externo',
  templateUrl: './dashboard-externo.component.html',
  encapsulation: ViewEncapsulation.None


})
export class DashboardExternoComponent {
  ranking: Cliente[] = [];
  ranking4: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.clienteService.listarRanking().subscribe({
      next: (data: Cliente[]) => {
        this.ranking = data;
        this.listar4();
        console.log(this.ranking4)
      },
      error: (err) => {
        console.error('Erro ao listar ranking:', err);
      }
    });
  }

  listar4() {
    this.ranking4 = this.ranking.slice(3);
    while (this.ranking4.length < 12) {
      this.ranking4.push({ nome: '' } as Cliente);
    }
  }
}
