import {Component, AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
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
import {environment, arbolRoutes} from "../../../../environments/environment.development";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import {Arbol, ArbolInfo} from "../interfaces/arboles-general.interface";

@Component({
  selector: 'app-arbol-general',
  standalone: true,
  templateUrl: './arbol-general.component.html',
  styleUrl: './arbol-general.component.scss',
  imports: [CommonModule, GalleriaModule, DataViewModule , RouterLink, ButtonModule, DialogModule, FileUploadModule, ToastModule,  MenuComponent,FormsModule],
  providers: [MessageService]
})

/**
 * @David_Trujillo
 * @JaimeRafael
 */


export class ArbolGeneralComponent implements OnInit{
  responsiveOptions: any[] | undefined;
  arbolId: number = 0;
  arbol: ArbolInfo ={
    id: 0,
    nombre: '',
    epFloracion: '',
    descripcion: '',
    nombreFam: '',
    foto: ''
  }
  addImagen: boolean = false;
  fotos: any[] = []


  @ViewChild('mapDiv') mapDivElement!: ElementRef
  ubicaciones: any[] = []

  ngOnInit() {
    this.obtenerRutasArbol(this.arbolId)
    this.obtenerDatosArbol(this.arbolId)
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];

  }

  constructor(private route: ActivatedRoute, private arbolService: ArbolesGeneralService,
              public authService : AuthService, private msgService: MessageService) {
    this.route.params.subscribe(params => {
      this.arbolId = params['id'];
      this.obtenerUbicacionesArbol(this.arbolId)


      });

  }


  obtenerUbicacionesArbol(idArbol: number): void {
    this.arbolService.getUbicacionesArbol(idArbol).subscribe((response: any) => {
      this.ubicaciones = response.data.contenido;
      this.agregarMarcadoresAlMapa();
    });
  }

  obtenerDatosArbol(idArbol:number){
    this.arbolService.getInformacionArbol(idArbol).subscribe((response: any) => {
      this.arbol = response.arbol.contenido[0]
      console.log(this.arbol)
    })
  }

  obtenerRutasArbol(idArbol: number): void {
    this.arbolService.getRutasArbol(idArbol).subscribe((response: any) => {
      let id = 1
      response.data.imagenes.forEach(() => {
        let foto = {
          id: id,
          url: response.data.imagenes[id-1]
        }
        this.fotos.push(foto)
        id++
      })
      this.fotos = response.data.imagenes
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

