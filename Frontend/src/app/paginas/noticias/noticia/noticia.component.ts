import { Component } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { NoticiasService } from '../services/noticias.service';
import { ContenidoGet } from '../interfaces/noticias.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-noticia',
    standalone: true,
    templateUrl: './noticia.component.html',
    styleUrl: './noticia.component.scss',
    imports: [MenuComponent,CommonModule,FormsModule]
})
export class NoticiaComponent {
    noticia: ContenidoGet = {
        id: 0,
        idUsuario: 0,
        titulo: '',
        resumenDesc: '',
        descripcion: '',
        imagen: null
    }

    modoEdicion: boolean = false


    constructor(private noticiasService: NoticiasService, private route: ActivatedRoute, private router: Router) {
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd)
        ).subscribe(() => {
            window.scrollTo(0, 0);
            const arbolId = this.route.snapshot.params['id'];
            this.obtenerInfoNoticia(arbolId);
        });
    }

    obtenerInfoNoticia(idNoticia: number) {
        this.noticiasService.getInfoNoticia(idNoticia).subscribe((response: any) => {
            this.noticia = response.data.contenido
        })
    }

    toggleModoEdicion() {
        this.modoEdicion = !this.modoEdicion;
      }
}
