import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authRoutes, environment } from '../../../environments/environment.development';
import { Auth, Registro, UserLogin, UserRegsitro } from '../interfaces/auth.interface';
import { catchError, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private loggedIn = localStorage.getItem('token') ? true : false;

  login(usuario: UserLogin) {
    return this.http.post<Auth>(environment.baseUrl + environment.authEndpoint + authRoutes.login, usuario).pipe(
      tap((auth: Auth) => {
        localStorage.setItem('token', auth.data.token); // Almacenar el token en localStorage
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
}