import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { ModalComponent } from './components/modal/modal.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { CheckComponent } from './components/check/check.component';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';



@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    ModalComponent,
    TextareaComponent,
    CheckComponent,
    CpfCnpjPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  exports: [
    InputComponent,
    SelectComponent,
    ModalComponent,
    TextareaComponent,
    CheckComponent,
    CpfCnpjPipe
  ],
  providers: [
    provideNgxMask()
  ],
})
export class SharedModule { }
