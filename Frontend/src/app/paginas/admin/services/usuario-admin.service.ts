import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment, familiaRoutes, usuarioRoutes} from '../../../../environments/environment.development';
import { ResponseGetUsuarios, Usuario, UsuarioPost } from "../interface/admin.interface";


//JaimeRafael
@Injectable({
  providedIn: 'root'
})
export class UsuarioAdminService {

  constructor(private http : HttpClient) { }

  obtenerUsuarios(): Observable<ResponseGetUsuarios>{
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.get<ResponseGetUsuarios>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.usuariobase, {headers})
  }

  desactivarUsuario(id: number){
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.delete<any>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.usuariobase+"/"+id, {headers})
  }

  crearUsuario (usuario: UsuarioPost){
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.post<any>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.usuariobase, usuario, {headers})
  }

  modificarUsuario(id: number, usuario: Usuario){
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.put<any>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.usuariobase+"/"+id, usuario,  {headers})

  }
}
