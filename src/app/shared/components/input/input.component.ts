import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',

})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() format: string = '';

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
