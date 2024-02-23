import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {arbolesRoutes, arbolRoutes, environment} from '../../../../environments/environment.development';
import {Ubicacion} from "../interfaces/arboles-general.interface";

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http : HttpClient) { }

  getCiudadMapBox(lat : number, long : number): Observable<any>{
   return this.http.get<any>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${environment.mapBoxToken}`)
  }

  agregarUbicacion(idArbol: number, ubicacion: Ubicacion): Observable<any>{
    return this.http.post<any>(environment.baseUrl + environment.arbolesEndPoint + arbolRoutes.addUbicacion +'/' + idArbol, ubicacion, {params : {auth : true}})
  }
}
