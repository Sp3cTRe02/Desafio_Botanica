import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment, usuarioRoutes } from "../../../environments/environment.development";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubirImagenUsuariosService {

  constructor(private http: HttpClient) { }

  subirImagen(archivo: FormData){
    return this.http.post<any>(environment.baseUrl+environment.usuarioEndpoint+usuarioRoutes.subirImagen, archivo, {params : {auth : true}})
      .pipe(
        catchError(error => {
          console.error('Error during upload image', error);
          return error;
        })
      )
  }
}
