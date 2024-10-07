import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html'
})
export class RecuperarSenhaComponent {
  form = new FormGroup({
    login: new FormControl<string>('', Validators.required),
  });
  constructor(public activeModal: NgbActiveModal) { }

  enviar() {
    if (this.form.valid) {
      //service
    } else {
      this.form.controls.login.markAsTouched();
    }
  }

}
