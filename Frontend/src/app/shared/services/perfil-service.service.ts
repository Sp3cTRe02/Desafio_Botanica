import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment, usuarioRoutes} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class PerfilServiceService {

  constructor(private http: HttpClient) { }

  getPerfil(){
    return this.http.get(environment.baseUrl + environment.usuarioEndpoint + usuarioRoutes.getPerfil , {params: {auth : true}})
  }

  updatePerfil(usuario: any){
    return this.http.post(environment.baseUrl + environment.usuarioEndpoint + usuarioRoutes.updatePerfil, usuario, {params: {auth : true}})
  }
}
