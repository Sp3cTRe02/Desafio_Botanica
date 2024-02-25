import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContenidoGet, ContenidoPost, ContenidoPut, NoticiaPostRespuesta } from '../interfaces/noticias.interface';
import { Observable } from 'rxjs';
import { contenidoRoutes, environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

/**
 * @David_Trujillo
 */

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

  anadirContenido(formData: FormData) {
    return this.http.post<NoticiaPostRespuesta>(
        environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.contenidoPost,
        formData,
        { params: { auth: 'true' } }
    );
}


  modificarContenido(idNoticia:number,contenido:ContenidoPut){
    return this.http.put<NoticiaPostRespuesta>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.contenidoPut+idNoticia, contenido)
  }
}
