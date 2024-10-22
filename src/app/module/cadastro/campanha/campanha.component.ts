import { Component } from '@angular/core';
import { ModalService } from '@coreui/angular';
import { CrudCampanhaComponent } from './crud-campanha/crud-campanha.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampanhaService } from '../../service/campanha.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-campanha',
  templateUrl: './campanha.component.html',
  styles: [
  ]
})
export class CampanhaComponent {

  campanhas: any[] = []

  constructor(
    private modalService: NgbModal,
    private campanhaService: CampanhaService,
    private toastrService: ToastrService,
    private appService: AppService,
    
  ) {}

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.campanhaService.listar().subscribe({
      next: (data) => {
        this.campanhas = data
        console.log(data)
      }
    })
  }


  crud(id: number) {
    const modalRef = this.modalService.open(CrudCampanhaComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result: any) => {
      if (result) this.listar()
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
        this.campanhaService
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
