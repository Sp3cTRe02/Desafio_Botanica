import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../noticias/services/noticias.service';
import { ContenidoGet, ContenidoPut } from '../noticias/interfaces/noticias.interface';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss',
    imports: [CommonModule, MenuComponent, FormsModule,
        QuillModule, RouterLink,ToastModule],
    providers: [MessageService]
})

/**
 * @David_Trujillo
 */

export class InicioComponent {

    cabecera: any = ''
    public contenidoInicio: any;

    @ViewChild('editar') editar: Table | undefined

    nuevaNoticia: any = {};
    noticias: ContenidoGet[] = [];
    noticia: ContenidoGet[] = [];

    noticiaEditar: ContenidoPut = {
        titulo: '',
        resumenDesc: '',
        descripcion: ''
    }

    msg: string = '';

    constructor(private noticiasService: NoticiasService, private modalService: NgbModal,
        public authService: AuthService, private msgService: MessageService) {
        this.obtenerUltimasNoticias();
        this.obtenerContenido();
        window.scrollTo(-2, 0);
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

    onChangedEditor(event: any): void {
        if (event.html) {
            this.contenidoInicio = event.html;
        }
    }

    abrirEditar() {
        this.modalService.open(this.editar, { ariaLabelledBy: 'modal-basic-title' })
    }


    obtenerUltimasNoticias() {
        this.noticiasService.getUltimasNoticias().subscribe((response: any) => {
            if (response.success) {
                this.noticias = response.data.contenido
            }
        })
    }


    obtenerContenido() {
        this.noticiasService.getContenido().subscribe((response: any) => {
            if (response.success && response.data.contenido.length > 0) {
                const indiceNoticia = 0;
                this.noticia = [response.data.contenido[indiceNoticia]];
            }
        });
    }

    modificarContenido() {
        if (!this.noticia[0]) {
            console.error('No se puede modificar la noticia porque no está definida.');
            return;
        }

        this.noticiaEditar.titulo = this.noticia[0].titulo;
        this.noticiaEditar.resumenDesc = this.noticia[0].resumenDesc;
        this.noticiaEditar.descripcion = this.noticia[0].descripcion;

        const noticiaId = this.noticia[0].id;

        this.noticiasService.modificarContenido(noticiaId, this.noticiaEditar).subscribe((response: any) => {
            if (response.success) {
                this.msg = 'Contenido modificado correctamente'
                this.mostrarExito(this.msg)

                setTimeout(() => {
                    window.location.reload()
                }, 1200)
            }
        })
    }

    mostrarExito(msg: string) {
        this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    }
}