import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../noticias/services/noticias.service';
import { ContenidoGet, ContenidoPut, InicioGet, InicioPut } from '../noticias/interfaces/noticias.interface';
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
        QuillModule, RouterLink, ToastModule],
    providers: [MessageService]
})

/**
 * @David_Trujillo
 */

export class InicioComponent {

    cont: any = ''

    @ViewChild('editar') editar: Table | undefined

    noticias: ContenidoGet[] = [];
    contenidoInicio: InicioGet = {
        id: 0,
        titulo: '',
        descripcion: '',
        imagen: ''
    }

    inicioEditar: InicioPut = {
        titulo: '',
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
            this.cont = event.html;
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
        this.noticiasService.getContenidoInicio().subscribe((response: any) => {
            this.contenidoInicio = response.data.contenido
    
        });
    }

    modificarContenidoInicio() {
    
        this.inicioEditar.titulo = this.contenidoInicio.titulo;
        this.inicioEditar.descripcion = this.contenidoInicio.descripcion;

        const noticiaId = this.contenidoInicio.id;


        this.noticiasService.modificarContenidoInicio(noticiaId, this.inicioEditar).subscribe((response: any) => {
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