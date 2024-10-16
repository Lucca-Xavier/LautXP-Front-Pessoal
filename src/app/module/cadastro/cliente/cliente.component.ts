import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CrudClienteComponent } from './crud-cliente/crud-cliente.component';
import Swal from 'sweetalert2';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent {

  appService: any;
  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private clienteService: ClienteService

  ) {
  }
  clientes: Cliente[] = [];

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes = data
      }
    });

    console.log(this.clientes)

  }

  crud(id: number) {
    const modalRef = this.modalService.open(CrudClienteComponent, { size: 'lg' });
    modalRef.componentInstance.tipo = 'Cliente';
    modalRef.componentInstance.id = id;
    modalRef.result.then((result: any) => {
      if (result) this.listar();
    });
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      icon: 'info',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.clienteService
          .excluir(id)
          .subscribe({
            next: () => {
              this.toastrService.success('Exclusão realizada com sucesso!');
              this.listar();
            }, error: (err: any) => this.appService.trataErro(err)
          });
      }
    });
  }
}
