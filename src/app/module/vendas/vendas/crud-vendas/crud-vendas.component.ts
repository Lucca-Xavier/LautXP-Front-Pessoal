import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Produto } from 'src/app/module/models/produto';
import { ProdutoService } from 'src/app/module/service/produto.service';
import { VendasService } from 'src/app/module/service/vendas.service';

@Component({
  selector: 'app-crud-vendas',
  templateUrl: './crud-vendas.component.html',
  styles: [
  ]
})
export class CrudVendasComponent {

  @Input() idCliente: number;

  produtos: Produto[] = []

  produtosEstatico: any[] = [
    { value: "Pilsen", text: 'Pilsen' },
    { value: "Ipa", text: 'Ipa' },
  ];


  form= new FormGroup({
    id: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    idCliente: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    idProduto: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    quantidade: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    isActive: new FormControl(true, { validators: Validators.required, nonNullable: true }),

  })


  constructor(
    private activeModal: NgbActiveModal,
    private vendasService: VendasService,
    private toastrService: ToastrService,
    private appService: AppService,
    private produtoService: ProdutoService
  ){}


  ngOnInit(){
    this.listarProdutos()
    this.form.controls.idCliente.setValue(this.idCliente);
    console.log(this.form)
  }

  listarProdutos(){
    this.produtoService.listar().subscribe({
      next: (data) =>{
        this.produtos = data
        console.log(this.produtos)

      }
    })
  }


  salvar(){
    if(this.form.valid){
      console.log(this.form)
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
