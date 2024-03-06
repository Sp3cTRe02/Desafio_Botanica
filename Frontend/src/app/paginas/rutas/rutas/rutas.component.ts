import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MenuComponent} from "../../../shared/menu/menu.component";
import mapboxgl from "mapbox-gl";
import {RutasService} from "../services/rutas.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [MenuComponent, ToastModule],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.scss',
  providers: [MessageService]
})
export class RutasComponent implements AfterViewInit{

  customUbication: boolean = false;
  ubicacionRuta: any = {
    lat: 0,
    lng: 0
  }
  radio: number = 1


  marcadorActual?: mapboxgl.Marker

  @ViewChild('mapaDiv') mapDivElement!: ElementRef
  ubicaciones: any[] = []


  constructor(private rutaService : RutasService, private messageService: MessageService) {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    this.iniciarMapa()
  }

  activarCustom(){
    this.customUbication = true
  }

  obtenerUbicacionUsuario(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.ubicacionRuta.lat = position.coords.latitude
      this.ubicacionRuta.lng = position.coords.longitude
      this.marcadorActual = this.ubicacionRuta
      this.obtenerRuta()
    })
  }

  actualizarRadio(event: any){
    this.radio = event.target.value


  }

  iniciarMapa() {
    const map = new mapboxgl.Map({
      container : this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-4.1092017, 38.6928523], //long, lat
      zoom: 13
    })




    map.on('click', (e) => {
      if (this.marcadorActual) {
        this.marcadorActual.remove()
      }

      const coord = e.lngLat
      this.ubicacionRuta.lng = coord.lng
      this.ubicacionRuta.lat = coord.lat
      this.marcadorActual = new mapboxgl.Marker({color: 'red'})
        .setLngLat([coord.lng, coord.lat])
        .addTo(map)
    })
  }

  obtenerRuta(){
    if(this.ubicacionRuta.lat == 0 || this.ubicacionRuta.lng == 0){
      this.mostrarError()
    }else {
      this.rutaService.getRutaArboles(this.ubicacionRuta.lat, this.ubicacionRuta.lng, this.radio).subscribe((response: any) => {
        this.ubicaciones= response.ubicaciones
        this.agregarMarcadoresAlMapa()
      })
    }

  }



  agregarMarcadoresAlMapa(): void {
    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [this.ubicacionRuta.lng, this.ubicacionRuta.lat], //long, lat
      zoom: 15
    });

    map.on('load', () => {
      map.resize();
      const popupAct = new mapboxgl.Popup().setHTML(`<h6>Tú</h6>`);
      const marcaUsuario = new mapboxgl.Marker({color: 'blue'})
        .setLngLat([this.ubicacionRuta.lng, this.ubicacionRuta.lat])
        .setPopup(popupAct)
        .addTo(map)
    })

    map.on('click', (e) => {
      if (this.marcadorActual) {
        this.marcadorActual.remove()
      }

      const coord = e.lngLat
      this.ubicacionRuta.lng = coord.lng
      this.ubicacionRuta.lat = coord.lat
      this.marcadorActual = new mapboxgl.Marker({color: 'red'})
        .setLngLat([coord.lng, coord.lat])
        .addTo(map)
    })

    this.ubicaciones.forEach(ubicacion => {
      const popup = new mapboxgl.Popup().setHTML(`<h6>Arbol</h6>`);
      new mapboxgl.Marker({ color: 'green' })
        .setLngLat([ubicacion.longitud, ubicacion.latitud])
        .setPopup(popup)
        .addTo(map);
    });

    map.addControl(new mapboxgl.NavigationControl());
  }

  mostrarError(){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha seleccionado una ubicación'})
  }


}
