import { Component } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { EventoGet } from '../interfaces/eventos.interface';
import { EventosService } from '../services/eventos.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-evento',
    standalone: true,
    templateUrl: './evento.component.html',
    styleUrl: './evento.component.scss',
    imports: [MenuComponent]
})
export class EventoComponent {
    evento: EventoGet = {
        id: 0,
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        cantidadMax: 0,
        latitud: 0,
        longitud: 0,
        ubicacion: 0,
        imagen: null
    }

    eventoId: number = 0
    organizador = {
        nombre: "",
        ap1: "",
        ap2: ""
    }

    plazasRestantes: number = 0

    constructor(private eventosService: EventosService, private route: ActivatedRoute,
        private router: Router) {
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd)
        ).subscribe(() => {
            window.scrollTo(0, 0);
            this.eventoId = this.route.snapshot.params['id'];
            this.obtenerInfoEvento(this.eventoId)
            this.obtenerOrganizador(this.eventoId)
            this.obtenerPlazas(this.eventoId)
        })

    }

    obtenerInfoEvento(idEvento: number) {
        this.eventosService.getInfoEvento(idEvento).subscribe((response: any) => {
            this.evento = response.data.evento
        })
    }

    obtenerOrganizador(idEvento: number) {
        this.eventosService.getOrganizador(idEvento).subscribe((response: any) => {
            const data = response.data.organizador[0];
            this.organizador.nombre = data.nombre;
            this.organizador.ap1 = data.ap1;
            this.organizador.ap2 = data.ap2

        })
    }

    obtenerPlazas(idEvento: number) {
        this.eventosService.getPlazasRestantes(idEvento).subscribe((response: any) => {
            this.plazasRestantes = response.data.plazasRestantes

        })
    }

    descargarPDF() {
        this.eventosService.descargarPDF().subscribe((response: HttpResponse<Blob>) => {
            const contentDisposition = response.headers.get('content-disposition');
            let matches = null;
            if (contentDisposition) {
                matches = /filename="?([^"\\]+)"?/.exec(contentDisposition);
            }
            const nombreArchivo = matches && matches.length > 1 ? matches[1] : 'detalles-del-ticket.pdf';

            const blob = response.body as Blob;
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.download = nombreArchivo;
            enlaceDescarga.href = window.URL.createObjectURL(blob);
            enlaceDescarga.click();
        });
    }


}
