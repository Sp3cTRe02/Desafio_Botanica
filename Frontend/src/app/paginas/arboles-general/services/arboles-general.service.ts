import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArbolRespuesta } from '../interfaces/arboles-general.interface';
import { arbolesRoutes, environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * @David_Trujillo
 */

export class ArbolesGeneralService {

  constructor(private http: HttpClient) { }

  getArbolesGeneral(): Observable<ArbolRespuesta>{
    return this.http.get<ArbolRespuesta>(environment.baseUrl+environment.arbolEndpoint+arbolesRoutes.arbolesGeneral)
  }

  getInformacionArbol(idArbol:number): Observable<ArbolRespuesta>{
    return this.http.get<ArbolRespuesta>(environment.baseUrl + environment.arbolEndpoint + arbolesRoutes.informacionArbol+idArbol)
  }

  getUbicacionesArbol(idArbol:number): Observable<any>{
    return this.http.get<any>(environment.baseUrl + environment.arbolEndpoint + arbolesRoutes.ubicacionesArbol+idArbol)
  }

  
}
