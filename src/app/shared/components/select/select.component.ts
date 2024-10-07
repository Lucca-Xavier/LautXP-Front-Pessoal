import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() public data: any;
  @Input() public control: FormControl = new FormControl();
  @Input() public label: string;
  @Input() public permiteNull: boolean = true;
  @Input() public newSelect: boolean = false;
  @Input() public string: boolean = true;
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
