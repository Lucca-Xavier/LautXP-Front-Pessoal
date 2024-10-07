import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PessoaComponent } from '../pessoa/pessoa.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})
export class ClienteComponent {
  constructor(private modalService: NgbModal, public toastrService: ToastrService) {
  }
  clientes: any[] = [];

  listar() {

  }

  crud(id: number) {
    const modalRef = this.modalService.open(PessoaComponent, { size: 'lg' });
    modalRef.componentInstance.tipo = 'Cliente';
    modalRef.componentInstance.id = id;
    modalRef.result.then((result: any) => {
      if (result) this.listar();
    });
  }
}
