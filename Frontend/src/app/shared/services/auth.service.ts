import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authRoutes, environment } from '../../../environments/environment.development';
import { Auth, Registro, UserLogin, UserRegsitro } from '../interfaces/auth.interface';
import { catchError, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      this.loggedIn = JSON.parse(loggedIn);
    } else {
      this.loggedIn = false;
    }
  }

  private loggedIn: boolean;

  login(usuario: UserLogin) {
    return this.http.post<Auth>(environment.baseUrl + environment.authEndpoint + authRoutes.login, usuario).pipe(
      tap(() => {
        this.loggedIn = true;
        localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn))
      }),
      catchError(error => {
        console.error('Error during login', error);
        return of(undefined)
      })
    );
  }

  registrar(usuario: UserRegsitro) {
    return this.http.post<Registro>(environment.baseUrl + environment.authEndpoint + authRoutes.registro, usuario)
  }

  estaLoggeado(): boolean {
    return this.loggedIn
  }
}
