import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private toastrService: ToastrService
  ) { }

  validarTodosCampos(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validarTodosCampos(control);
      }
    });
  }

  trataErro(err: any) {
    if (err.status === 400) {
      this.toastrService.error(err.error);
      return err.error;
    } else if (err.status === 500) {
      this.toastrService.error(err.error.mensagem);
      return err.error.mensagem;
    }
  }

}
