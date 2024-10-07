import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.baseUrl + 'usuario/';
  constructor(private http: HttpClient) { }

  listarUsuarios() {
    return this.http.get<Usuario[]>(this.url + `listarUsuarios`);
  }

  obter(id: number) {
    return this.http.get<Usuario>(this.url + `obterUsuarioPorId/?idUsuario=${id}`);
  }

  salvar(data: Usuario) {
    return this.http.post<any>(this.url + `salvarUsuario`, data);
  }

}
