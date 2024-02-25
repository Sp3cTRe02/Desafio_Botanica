import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Map, Marker, NavigationControl, Popup } from 'mapbox-gl';
import { ArbolesGeneralService } from '../services/arboles-general.service';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-arbol-general',
  standalone: true,
  templateUrl: './arbol-general.component.html',
  styleUrl: './arbol-general.component.scss',
  imports: [MenuComponent, GalleriaModule, RouterLink, ButtonModule, DialogModule, FileUploadModule, ToastModule],
  providers: [MessageService]
})

/**
 * @David_Trujillo
 * JaimeRafael
 */

export class ArbolGeneralComponent {
  responsiveOptions: any[] | undefined;
  arbolId: number = 0;
  addImagen: boolean = false;
  rutas : string[] = []


  @ViewChild('mapDiv') mapDivElement!: ElementRef
  ubicaciones: any[] = []

  constructor(private route: ActivatedRoute, private arbolService: ArbolesGeneralService,
              public authService : AuthService, private msgService: MessageService) {
    this.route.params.subscribe(params => {
      this.arbolId = params['id'];
      this.obtenerUbicacionesArbol(this.arbolId)
      this.obtenerRutasArbol(this.arbolId)
      this.rutas.forEach(ruta => {
        console.log(this.obtenerImagenArbol(ruta))
      })
    });
  }
  obtenerUbicacionesArbol(idArbol: number): void {
    this.arbolService.getUbicacionesArbol(idArbol).subscribe((response: any) => {
      this.ubicaciones = response.data.contenido;
      this.agregarMarcadoresAlMapa();
    });
  }

  obtenerRutasArbol(idArbol: number): void {
    this.arbolService.getRutasArbol(idArbol).subscribe((response: any) => {
      this.rutas = response.rutas;
      // console.log(this.rutas)
    });
  }

  obtenerImagenArbol(nombreImagen: string){
    return this.arbolService.getImagenArbol(nombreImagen);
  }
  agregarMarcadoresAlMapa(): void {
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-4.1092017, 38.6928523], //long, lat
      zoom: 15
    });

    this.ubicaciones.forEach(ubicacion => {
      const popup = new Popup().setHTML(`<h6>Arbol</h6>`);
      new Marker({ color: 'green' })
        .setLngLat([ubicacion.longitud, ubicacion.latitud])
        .setPopup(popup)
        .addTo(map);
    });

    map.addControl(new NavigationControl());
  }

  mostrarAddImagen() {
    this.addImagen = true;
  }
  mostrarExito(msg: string) {
    this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
  }

  mostrarError(msg: string) {
    this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
  subirImagenArbol(event: any) {
    const formData = new FormData();
    formData.append('archivo', event.files[0], event.files[0].name);
    this.arbolService.subirImagenArbol(formData, this.arbolId).subscribe((response) => {
      if (response?.status == 'OK') {
        this.mostrarExito('Imagen subida correctamente');
      } else {
        this.mostrarError('Error al subir la imagen');
      }
    })
  }
}

