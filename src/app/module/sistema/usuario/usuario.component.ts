import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/module/service/usuario.service';
import { CrudUsuarioComponent } from './crud-usuario/crud-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  usuarios: any[];

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioService.listarUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  crud(id: number) {
    const modalRef = this.modalService.open(CrudUsuarioComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result: any) => {
      if (result) this.listar();
    });
  }
}
