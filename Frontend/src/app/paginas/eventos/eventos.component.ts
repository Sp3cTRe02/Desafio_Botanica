import { Component } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { EventoGet } from './interfaces/eventos.interface';
import { EventosService } from './services/eventos.service';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-eventos',
    standalone: true,
    templateUrl: './eventos.component.html',
    styleUrl: './eventos.component.scss',
    imports: [CommonModule,MenuComponent,DataViewModule,RouterLink]
})


export class EventosComponent {
    eventos:EventoGet[] = []


    constructor(private eventosService:EventosService){
        this.obtenerEventos()
    }

    obtenerEventos(){
        this.eventosService.getEventos().subscribe((response:any)=>{
            this.eventos = response.data.eventos
        })
    }

    


}
