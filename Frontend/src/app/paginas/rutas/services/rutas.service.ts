import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment, arbolRoutes} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http : HttpClient) { }

  getRutaArboles(latitud  : number, longitud : number, radio  : number){
    return this.http.post(environment.baseUrl + environment.arbolesEndPoint + arbolRoutes.rutasArbol,
      {
        latitud: latitud,
        longitud: longitud,
        radio: radio
      })
  }
}
