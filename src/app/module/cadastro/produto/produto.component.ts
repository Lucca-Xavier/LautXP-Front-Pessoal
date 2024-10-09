import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CrudProdutoComponent } from './crud-produto/crud-produto.component';
import { ProdutoService } from '../../service/produto.service';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent {

  produtos: any[] = [];


  constructor(
    private modalService: NgbModal,
    private produtoService: ProdutoService
  ) {}


  ngOnInit(){
    this.listar()
  }

  listar() {
    this.produtoService.listar().subscribe({
      next: (data) => {
        this.produtos = data
      }
    })
  }

  crud(id: number) {
    const modalRef = this.modalService.open(CrudProdutoComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result: any) => {
      if (result) this.listar()
    })
  }

}
