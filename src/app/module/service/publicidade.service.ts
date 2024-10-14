import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Publicidade } from '../models/publicidade';

@Injectable({
  providedIn: 'root'
})
export class PublicidadeService {

  private url = environment.baseUrl + 'api/publicidade/'

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Publicidade[]>(this.url)
  }

  obter(id: number) {
    return this.http.get<Publicidade>(this.url + id)
  }

  salvar(data: FormData) {
    return this.http.post(this.url, data)
  }

  excluir(id: number) {
    return this.http.delete(this.url + id)
  }
}
