import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MenuComponent} from "../../../shared/menu/menu.component";
import { Map, Marker, NavigationControl, Popup } from 'mapbox-gl';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-ubicacion',
  standalone: true,
  imports: [MenuComponent, ],
  templateUrl: './add-ubicacion.component.html',
  styleUrl: './add-ubicacion.component.scss'
})
export class AddUbicacionComponent implements AfterViewInit{

  arbolId: number = 0;

  @ViewChild('mapaDiv') mapDivElement!: ElementRef
  ubicaciones: any[] = []

  constructor(private route:  ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.arbolId = params['id']
    });
  }

  ngAfterViewInit(): void {
    console.log(this.mapDivElement)
    this.iniciarMapa()
  }
  iniciarMapa() {
    const map = new Map({
      container : this.mapDivElement.nativeElement
    })
  }
}
