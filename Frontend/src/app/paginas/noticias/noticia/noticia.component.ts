import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { NoticiasService } from '../services/noticias.service';
import { ContenidoGet, ContenidoPost, ContenidoPut } from '../interfaces/noticias.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-noticia',
    standalone: true,
    templateUrl: './noticia.component.html',
    styleUrl: './noticia.component.scss',
    imports: [MenuComponent, CommonModule, FormsModule, QuillModule, ToastModule],
    providers: [MessageService]
})
export class NoticiaComponent implements OnInit{
    noticia: ContenidoGet = {
        id: 0,
        idUsuario: 0,
        titulo: '',
        resumenDesc: '',
        descripcion: '',
        imagen: null
    }

    noticiaEditar: ContenidoPut = {
        titulo: '',
        resumenDesc: '',
        descripcion: ''
    }

    public modulesQuill = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ align: [] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
        ]
    }

    modoEdicion: boolean = false
    noticiaId: number = 0
    msg: string = '';
    contenidoControl = new FormControl()

    constructor(private noticiasService: NoticiasService, private route: ActivatedRoute, private router: Router,
        private msgService: MessageService) {
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd)
        ).subscribe(() => {
            window.scrollTo(0, 0);
            this.noticiaId = this.route.snapshot.params['id'];
            this.obtenerInfoNoticia(this.noticiaId);
        });
    }


    ngOnInit(): void {
        this.contenidoControl.setValue(this.noticia.descripcion);
    }

    obtenerInfoNoticia(idNoticia: number) {
        this.noticiasService.getInfoNoticia(idNoticia).subscribe((response: any) => {
            this.noticia = response.data.contenido
        })
    }

    onChangedEditor(event: any): void {
        if (event.html) {
            this.contenidoControl.setValue(event.html);
        }

        console.log(this.noticia.descripcion)

    }

    alternarModoEdicion() {
        this.modoEdicion = !this.modoEdicion;
    }

    modificarContenido() {
        this.noticiaEditar.titulo = this.noticia.titulo
        this.noticiaEditar.resumenDesc = this.noticia.resumenDesc
        this.noticiaEditar.descripcion = this.noticia.descripcion

        this.noticiasService.modificarContenido(this.noticiaId, this.noticiaEditar).subscribe((response: any) => {
            console.log(response.success)
            if (response.success = true) {
                console.log('pasa')
                this.msg = 'Noticia modificada correctamente'
                this.mostrarExito(this.msg)
                window.location.reload()
            }
        })
    }

    mostrarExito(msg: string) {
        this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    }


}
