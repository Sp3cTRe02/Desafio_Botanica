import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContenidoGet, ContenidoPost, ContenidoPut, InicioPut, NoticiaPostRespuesta } from '../interfaces/noticias.interface';
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


  getContenidoInicio(): Observable<ContenidoGet> {
    return this.http.get<ContenidoGet>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.infoInicio)
  }

  modificarContenidoInicio(idNoticia:number,contenido:InicioPut){
    return this.http.put<NoticiaPostRespuesta>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.inicioPut+idNoticia, contenido )
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

  modificarContenido(idNoticia:number,formData:FormData){
    return this.http.put<NoticiaPostRespuesta>(environment.baseUrl + environment.contenidoEndPoint + contenidoRoutes.contenidoPut+idNoticia, formData,  { params: { auth: 'true' } })
  }
}
