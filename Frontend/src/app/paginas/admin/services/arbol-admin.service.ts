import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { arboles, crearArbolResponse, actualizarArbolResponse,  } from '../interface/arbol.interface';
import { environment, arbolesRoutes  } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ArbolesAdminService {

  constructor(private http: HttpClient) { }


  obtenerArbolesAdmin(): Observable<arboles[]>{
    return this.http.get<arboles[]>(environment.baseUrl+environment.arbolesEndPoint+arbolesRoutes.arbolesAdmin)
  }

  anadirArboles(arbol: crearArbolResponse) {
    return this.http.post<any>(environment.baseUrl + environment.arbolesEndPoint + arbolesRoutes.arbolesPost, arbol);
}

  editarArboles(idArbol:number, arbol: actualizarArbolResponse){
    return this.http.put<any>(environment.baseUrl+environment.arbolesEndPoint+arbolesRoutes.arbolesPut+idArbol,arbol)
  }
  
}
