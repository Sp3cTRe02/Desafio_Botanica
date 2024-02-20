import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { LoginmodalComponent } from "./loginmodal/loginmodal.component";
import { RegistromodalComponent } from "./registromodal/registromodal.component";
import { PerfildropdownComponent } from "./perfildropdown/perfildropdown.component";
import {SubirImagenUsuariosComponent} from "../subir-imagen-usuarios/subir-imagen-usuarios.component";
import { WebSocketService } from '../../paginas/noticias/services/websocket.service';


@Component({
    selector: 'app-menu',
    standalone: true,
    providers: [MessageService],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports: [CommonModule, RouterOutlet,RouterModule, FormsModule, ReactiveFormsModule, MessagesModule, ToastModule, PasswordModule, LoginmodalComponent, RegistromodalComponent, PerfildropdownComponent, SubirImagenUsuariosComponent]
})
export class MenuComponent {
    constructor(private socketService: WebSocketService, private msgService: MessageService) {

    }
    ngOnInit(): void {
        this.socketService.recibirNoticia().subscribe((contenido) => {
            let msg = 'Nueva noticia publicada'
            this.mostrarExito(msg);
        })
    }

    mostrarExito(msg: string) {
        this.msgService.add({ severity: 'success', summary: 'Notificación', detail: msg });

    }
}
