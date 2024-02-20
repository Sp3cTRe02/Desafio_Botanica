import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { arboles, crearArbolResponse, actualizarArbolResponse, ArbolPost } from '../interface/arbol.interface';
import { environment, arbolRoutes  } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ArbolesAdminService {

  constructor(private http: HttpClient) { }

  

  obtenerArbolesAdmin(): Observable<arboles[]>{
    return this.http.get<arboles[]>(environment.baseUrl+environment.arbolesEndPoint+arbolRoutes.arbolesAdmin)
  }

  anadirArboles(arbol: ArbolPost) {
    return this.http.post<any>(environment.baseUrl + environment.arbolesEndPoint + arbolRoutes.arbolesPost, arbol);
}

  editarArboles(idArbol:number, arbol: actualizarArbolResponse){
    return this.http.put<any>(environment.baseUrl+environment.arbolesEndPoint+arbolRoutes.arbolesPut+idArbol,arbol)
  }
  
}
