import { Component, ViewEncapsulation } from '@angular/core';
import { Campanha } from 'src/app/module/models/campanha';
import { Cliente } from 'src/app/module/models/cliente';
import { CampanhaService } from 'src/app/module/service/campanha.service';
import { ClienteService } from 'src/app/module/service/cliente.service';

@Component({
  selector: 'app-dashboard-externo',
  templateUrl: './dashboard-externo.component.html',
  encapsulation: ViewEncapsulation.None


})
export class DashboardExternoComponent {
  ranking: Cliente[] = [];
  ranking4: Cliente[] = [];
  campanha: Campanha[] = [];

  constructor(
    private clienteService: ClienteService,
    private campanhaService: CampanhaService
  ) { }

  ngOnInit() {
    this.listar();
    this.listarCampanha();
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


  listarCampanha() {
    this.campanhaService.listar().subscribe({
      next: (data) => {
        this.campanha = data.filter(campanha => campanha.isActive);
        console.log(this.campanha)
      }
    })
  }

  listar4() {
    this.ranking4 = this.ranking.slice(3);
    while (this.ranking4.length < 12) {
      this.ranking4.push({ nome: '' } as Cliente);
    }
  }
}
