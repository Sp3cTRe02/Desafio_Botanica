import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { Map, Marker, NavigationControl, Popup } from 'mapbox-gl';
import { ArbolesGeneralService } from '../services/arboles-general.service';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-arbol-general',
  standalone: true,
  templateUrl: './arbol-general.component.html',
  styleUrl: './arbol-general.component.scss',
  imports: [MenuComponent, GalleriaModule, RouterLink]
})

/**
 * @David_Trujillo
 */

export class ArbolGeneralComponent {
  responsiveOptions: any[] | undefined;
  arbolId: number = 0;

  @ViewChild('mapDiv') mapDivElement!: ElementRef
  ubicaciones: any[] = []

  constructor(private route: ActivatedRoute, private arbolService: ArbolesGeneralService,
              public authService : AuthService) {
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
}

