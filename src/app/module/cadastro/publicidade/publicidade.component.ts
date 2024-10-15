import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudPublicidadeComponent } from './crud-publicidade/crud-publicidade.component';
import { PublicidadeService } from '../../service/publicidade.service';
import { Publicidade } from '../../models/publicidade';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-publicidade',
  templateUrl: './publicidade.component.html',
  styles: [
  ]
})
export class PublicidadeComponent {
  campanhas: any[] = []
  publicidade: Publicidade[];

  constructor(
    private modalService: NgbModal,
    private service: PublicidadeService,
    private toastrService: ToastrService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(data => this.publicidade = data);
  }

  crud(id: number) {
    const modalRef = this.modalService.open(CrudPublicidadeComponent, { size: 'lg' })
    modalRef.componentInstance.id = id
    modalRef.result.then((result) => {
      if (result) this.listar();
    })
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      icon: 'info',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.service
          .excluir(id)
          .subscribe({
            next: () => {
              this.toastrService.success('Exclusão realizada com sucesso!');
              this.listar();
            }, error: (err) => this.appService.trataErro(err)
          });
      }
    });
  }

}
