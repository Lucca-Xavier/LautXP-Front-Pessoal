import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private authService: AuthService) {
  }
  canActivate() {
    const token = this.authService.getToken;
    // return true
    // Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token.token)) {
      return true;
     }

     this.router.navigate(["/login"]);
     return false;
  }
}