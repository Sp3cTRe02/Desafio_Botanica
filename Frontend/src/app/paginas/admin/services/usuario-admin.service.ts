import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment,  usuarioRoutes} from '../../../../environments/environment.development';
import { ResponseGetUsuarios, Usuario, UsuarioPost } from "../interface/admin.interface";


//JaimeRafael
@Injectable({
  providedIn: 'root'
})
export class UsuarioAdminService {

  constructor(private http : HttpClient) { }

  obtenerUsuarios(): Observable<ResponseGetUsuarios>{
    return this.http.get<ResponseGetUsuarios>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.usuariobase, {params : {auth : true}})
  }



  crearUsuario (usuario: UsuarioPost){
    return this.http.post<any>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.usuariobase, usuario, {params : {auth : true}})
  }

  modificarUsuario(id: number, usuario: Usuario){
    return this.http.put<any>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.usuariobase+"/"+id, usuario, {params : {auth : true}})

  }
}
