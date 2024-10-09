import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private url = environment.baseUrl + 'api/produto/'

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Produto[]>(this.url)
  }

  obter(id: number) {
    return this.http.get<Produto>(this.url + id);
  }

  salvar(data: Produto) {
    return this.http.post(this.url, data)
  }

  excluir(id: number) {
    return this.http.delete(this.url + id);
  }
}
