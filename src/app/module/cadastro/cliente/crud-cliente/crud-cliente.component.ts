import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ClienteService } from 'src/app/module/service/cliente.service';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styles: [
  ]
})
export class CrudClienteComponent {
  @Input() id: number;

  form = new FormGroup({
    id: new FormControl(0, { validators: Validators.required, nonNullable: true }),
    nome: new FormControl('', { validators: Validators.required, nonNullable: true }),
    cpf: new FormControl('', { validators: Validators.required, nonNullable: true }),
    pontos: new FormControl(0, {validators: Validators.required, nonNullable: true}),
    nascimento: new FormControl('', {validators: Validators.required, nonNullable: true})
  });
  

  constructor(
    private activeModal: NgbActiveModal,
    private clienteService: ClienteService,
    private appService: AppService,
    private toastrService: ToastrService
  ) { };



  ngOnInit(): void {
    if (this.id > 0) {
      this.clienteService.obter(this.id).subscribe({
        next: (data) => {
          this.form.patchValue(data)
        }, error: (err) => this.appService.trataErro(err)
      })
    }
  }

  salvar() {
    if (this.form.valid) {
      this.clienteService.salvar(this.form.getRawValue()).subscribe({
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

