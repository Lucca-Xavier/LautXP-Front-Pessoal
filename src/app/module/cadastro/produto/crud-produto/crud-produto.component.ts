import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ProdutoService } from 'src/app/module/service/produto.service';

@Component({
  selector: 'app-crud-produto',
  templateUrl: './crud-produto.component.html',
  styles: [
  ]
})
export class CrudProdutoComponent {
  @Input() id: number;

  tiposTamanho: any[] = [
    { value: 300, text: '300ml' },
    { value: 500, text: '500ml' },
  ];

  form = new FormGroup({
    id: new FormControl(0, { validators: Validators.required, nonNullable: true }),
    rotulo: new FormControl('', { validators: Validators.required, nonNullable: true }),
    tamanho: new FormControl(300, { validators: Validators.required, nonNullable: true }),
    isActive: new FormControl(true, { validators: Validators.required, nonNullable: true }),

  });
  

  constructor(
    private activeModal: NgbActiveModal,
    private produtoService: ProdutoService,
    private appService: AppService,
    private toastrService: ToastrService
  ) { };



  ngOnInit(): void {
    if (this.id > 0) {
      this.produtoService.obter(this.id).subscribe({
        next: (data) => {
          this.form.patchValue(data)
        }, error: (err) => this.appService.trataErro(err)
      })
    }
  }

  salvar() {
    if (this.form.valid) {
      this.produtoService.salvar(this.form.getRawValue()).subscribe({
        next: () => {
          this.toastrService.success('Sucesso');
          this.activeModal.close(true)
        }, error: (err) => this.appService.trataErro(err)
      })
    } else{
      this.appService.validarTodosCampos(this.form)
    }
  }

  close() {
    this.activeModal.close();
  }
}

