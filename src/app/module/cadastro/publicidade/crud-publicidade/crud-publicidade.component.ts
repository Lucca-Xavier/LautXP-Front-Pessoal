import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { PublicidadeService } from 'src/app/module/service/publicidade.service';

@Component({
  selector: 'app-crud-publicidade',
  templateUrl: './crud-publicidade.component.html',
  styles: [
  ]
})
export class CrudPublicidadeComponent {
  @Input() id: number;
  @Input() control: FormControl = new FormControl();


  form = new FormGroup({
    id: new FormControl(0, { validators: Validators.required, nonNullable: true }),
    nome: new FormControl('', { validators: Validators.required, nonNullable: true }),
    arquivo: new FormControl(null as File | null, { validators: Validators.required, nonNullable: true }),
    isActive: new FormControl(true, { validators: Validators.required, nonNullable: true }),

  });


  constructor(
    private activeModal: NgbActiveModal,
    private publicidadeService: PublicidadeService,
    private appService: AppService,
    private toastrService: ToastrService

  ) { }


  ngOnInit(): void {
    if (this.id > 0) {
      this.publicidadeService.obter(this.id).subscribe({
        next: (data) => {
          this.form.patchValue(data)
        }, error: (err) => this.appService.trataErro(err)
      })
    }
  }


  close() {
    this.activeModal.close();
  }


  salvar() {
    if (this.form.valid) {
      this.publicidadeService.salvar(this.form.getRawValue()).subscribe({
        next: () => {
          this.toastrService.success('Sucesso');
          this.activeModal.close(true)
        }, error: (err) => this.appService.trataErro(err)
      })
    } else {
      this.appService.validarTodosCampos(this.form)
    }
  }


  fileEvent(fileInput: Event) {
    let input = fileInput.target as HTMLInputElement;
    let file = input.files ? input.files[0] : null;

    if (file) {
      this.form.controls.arquivo.setValue(file);
      let itemId = input.id.toString() + "Name";
      let fileName = file.name;

      let h4 = document.getElementById(itemId) as HTMLElement;
      if (h4) {
        h4.innerText = fileName;
      }
    } else{
      this.form.controls.arquivo.setErrors({ required: true });
    }
  }

  mostrarCSSErro(control: FormControl) {
    return {
      'is-invalid': this.campoValido(control),
      '': this.campoValido(control)
    };
  }
  campoValido(control: FormControl) {
    return !control.valid && control.touched;
  }



}
