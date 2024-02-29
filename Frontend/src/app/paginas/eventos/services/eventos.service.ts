import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoGet } from './../interfaces/eventos.interface';
import { contenidoRoutes, environment, eventosRoutes } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) {}

  getEventos(): Observable<EventoGet> {
    return this.http.get<EventoGet>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.eventoGet)
  }

  getInfoEvento(idEvento:number){
    return this.http.get<EventoGet>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.eventoGet+idEvento)
  }

  getOrganizador(idEvento:number){
    return this.http.get<any>(environment.baseUrl + environment.eventosEndPoint + eventosRoutes.organizador+idEvento)
  }
}
