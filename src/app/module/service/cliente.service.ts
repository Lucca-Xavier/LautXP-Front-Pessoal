import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = environment.baseUrl + 'api/cliente'

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(this.url)
  }

  obter(id: number) {
    return this.http.get<Cliente>(this.url + id);
  }

  salvar(data: Cliente) {
    return this.http.post(this.url, data)
  }

  excluir(id: number) {
    return this.http.delete(this.url + id);
  }
}
