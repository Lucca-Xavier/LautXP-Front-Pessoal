import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Usuario } from 'src/app/module/models/usuario';
import { UsuarioService } from 'src/app/module/service/usuario.service';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html'
})
export class CrudUsuarioComponent implements OnInit {
  @Input() public id: number;
  form = new FormGroup({
    id: new FormControl(0, Validators.required),
    nome: new FormControl<string>('', Validators.required),
    login: new FormControl<string>('', Validators.required),
    idTipoUsuario: new FormControl<number | null>(null, Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  constructor(
    private activeModal: NgbActiveModal,
    private usuarioService: UsuarioService,
    private appService: AppService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.id > 0) {
      this.usuarioService.obter(this.id).subscribe({
        next: (data: Usuario) => {
          this.form.patchValue({
            id: data.idUsuario,
            nome: data.nome,
            login: data.login,
            idTipoUsuario: data.idTipoUsuario,
            email: data.email
          });
        },
        error: err => {
          this.appService.trataErro(err);
        }
      });
    }
  }

  salvar() {
    if (this.form.valid) {

    } else {
      this.toastrService.warning('Preencha todos os campos em vermelho.');
      this.appService.validarTodosCampos(this.form);
    }
  }

  close() {
    this.activeModal.close();
  }

}
