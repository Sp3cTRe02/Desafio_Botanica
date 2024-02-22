import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContenidoGet, ContenidoPost, NoticiaPostRespuesta } from '../interfaces/noticias.interface';
import { Observable } from 'rxjs';
import { contenidoRoutes, environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  constructor(private http: HttpClient) { }

  getContenido(): Observable<ContenidoGet> {
    return this.http.get<ContenidoGet>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.contenidoGet)
  }

  getUltimasNoticias(): Observable<ContenidoGet> {
    return this.http.get<ContenidoGet>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.ultimasNoticiasGet)
  }

  getInfoNoticia(idNoticia:number): Observable<ContenidoGet>{
    return this.http.get<ContenidoGet>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.contenidoGet+idNoticia)
  }

  anadirContenido(contenido: ContenidoPost) {
    return this.http.post<NoticiaPostRespuesta>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.contenidoPost, contenido, {params : {auth : true}})
  }



}
