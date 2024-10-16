import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { PublicidadeService } from 'src/app/module/service/publicidade.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-publicidade',
  templateUrl: './crud-publicidade.component.html',
  styles: [
  ]
})
export class CrudPublicidadeComponent {
  @Input() id: number;
  @Input() control: FormControl = new FormControl();


  form = new FormGroup({
    id: new FormControl(0, { validators: Validators.required, nonNullable: true }),
    nome: new FormControl('', { validators: Validators.required, nonNullable: true }),

    status: new FormControl('ativa', { validators: Validators.required, nonNullable: true }),

  });
  file: File | null;
  arquivoSalvo: string;
  url = environment.fileUrl;

  constructor(
    private activeModal: NgbActiveModal,
    private publicidadeService: PublicidadeService,
    private appService: AppService,
    private toastrService: ToastrService

  ) { }


  ngOnInit(): void {
    if (this.id > 0) {
      this.publicidadeService.obter(this.id).subscribe({
        next: (data) => {
          this.form.patchValue(data);

          this.arquivoSalvo = data.arquivo;

        }, error: (err) => this.appService.trataErro(err)
      })
    }
  }


  close() {
    this.activeModal.close();
  }


  salvar() {
    if (this.form.valid) {

      if (!this.file) {
        this.toastrService.error('Anexe um arquivo para salvar!');
      } else {

        var formData = new FormData();
        formData.append('anexo', this.file);
        formData.append('nome', this.form.value.nome!);

        this.publicidadeService.salvar(formData).subscribe({
          next: () => {
            this.toastrService.success('Sucesso');
            this.activeModal.close(true)
          }, error: (err) => this.appService.trataErro(err)
        });

      }
    } else {
      this.appService.validarTodosCampos(this.form)
      this.toastrService.error('Preencha todos os campos para salvar!');
    }
  }


  fileEvent(fileInput: Event) {
    let input = fileInput.target as HTMLInputElement;
    this.file = input.files ? input.files[0] : null;

    if (this.file) {
      let itemId = input.id.toString() + "Name";
      let fileName = this.file.name;

      let h4 = document.getElementById(itemId) as HTMLElement;
      if (h4) {
        h4.innerText = fileName;
      }
    }
  }

}
