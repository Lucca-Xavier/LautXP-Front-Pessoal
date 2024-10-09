import { Component } from '@angular/core';
import { ModalService } from '@coreui/angular';
import { CrudCampanhaComponent } from './crud-campanha/crud-campanha.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampanhaService } from '../../service/campanha.service';

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
    private campanhaService: CampanhaService
  ) {}

  ngOnInit() {
    this.listar()
  }

  listar() {
    this.campanhaService.listar().subscribe({
      next: (data) => {
        this.campanhas = data
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
}
