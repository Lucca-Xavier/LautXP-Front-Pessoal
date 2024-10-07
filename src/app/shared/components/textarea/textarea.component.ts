import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html'
})
export class TextareaComponent {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() cols: number;
  @Input() rows: number;

  mostrarCSSErro(control: FormControl) {
    return {
      'is-invalid': this.campoValido(control),
      '': this.campoValido(control)
    };

  }
  campoValido(control: FormControl) {
    return !control.valid && control.touched;
  }

  labelRequired() {
    if (this.control.hasValidator(Validators.required)) return 'required';

    return '';
  }
}
