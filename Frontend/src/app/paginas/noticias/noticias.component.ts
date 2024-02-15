import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { WebSocketService } from './services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-noticias',
    standalone: true,
    templateUrl: './noticias.component.html',
    styleUrl: './noticias.component.scss',
    imports: [MenuComponent, CommonModule, FormsModule],
    providers: [WebSocketService]
})

export class NoticiasComponent implements OnInit {
    nuevaNoticia: any = {};
    noticias: any[] = [];


    constructor(private socketService: WebSocketService) {

    }
    ngOnInit(): void {
        this.socketService.recibirNoticia().subscribe((contenido) => {
            console.log(contenido)
        })
    }

    enviarNoticia(): void {
        this.socketService.enviarNoticia(this.nuevaNoticia);

    }
}

