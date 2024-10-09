import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Token } from '../models/token';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginData, RegisterData } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<Token | null>;
  public user: Observable<Token | null>;
  private url = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!));
    this.user = this.userSubject.asObservable();
  }

  public get getToken(): Token | null {
    return this.userSubject.value;
  }

  login(data: LoginData) {
    return this.http.post(this.url + `auth/token`, { userName: data.email, password: data.password, grantType: 'password' })
      .pipe(map((token: any) => {
        const newToken = this.setToken(token);
        this.userSubject.next(newToken);
        return newToken;
      }));
  }

  doRefreshToken() {
    const refreshToken = this.getToken?.refreshToken;
    return this.http.post(this.url + `auth/token`, { grantType: 'refresh_token', refreshToken: refreshToken, userName: 'vendedor' });
  }

  setToken(token: any): Token {
    const newToken: Token = {
      token: token.accessToken,
      refreshToken: token.refreshToken
    }
    localStorage.setItem('token', JSON.stringify(newToken));
    return newToken;
  }

  register(data: RegisterData) {
    return this.http.post(this.url + `auth/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
