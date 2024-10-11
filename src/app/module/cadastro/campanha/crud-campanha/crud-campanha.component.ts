import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { CampanhaService } from 'src/app/module/service/campanha.service';

@Component({
  selector: 'app-crud-campanha',
  templateUrl: './crud-campanha.component.html',
  styles: [
  ]
})
export class CrudCampanhaComponent {

  @Input() id: number

  form = new FormGroup({
    id: new FormControl(0, { validators: Validators.required, nonNullable: true }),
    nome: new FormControl('', { validators: Validators.required, nonNullable: true }),
    inicio: new FormControl('', { validators: Validators.required, nonNullable: true }),
    fim: new FormControl('', { validators: Validators.required, nonNullable: true }),
    isActive: new FormControl(true, { validators: Validators.required, nonNullable: true }),
  });


  constructor(
    private activeModal: NgbActiveModal,
    private campanhaService: CampanhaService,
    private toastrService: ToastrService,
    private appService: AppService,

  ) { }


  ngOnInit() {
    if (this.id > 0) {
      this.campanhaService.obter(this.id).subscribe({
        next: (data) => {
          this.form.patchValue(data)
        }, error: (err) => this.appService.trataErro(err)
      })
    }
  }


  salvar() {
    if (this.form.valid) {
      this.campanhaService.salvar(this.form.getRawValue()).subscribe({
        next: () => {
          this.toastrService.success('Sucesso!');
          this.activeModal.close(true);
        }, error: (err) => this.appService.trataErro(err)
      })
    } else {
      this.appService.validarTodosCampos(this.form)
    }
  }


  close() {
    this.activeModal.close();
  }

}
