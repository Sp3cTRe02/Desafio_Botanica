import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MenuComponent} from "../../../shared/menu/menu.component";
import mapboxgl, {Map, Marker} from 'mapbox-gl';
import {ActivatedRoute, Router} from "@angular/router";
import {UbicacionService} from "../services/ubicacion.service";
import {Ubicacion} from "../interfaces/arboles-general.interface";
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-add-ubicacion',
  standalone: true,
  imports: [MenuComponent, ToastModule],
  templateUrl: './add-ubicacion.component.html',
  styleUrl: './add-ubicacion.component.scss',
  providers: [MessageService]
})
//JaimeRafael
export class AddUbicacionComponent implements AfterViewInit{

  arbolId: number = 0;
  lat: number = 0;
  lng: number = 0;
  ciudad: string = ''

  ubicacion: Ubicacion = {
    latitud : this.lat,
    longitud : this.lng,
    ciudad : this.ciudad
  }

  marcadorActual?: mapboxgl.Marker

  @ViewChild('mapaDiv') mapDivElement!: ElementRef
  ubicaciones: any[] = []

  constructor(private route:  ActivatedRoute, private mapBoxService : UbicacionService,
        private router : Router, private msgService: MessageService) {
    this.route.params.subscribe(params => {
      this.arbolId = params['id']
    });
  }

  ngAfterViewInit(): void {
    this.iniciarMapa()
  }
  iniciarMapa() {
    const map = new Map({
      container : this.mapDivElement.nativeElement,
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

      this.marcadorActual = new Marker({color: 'green'})
        .setLngLat([coord.lng, coord.lat])
        .addTo(map)

      this.mapBoxService.getCiudadMapBox(coord.lat, coord.lng).subscribe((response: any) => {
        let ubicacion = response.features[0].place_name
        let sitio = ubicacion.split(',')
        let ciudad = this.extraerCiudad(sitio[1])
        this.ubicacion.ciudad = ciudad
      })
    })
  }

  extraerCiudad(ciudad : string){
    const regex = /\d+\s+(.*)/;
    const resultado = ciudad.match(regex);
    if (resultado && resultado.length > 1) {
      return resultado[1];
    } else {
      return '';
    }
  }

  agregarUbicacion(){
    this.mapBoxService.agregarUbicacion(this.arbolId, this.ubicacion).subscribe((response: any) => {
      if(response.status === "OK"){
        this.mostrarConfirmacion()
        setTimeout(() => {
          this.router.navigate(['/arboles', this.arbolId])
        }, 2000);
      }
    },
    (error) => {
      let mensajesError = [];
                if (error.error && error.error.errors) {
                    for (let i = 0; i < error.error.errors.length; i++) {
                        mensajesError.push(error.error.errors[i].msg);
                    }
                }

                this.mostrarError(mensajesError)
    }
    )
    
  }
  
  mostrarConfirmacion() {
    this.msgService.add({severity:'success', summary: 'Ubicación', detail: 'Ubicación agregada con éxito'});
  }

  
  mostrarError(mensajes: string[]) {
    mensajes.forEach((msg) => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
    });
  }
}
