import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment, adminRoutes} from '../../../../environments/environment.development';
import {Rol, usuarioRol} from "../interface/rol.interface";
import {usuarioRoutes} from "../../../../environments/environment.development";
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private  http : HttpClient) { }


  obtenerRoles(){
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.get<Rol[]>(environment.baseUrl+environment.adminEndPoint+adminRoutes.getRoles, {headers})
  }

  obtenerRolesUsuario(id: number){
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.get<Rol[]>(environment.baseUrl+environment.adminEndPoint+adminRoutes.getRolesUsuario+"/"+id, {headers})
  }

  addRolUsuario(usuarioRol : usuarioRol){
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.put(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.addRol, usuarioRol, {headers})
  }

  deleteRolUsuario(usuarioRol : usuarioRol){
    const headers = new HttpHeaders().set('auth', 'true')
    return this.http.put(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.deleteRol, usuarioRol, {headers})
  }
}
