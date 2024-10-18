import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from '../../service/produto.service';
import { VendasService } from '../../service/vendas.service';
import { CrudVendasComponent } from './crud-vendas/crud-vendas.component';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../models/cliente';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styles: [
  ]
})
export class VendasComponent {
  clientes: Cliente[] = [];
  nomeFiltro: string = '';
  cpfFiltro: string = '';


  form = new FormGroup({
    nomeFiltro: new FormControl(''),
    cpfFiltro: new FormControl('')

  })


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

  pesquisar() {
    const nomeFiltro = this.form.value.nomeFiltro?.trim();
    const cpfFiltro = this.form.value.cpfFiltro?.trim();

    if (!nomeFiltro && !cpfFiltro) {
      this.listar();
    } else {
      const filtro = this.form.value.nomeFiltro || this.form.value.cpfFiltro || "";
      this.vendasService.buscarClientes(filtro).subscribe(data => {
        this.clientes = data;
      });
    }
  }

  limparFiltros() {
    this.form.reset();
    this.listar();
  }


}
