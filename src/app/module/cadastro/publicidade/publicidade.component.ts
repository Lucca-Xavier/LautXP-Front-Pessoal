import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudPublicidadeComponent } from './crud-publicidade/crud-publicidade.component';

@Component({
  selector: 'app-publicidade',
  templateUrl: './publicidade.component.html',
  styles: [
  ]
})
export class PublicidadeComponent {
excluir(arg0: any) {
throw new Error('Method not implemented.');
}

  campanhas: any[] = []
publicidade: any;

  constructor(
    private modalService: NgbModal,
  ){}

  ngOnInit(){
    this.listar()
  }

  listar(){

  }


  crud(id: number){
    const modalRef = this.modalService.open(CrudPublicidadeComponent, {size: 'lg'})
    modalRef.componentInstance.id = id
    modalRef.result.then((result: any) => {
      if (result) this.listar()
    })
  }

}
