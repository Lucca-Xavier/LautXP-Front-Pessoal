import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-header">
    <h6 class="modal-title">{{text}}</h6>
    <button type="button" class="btn-close" aria-label="Close" (click)="close.emit()"></button>
</div>
<div class="modal-body">
    <ng-content></ng-content>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="close.emit()">Fechar</button>
    <button type="button" class="btn btn-outline-success" (click)="salvar.emit()"
    *ngIf="showSalvar">
        <span class="fa fa-save"></span> Salvar
    </button>
</div>
  `,
  styles: [
  ]
})
export class ModalComponent {
  @Input() text: string;
  @Output() salvar = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Input() showSalvar = true;
}
