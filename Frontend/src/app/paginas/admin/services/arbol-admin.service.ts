import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { arboles, crearArbolResponse, actualizarArbolResponse, ArbolPost } from '../interface/arbol.interface';
import { environment, arbolRoutes  } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

//JaimeRafael

export class ArbolesAdminService {

  constructor(private http: HttpClient) { }

  obtenerArbolesAdmin(): Observable<arboles[]>{
    return this.http.get<arboles[]>(environment.baseUrl+environment.arbolesEndPoint+arbolRoutes.arbolesAdmin, {params : {auth : true}})
  }

  anadirArboles(formData: FormData){
    return this.http.post<any>(environment.baseUrl + environment.arbolesEndPoint + arbolRoutes.arbolesPost, formData, {params : {auth : true}});
}

  editarArboles(idArbol:number, formData: FormData){
    return this.http.put<any>(environment.baseUrl+environment.arbolesEndPoint+arbolRoutes.arbolesPut+idArbol,formData, {params : {auth : true}})
  }

}
