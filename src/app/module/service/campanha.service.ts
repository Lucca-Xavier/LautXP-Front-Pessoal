import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campanha } from '../models/campanha';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {
  private url = environment.baseUrl + 'api/campanha'

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Campanha[]>(this.url)
  }

  obter(id: number) {
    return this.http.get<Campanha>(this.url + id)
  }

  salvar(data: Campanha) {
    return this.http.post(this.url, data)
  }

  excluir(id: number) {
    return this.http.delete(this.url + id)
  }


}
