import { Component, ViewEncapsulation  } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../service/cliente.service';
import { CampanhaService } from '../../service/campanha.service';
import { Campanha } from '../../models/campanha';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboardExterno.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  ranking: Cliente[] = [];
  ranking4: Cliente[] = [];
  campanha: Campanha[]=[];

  constructor(
    private clienteService: ClienteService,
    private campanhaService: CampanhaService
  ) {}

  ngOnInit() {
    this.listar();
    this.listarCampanha();
  }

  listar() {
    this.clienteService.listarRanking().subscribe({
      next: (data: Cliente[]) => {
        this.ranking = data;
        this.listar4();
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
