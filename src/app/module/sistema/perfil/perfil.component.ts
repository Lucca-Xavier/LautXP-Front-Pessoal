import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { CepService } from 'src/app/module/service/cep.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input() public idPessoa: number;
  formPJ = new FormGroup({
    razaoSocial: new FormControl<string>('', Validators.required),
    cpfCnpj: new FormControl<string>('', Validators.required),
    nome: new FormControl<string>('', Validators.required),
    ie: new FormControl<string | null>(null),
    tipoPessoa: new FormControl<string>('PJ')
  });

  formPF = new FormGroup({
    cpfCnpj: new FormControl<string>('', Validators.required),
    nome: new FormControl<string>('', Validators.required),
    tipoPessoa: new FormControl<string>('PF'),
    sexo: new FormControl(null, Validators.required),
    dataNascimento: new FormControl<string>('', Validators.required),
    mae: new FormControl<string | null>(null),
    pai: new FormControl<string | null>(null),
    rg: new FormControl<string | null>(null),
    orgaoExpeditor: new FormControl<string | null>(null),
    dataExpedicao: new FormControl<string | null>(null),
  });

  formContato = new FormGroup({
    telefoneCelular: new FormControl<string>('', Validators.required),
    telefoneComercial: new FormControl<string | null>(null),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    site: new FormControl<string | null>(null),
  });

  formEndereco = new FormGroup({
    logradouro: new FormControl<string>('', Validators.required),
    numero: new FormControl<string>('', Validators.required),
    uf: new FormControl<string>('', Validators.required),
    cidade: new FormControl<string>('', Validators.required),
    bairro: new FormControl<string>('', Validators.required),
    cep: new FormControl<string>('', Validators.required),
    complemento: new FormControl<string>(''),
    referencia: new FormControl<string>(''),
  });

  formObs = new FormGroup({
    observacoes: new FormControl<string | null>(null),
  });

  tiposPessoa: any[] = [
    { value: 'PJ', text: 'Pessoa Jurídica' },
    { value: 'PF', text: 'Pessoa Fisíca' },
  ];
  sexos: any[] = [
    { value: 'F', text: 'Feminino' },
    { value: 'M', text: 'Masculino' }
  ];
  msgalert: string = '';
  tipoSelecionado: string = 'PF';
  constructor(
    private toastrService: ToastrService,
    private appService: AppService,
    private cepService: CepService
  ) { }
  ngOnInit() {
  }


  salvar() {
    const formGroup: FormGroup = this.tipoSelecionado === 'PJ' ? this.formPJ : this.formPF;
    if (formGroup.valid && this.formContato.valid && this.formEndereco.valid) {
      var obj = Object.assign({}, formGroup.getRawValue(), this.formContato.getRawValue());
      console.log(obj)
    } else {
      this.toastrService.warning('Preencha todos os campos em vermelho.');
      this.appService.validarTodosCampos(formGroup);
      this.appService.validarTodosCampos(this.formContato);
      this.appService.validarTodosCampos(this.formEndereco);
    }

  }

  selecaoTipo(evento: any) {
    this.tipoSelecionado = evento.target.value;
    if (evento.target.value === 'PJ') {
      this.formPJ.patchValue({
        tipoPessoa: evento.target.value,
      });
    } else {
      this.formPF.patchValue({
        tipoPessoa: evento.target.value,
      });

    }
  }

  buscarCep() {
    if (this.formEndereco.value.cep) {
      this.cepService.buscarCep(this.formEndereco.value.cep).subscribe(data => {
        this.formEndereco.patchValue({
          bairro: data.neighborhood,
          cidade: data.city,
          uf: data.state,
          logradouro: data.street
        });
      }, err => {
        this.toastrService.error('Cep não encontrado');
        this.formEndereco.reset();
      });
    }
  }

}
