import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('/token')) {
      return next.handle(req);
    }
    req = this.addToken(req, this.authService.getToken?.token!!);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this.handleRefreshToken(req, next);
        }
        return throwError(() => err);
      })
    );
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.doRefreshToken().pipe(
      switchMap((data: any) => {
        const token = this.authService.setToken(data);
        return next.handle(this.addToken(request, token.token));
      }),
      catchError(err => {
        this.authService.logout();
        return throwError(() => err);
      })
    )
  }

}
