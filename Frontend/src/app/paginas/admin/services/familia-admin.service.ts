import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FamiliaAdmin, FamiliaPost } from '../interface/admin.interface';
import { environment, familiaRoutes } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FamiliaAdminService {

  constructor(private http: HttpClient) { }


  obtenerFamiliasAdmin(): Observable<FamiliaAdmin[]>{
    return this.http.get<FamiliaAdmin[]>(environment.baseUrl+environment.familiaEndpoint+familiaRoutes.familiaAdmin)
  }

  anadirFamilias(familia:FamiliaPost) {
    return this.http.post<any>(environment.baseUrl+environment.familiaEndpoint+familiaRoutes.familiaPost,familia)
  }
  
}
