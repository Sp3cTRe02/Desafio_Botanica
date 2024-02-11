import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArbolRespuesta } from '../interfaces/arboles-general.interface';
import { arbolesRoutes, environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArbolesGeneralService {

  constructor(private http: HttpClient) { }

  getArbolesGeneral(): Observable<ArbolRespuesta>{
    return this.http.get<ArbolRespuesta>(environment.baseUrl+environment.arbolEndpoint+arbolesRoutes.arbolesGeneral)
  }

  
}
