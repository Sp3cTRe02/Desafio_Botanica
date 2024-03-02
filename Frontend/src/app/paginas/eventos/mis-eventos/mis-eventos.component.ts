import { Component } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { RouterLink } from '@angular/router';
import { EventoGet } from '../interfaces/eventos.interface';
import { EventosService } from '../services/eventos.service';

@Component({
    selector: 'app-mis-eventos',
    standalone: true,
    templateUrl: './mis-eventos.component.html',
    styleUrl: './mis-eventos.component.scss',
    imports: [CommonModule,MenuComponent,DataViewModule,RouterLink]
})
export class MisEventosComponent {
    misEventos: any [] = []

    constructor(private eventosService:EventosService){
        this.obtenerMisEventos()
    }

    obtenerMisEventos(){
        this.eventosService.getMisEventos().subscribe((response:any)=>{
            this.misEventos = response.data.eventos
        })
    }
}
