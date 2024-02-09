import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment, adminRoutes} from '../../../../environments/environment.development';
import {Rol, usuarioRol} from "../interface/rol.interface";
import {usuarioRoutes} from "../../../../environments/environment.development";
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private  http : HttpClient) { }


  obtenerRoles(){
    return this.http.get<Rol[]>(environment.baseUrl+environment.adminEndPoint+adminRoutes.getRoles)
  }

  obtenerRolesUsuario(id: number){
    return this.http.get<Rol[]>(environment.baseUrl+environment.adminEndPoint+adminRoutes.getRolesUsuario+"/"+id)
  }

  addRolUsuario(usuarioRol : usuarioRol){
      return this.http.put(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.addRol, usuarioRol)
  }

  deleteRolUsuario(usuarioRol : usuarioRol){
    return this.http.delete(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.deleteRol, {body: usuarioRol})
  }
}
