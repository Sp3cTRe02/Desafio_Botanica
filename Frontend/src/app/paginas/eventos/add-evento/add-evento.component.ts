import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { EventosService } from '../services/eventos.service';
import { EventoAdd, EventoPost } from '../interfaces/eventos.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from "primeng/fileupload";
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import { Ubicacion } from '../../arboles-general/interfaces/arboles-general.interface';
import { UbicacionService } from '../../arboles-general/services/ubicacion.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-evento',
  standalone: true,
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.scss',
  imports: [CommonModule, FormsModule, MenuComponent, CalendarModule, FileUploadModule,ToastModule],
  providers: [MessageService]
})

export class AddEventoComponent {

  evento: EventoAdd = {
    idUsuario: 0,
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    cantidadMax: 0,
    latitud: '',
    longitud: '',
    ubicacion: '',
    imagen: '',

  }

  date: Date;
  marcadorActual?: mapboxgl.Marker
  @ViewChild('mapaDiv') mapDivElement!: ElementRef

  lat: number = 0;
  lng: number = 0;
  ciudad: string = ''

  ubicacion: Ubicacion = {
    latitud: this.lat,
    longitud: this.lng,
    ciudad: this.ciudad
  }

  msg: string = '';
  constructor(private eventoService: EventosService, private mapBoxService: UbicacionService,
    private msgService: MessageService) {
    this.date = new Date()
  }

  ngAfterViewInit(): void {
    this.iniciarMapa()
  }
  iniciarMapa() {
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-4.1092017, 38.6928523], //long, lat
      zoom: 15
    })

    map.on('click', (e) => {
      if (this.marcadorActual) {
        this.marcadorActual.remove()
      }

      const coord = e.lngLat
      this.ubicacion.longitud = coord.lng
      this.ubicacion.latitud = coord.lat

      this.marcadorActual = new Marker({ color: 'green' })
        .setLngLat([coord.lng, coord.lat])
        .addTo(map)



      this.mapBoxService.getCiudadMapBox(coord.lat, coord.lng).subscribe((response: any) => {
        let ubicacion = response.features[0].place_name
        this.ubicacion.ciudad = ubicacion
      })
    })
  }



  agregarEvento(event: any) {
    const formData = new FormData()
    formData.append('archivo', event.files[0], event.files[0].name)

    this.evento.ubicacion = this.ubicacion.ciudad

    const dia = this.date.getDate();
    const mes = this.date.getMonth() + 1;
    const año = this.date.getFullYear() % 100;
    const horas = this.date.getHours();
    const minutos = this.date.getMinutes();


    const fechaFormateada = `${this.zeroPad(dia)}/${this.zeroPad(mes)}/${this.zeroPad(año)} ${this.zeroPad(horas)}:${this.zeroPad(minutos)}`;

    this.evento.fechaInicio = fechaFormateada;

    console.log(this.evento.fechaInicio);

    formData.append('nombre', this.evento.nombre)
    formData.append('descripcion', this.evento.descripcion)
    formData.append('fechaInicio', this.evento.fechaInicio?.toString() ?? '')
    formData.append('cantidadMax', this.evento.cantidadMax.toString())
    formData.append('ubicacion', this.evento.ubicacion)


    this.eventoService.anadirEvento(formData).subscribe((response: any) => {
      if (response.success == true) {
        this.msg = 'Evento agregado correctamente'
        this.mostrarExito(this.msg)

        setTimeout(() => {
          window.location.reload()
        }, 1200);
      }
    })

  }

  zeroPad(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  mostrarExito(msg: string) {
    this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });

  }
}
