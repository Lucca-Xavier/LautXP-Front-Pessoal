import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-check',
  template: `
    <div>
                    <label class="switcher" style="margin-top: 5px;">
                      <input type="checkbox" class="switcher-input" [formControl]="control">
                      <span class="switcher-indicator">
                        <span class="switcher-yes">
                          <span class="ion ion-md-checkmark"></span>
                        </span>
                        <span class="switcher-no">
                          <span class="ion ion-md-close"></span>
                        </span>
                      </span>
                      <span class="switcher-label">
                        {{placeholder}}? {{control.value ? 'Sim' : 'Não'}}
                      </span>
                    </label>
                  </div>
  `,
  styles: [
  ]
})
export class CheckComponent {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';

}
