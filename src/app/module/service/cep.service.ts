import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  buscarCep(cep: string) {
    return this.http.get<Endereco>(`https://brasilapi.com.br/api/cep/v1/${cep}`);
  }
}
