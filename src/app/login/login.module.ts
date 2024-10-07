import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { SharedModule } from '../shared/shared.module';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
    declarations: [
        LoginComponent,
        RecuperarSenhaComponent,
        RegistroComponent
    ],
    imports: [
        LoginRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class LoginModule { }
