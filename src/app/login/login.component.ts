import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { LoaderService } from '../core/services/loader.service';
import { RegistroComponent } from './registro/registro.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private modalService: NgbModal,
    private loaderService: LoaderService
  ) {
  }

  recuperarSenha() {
    this.modalService.open(RecuperarSenhaComponent);
  }

  registrar() {
    this.modalService.open(RegistroComponent);
  }

  submit() {
    if (this.form.valid) {
      this.loaderService.setLoading(true);
      this.authService.login(this.form.getRawValue())
        .pipe(finalize(() => { this.loaderService.setLoading(false) }))
        .subscribe({
          next: (data) => {
            this.router.navigate(['home/dashboard']);
          },
          error: err => {
            Swal.fire('Atenção!', 'Usuário ou senha inválidos!', 'info');
          }

        });
    } else {
      this.appService.validarTodosCampos(this.form);
    }
  }

}
