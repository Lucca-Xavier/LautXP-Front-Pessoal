import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private url = environment.baseUrl + 'api/venda/'

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(this.url)
  }

  obter(id: number) {
    return this.http.get<Cliente>(this.url + id);
  }

  salvar(data: Venda) {
    return this.http.post(this.url, data)
  }

  buscarClientes(filtro: string) {
    return this.http.get<Cliente[]>(`${this.url}buscar?filtro=${filtro}`);
  }

}
