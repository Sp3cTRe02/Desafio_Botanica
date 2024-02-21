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
    return this.http.get<Rol[]>(environment.baseUrl+environment.adminEndPoint+adminRoutes.getRoles, {params : {auth : true}})
  }

  obtenerRolesUsuario(id: number){
    return this.http.get<Rol[]>(environment.baseUrl+environment.adminEndPoint+adminRoutes.getRolesUsuario+"/"+id, {params : {auth : true}})
  }

  addRolUsuario(usuarioRol : usuarioRol){
    return this.http.put(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.addRol, usuarioRol, {params : {auth : true}})
  }

  deleteRolUsuario(usuarioRol : usuarioRol){
    return this.http.put(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.deleteRol, usuarioRol, {params : {auth : true}})
  }
}
