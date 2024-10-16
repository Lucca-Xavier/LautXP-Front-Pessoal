import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from '../../service/produto.service';
import { VendasService } from '../../service/vendas.service';
import { CrudVendasComponent } from './crud-vendas/crud-vendas.component';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styles: [
  ]
})
export class VendasComponent {
  clientes: Cliente[] = [];


  constructor(
    private modalService: NgbModal,
    private vendasService: VendasService,
    private clienteService: ClienteService
  ) { }


  ngOnInit() {
    this.listar()
  }

  listar() {
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes = data
      }
    })
  }

  crud(id: number) {
    const modalRef = this.modalService.open(CrudVendasComponent, { size: 'lg' });
    modalRef.componentInstance.idCliente = id;
    modalRef.result.then((result: any) => {
      if (result) this.listar()
    })
  }

}
