import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { EventoGet, EventoPost, EventoPut } from '../interfaces/eventos.interface';
import { EventosService } from '../services/eventos.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { FileUploadModule } from "primeng/fileupload";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpResponse } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-evento',
    standalone: true,
    templateUrl: './evento.component.html',
    styleUrl: './evento.component.scss',
    imports: [CommonModule, MenuComponent, FormsModule, FileUploadModule,
        ToastModule, QuillModule],
    providers: [MessageService]
})
export class EventoComponent {
    evento: EventoGet = {
        id: 0,
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        cantidad_max: 0,
        latitud: 0,
        longitud: 0,
        ubicacion: 0,
        imagen: null
    }

    eventoId: number = 0
    organizador = {
        nombre: "",
        ap1: "",
        ap2: ""
    }

    eventoEditar: EventoPut = {
        nombre: '',
        descripcion: '',
        cantidad_max: 0
    }

    eventoPost: EventoPost = {
        cantidad_entradas: 0
    }

    plazas_restantes: number = 0
    modoEdicion: boolean = false
    msg: string = '';
    eventoControl = new FormControl()

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

    editar: boolean = true
    esMiEvento : boolean = true
    @ViewChild('miModal') miModal: TemplateRef<any> | undefined;


    constructor(private eventosService: EventosService, private route: ActivatedRoute,
        private router: Router, private msgService: MessageService, public authService: AuthService,
        private modalService: NgbModal) {
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd)
        ).subscribe(() => {
            window.scrollTo(0, 0);
            this.eventoId = this.route.snapshot.params['id'];
            this.obtenerInfoEvento(this.eventoId)
            this.obtenerOrganizador(this.eventoId)
            this.obtenerPlazas(this.eventoId)
            this.puedeEditar()
        })

    }

    obtenerInfoEvento(idEvento: number) {
        this.eventosService.getInfoEvento(idEvento).subscribe((response: any) => {
            this.evento = response.data.evento
        })
    }

    obtenerOrganizador(idEvento: number) {
        this.eventosService.getOrganizador(idEvento).subscribe((response: any) => {
            const data = response.data.organizador[0];
            this.organizador.nombre = data.nombre;
            this.organizador.ap1 = data.ap1;
            this.organizador.ap2 = data.ap2
        })
    }

    obtenerPlazas(idEvento: number) {
        this.eventosService.getPlazasRestantes(idEvento).subscribe((response: any) => {
            this.plazas_restantes = response.data.plazasRestantes
        })
    }

    alternarModoEdicion() {
        this.modoEdicion = !this.modoEdicion;
    }

    modificarEvento(event: any) {
        const formData = new FormData()
        if (event.files[0] == null) {
            formData.append('archivo', 'null')
        } else {
            formData.append('archivo', event.files[0], event.files[0].name);
        }

        this.eventoEditar.nombre = this.evento.nombre
        this.eventoEditar.descripcion = this.evento.descripcion
        this.eventoEditar.cantidad_max = this.evento.cantidad_max

        formData.append('nombre', this.eventoEditar.nombre)
        formData.append('descripcion', this.eventoEditar.descripcion)
        formData.append('cantidad_max',this.eventoEditar.cantidad_max.toString())

        this.eventosService.modificarEvento(this.eventoId, formData).subscribe((response: any) => {
            if (response.success) {
                this.msg = 'Evento modificado correctamente'
                this.mostrarExito(this.msg)

                setTimeout(() => {
                    window.location.reload()
                }, 1000)

            }
        })
    }

    onChangedEditor(event: any): void {
        if (event.html) {
            this.eventoControl.setValue(event.html);
        }


    }

    descargarPDF() {
        this.eventosService.descargarPDF().subscribe((response: HttpResponse<Blob>) => {
            const contentDisposition = response.headers.get('content-disposition');
            let matches = null;
            if (contentDisposition) {
                matches = /filename="?([^"\\]+)"?/.exec(contentDisposition);
            }
            const nombreArchivo = matches && matches.length > 1 ? matches[1] : 'detalles-del-ticket.pdf';

            const blob = response.body as Blob;
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.download = nombreArchivo;
            enlaceDescarga.href = window.URL.createObjectURL(blob);
            enlaceDescarga.click();
            this.modalService.dismissAll()
            window.location.reload()
        });
    }

    mostrarExito(msg: string) {
        this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    }


    puedeEditar() {
        this.eventosService.getMisEventos().subscribe((response: any) => {
            const misEventos = response.data.eventos;

            this.editar = false;
            this.esMiEvento = false

            for (let i = 0; i < misEventos.length; i++) {
                if (misEventos[i].id == this.eventoId) {
                    if (!this.editar) {
                        this.editar = true;
                        this.esMiEvento=true

                    }
                }
            }
        });

    }

    participarEvento() {
        this.eventosService.participarEvento(this.eventoId, this.eventoPost).subscribe((response: any) => {
            if (response.success) {
                this.msg = 'Inscripción realizada con éxito';
                this.mostrarExito(this.msg);
                this.eventoPost.cantidad_entradas = null;
                this.showModal()
            }else{

            }
        }, (error) => {
            this.mostrarError(error.error.data.msg);
            this.eventoPost.cantidad_entradas = null;
        });

    }

    showModal() {
        this.modalService.open(this.miModal, { ariaLabelledBy: 'modal-basic-title' })
    }

    mostrarError(msg: string) {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
    }

}
