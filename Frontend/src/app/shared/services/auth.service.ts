import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authRoutes, environment } from '../../../environments/environment.development';
import { Auth, Registro, UserLogin, UserRegsitro } from '../interfaces/auth.interface';
import { catchError, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

/**
 * @David_Trujillo
 */

export class AuthService {
  private loggedIn = sessionStorage.getItem('token') ? true : false;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(usuario: UserLogin) {
    return this.http.post<Auth>(environment.baseUrl + environment.authEndpoint + authRoutes.login, usuario).pipe(
      tap((auth: Auth) => {
        localStorage.setItem('token', auth.data.token);
        this.loggedIn = true;
      }),
      catchError(error => {
        console.error('Error durante el login', error);
        return of(undefined);
      })
    );
  }

  registrar(usuario: UserRegsitro) {
    return this.http.post<Registro>(environment.baseUrl + environment.authEndpoint + authRoutes.registro, usuario);
  }

  estaLoggeado(): boolean {
    return this.loggedIn;
  }

  esAdmin(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.roles
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nombre === 'admin') {
          return true
        }
      }
    }
    return false
  }

}