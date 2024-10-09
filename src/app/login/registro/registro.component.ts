import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  form = new FormGroup({
    id: new FormControl<number>(0),
    userName: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, Validators.required),
    idTipoUsuario: new FormControl(1, Validators.required),
  });

  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private toastrService: ToastrService,
    private appService: AppService
  ) { }

  close() {
    this.activeModal.close();
  }

  salvar() {
    if (this.form.valid) {
      this.authService.register(this.form.getRawValue()).subscribe(data => {
        this.toastrService.success('Conta criada com sucesso');
        this.close();
      }, err => {
        this.toastrService.error(err)
      });
    } else {
      this.appService.validarTodosCampos(this.form);
    }
  }

}
