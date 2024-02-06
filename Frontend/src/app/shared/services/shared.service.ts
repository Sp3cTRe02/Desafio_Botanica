import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authRoutes, environment } from '../../../environments/environment.development';
import { Auth, Registro, UserLogin, UserRegsitro } from '../interfaces/auth.interface';
import { catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {}

  login(usuario: UserLogin){
    return this.http.post<Auth>(environment.baseUrl+environment.authEndpoint+authRoutes.login,usuario).pipe(
      catchError(error => {
        console.error('Error during login', error);
        return of(undefined);
      })
    )
  }

  registrar(usuario: UserRegsitro){
    return this.http.post<Registro>(environment.baseUrl+environment.authEndpoint+authRoutes.registro,usuario)
  }
}
