import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoGet } from './../interfaces/eventos.interface';
import { contenidoRoutes, environment, eventosRoutes } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { }

  getEventos(): Observable<EventoGet> {
    return this.http.get<EventoGet>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.eventoGet)
  }

  getMisEventos(): Observable<any>{
    return this.http.get<any>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.misEventos, {params : {auth : true}})
  }

  getInfoEvento(idEvento: number) {
    return this.http.get<EventoGet>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.eventoGet + idEvento)
  }

  getOrganizador(idEvento: number) {
    return this.http.get<any>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.organizador + idEvento)
  }

  getPlazasRestantes(idEvento: number) {
    return this.http.get<any>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.plazas + idEvento)
  }

  descargarPDF(): Observable<HttpResponse<Blob>> {
    return this.http.get('http://localhost:9090/api/eventos/pdf/descargar-pdf', {
      responseType: 'blob',
      observe: 'response' 
    });
  }

  modificarEvento(idEvento:number,formData:FormData){
    return this.http.put<any>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.eventoPut+idEvento, formData,  { params: { auth: 'true' } })
  }


}
