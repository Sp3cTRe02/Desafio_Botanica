import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket
  
  constructor() {
    this.socket = io('http://localhost:8090');
  }
  
  enviarNoticia(postData: any): void {
    this.socket.emit('crear-contenido', postData);
  }

  recibirNoticia(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('nuevo-contenido', (data) => {
        observer.next(data);
      });
    });
  }

}