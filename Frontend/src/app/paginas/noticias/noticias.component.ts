import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { WebSocketService } from './services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { NoticiasService } from './services/noticias.service';
import { ContenidoGet, ContenidoPost } from './interfaces/noticias.interface';
import { DataViewModule } from 'primeng/dataview';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../shared/services/auth.service';
import { FileUploadModule } from "primeng/fileupload";


@Component({
    selector: 'app-noticias',
    standalone: true,
    templateUrl: './noticias.component.html',
    styleUrl: './noticias.component.scss',
    imports: [MenuComponent, CommonModule, FormsModule, QuillModule, DataViewModule, RouterLink, ToastModule, FileUploadModule],
    providers: [WebSocketService, MessageService]
})

/**
 * @David_Trujillo
 */

// Jaime ha solucionado bug de WebSocket


export class NoticiasComponent implements OnInit {
    noticias: ContenidoGet[] = []

    cabecera: any = ''
    contenido: any

    noticia: ContenidoPost = {
        idUsuario: 1,
        titulo: '',
        resumenDesc: '',
        descripcion: '',
        imagen: null,

    }

    msg: string = '';
    archivoSubido: any[] = []


    @ViewChild('agregar') agregar: Table | undefined


    constructor(private noticiasService: NoticiasService, private socketService: WebSocketService,
        private modalService: NgbModal, private primengConfig: PrimeNGConfig,
        private msgService: MessageService, public authService: AuthService) {

        this.obtenerContenido()
        this.primengConfig.ripple = true

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

    ngOnInit(): void {
        this.socketService.recibirNoticia().subscribe((contenido) => {
            console.log(contenido)
        })
    }

    abrirAgregar() {
        this.modalService.open(this.agregar, { ariaLabelledBy: 'modal-basic-title' })
        this.cabecera = ''
        this.contenido = ''
    }

    onChangedEditor(event: any): void {
        if (event.html) {
            this.noticia.descripcion = event.html;
        }

        console.log(this.noticia.descripcion)

    }


    obtenerContenido() {
        this.noticiasService.getContenido().subscribe((response: any) => {
            this.noticias = response.data.contenido
            console.log(this.noticias)
        })
    }

    anadirContenido(event:any) {

        const formData = new FormData();
        formData.append('archivo', event.files[0], event.files[0].name);
        this.archivoSubido.push(formData);

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        formData.append('titulo', this.noticia.titulo);
        formData.append('resumenDesc', this.noticia.resumenDesc);
        formData.append('descripcion', this.noticia.descripcion);
        formData.append('archivo', event.files[0], event.files[0].name);


        this.noticiasService.anadirContenido(formData).subscribe((response: any) => {
            if (response.success == true) {
                this.msg = 'Noticia agregada correctamente'
                this.mostrarExito(this.msg)
            }
        })


        this.socketService.enviarNoticia(this.noticia);
    }


    mostrarExito(msg: string) {
        this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    }

    mostrarError(mensajes: string[]) {
        console.log(mensajes)
        mensajes.forEach((msg) => {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
    }

}

