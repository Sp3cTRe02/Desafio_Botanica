import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FamiliaAdmin, FamiliaPost, FamiliaPut } from '../interface/admin.interface';
import { environment, familiaRoutes } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

/**
 * @David_Trujillo
 */

export class FamiliaAdminService {

  constructor(private http: HttpClient) { }


  obtenerFamiliasAdmin(): Observable<FamiliaAdmin[]>{
    return this.http.get<FamiliaAdmin[]>(environment.baseUrl+environment.familiaEndpoint+familiaRoutes.familiaAdmin)
  }

  obtenerFamilias(): Observable<FamiliaAdmin[]>{
    return this.http.get<FamiliaAdmin[]>(environment.baseUrl+environment.familiaEndpoint+familiaRoutes.familias, {params : {auth : true}})
  }
  anadirFamilias(familia:FamiliaPost) {
    return this.http.post<any>(environment.baseUrl+environment.familiaEndpoint+familiaRoutes.familiaPost,familia, {params : {auth : true}})
  }

  editarFamilias(idFamilia:number, familia: FamiliaPut){
    return this.http.put<any>(environment.baseUrl+environment.familiaEndpoint+familiaRoutes.familiaPost+idFamilia,familia, {params : {auth : true}})
  }

}
