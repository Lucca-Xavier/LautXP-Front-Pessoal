import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ProdutoService } from 'src/app/module/service/produto.service';
import { VendasService } from 'src/app/module/service/vendas.service';

@Component({
  selector: 'app-crud-vendas',
  templateUrl: './crud-vendas.component.html',
  styles: [
  ]
})
export class CrudVendasComponent {

  

  produtos: any[] = []

  produtosEstatico: any[] = [
    { value: "Pilsen", text: 'Pilsen' },
    { value: "Ipa", text: 'Ipa' },
  ];


  form= new FormGroup({
    id: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    idCliente: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    idProduto: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    quantidade: new FormControl(0, {validators: Validators.required, nonNullable: true})
  })


  constructor(
    private activeModal: NgbActiveModal,
    private vendasService: VendasService,
    private toastrService: ToastrService,
    private appService: AppService,
    private produtoService: ProdutoService
  ){}

// Pra quando tiver o back, chamar os produtos pra listar no foreach da combobox
  listarProdutos(){
    this.produtoService.listar().subscribe({
      next: (data) =>{
        this.produtos = data
      }
    })
  }


  salvar(){
    if(this.form.valid){
      this.vendasService.salvar(this.form.getRawValue()).subscribe({
        next: () =>{
          this.toastrService.success('Sucesso!')
          this.activeModal.close(true)
        }, error: (err) => this.appService.trataErro(err)
      })
    } else{
      this.appService.validarTodosCampos(this.form)
    }
  }

  close(){
    this.activeModal.close()
  }
}
