import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CrudProdutoComponent } from './crud-produto/crud-produto.component';
import { ProdutoService } from '../../service/produto.service';
import { Produto } from '../../models/produto';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent {
  produtos: Produto[] = [];

  constructor(
    private modalService: NgbModal,
    private produtoService: ProdutoService,
    private toastrService: ToastrService,
    private appService: AppService
  ) { }


  ngOnInit() {
    this.listar()
  }

  listar() {
    this.produtoService.listar().subscribe({
      next: (data) => {
        this.produtos = data
      }
    });
  }

  crud(id: number) {
    const modalRef = this.modalService.open(CrudProdutoComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result) this.listar()
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
        this.produtoService
          .excluir(id)
          .subscribe({
            next: () => {
              this.toastrService.success('Exclusão realizada com sucesso!');
              this.listar();
            }, error: (err) => this.appService.trataErro(err)
          });
      }
    });
  }

}
