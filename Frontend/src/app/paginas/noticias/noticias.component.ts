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


@Component({
    selector: 'app-noticias',
    standalone: true,
    templateUrl: './noticias.component.html',
    styleUrl: './noticias.component.scss',
    imports: [MenuComponent, CommonModule, FormsModule, QuillModule, DataViewModule, RouterLink, ToastModule],
    providers: [WebSocketService, MessageService]
})

/**
 * @David_Trujillo
 */

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

    enviarNoticia(): void {
        this.socketService.enviarNoticia(this.noticia);
        this.anadirContenido()
    }


    obtenerContenido() {
        this.noticiasService.getContenido().subscribe((response: any) => {
            this.noticias = response.data.contenido
        })
    }

    anadirContenido() {
        this.noticiasService.anadirContenido(this.noticia).subscribe((response: any) => {
         
            if (response.success = true) {
                this.msg = 'Noticia agregada correctamente'
                this.mostrarExito(this.msg)
            }
        },
            (error) => {
                let mensajesError = [];
                for (let i = 0; i < error.error.errors.length; i++) {
                    mensajesError.push(error.error.errors[i].msg);
                }

                this.mostrarError(mensajesError)
            })
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

