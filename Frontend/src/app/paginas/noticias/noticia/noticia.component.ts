import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../../shared/menu/menu.component";
import { NoticiasService } from '../services/noticias.service';
import { ContenidoGet, ContenidoPut } from '../interfaces/noticias.interface';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { FileUploadModule } from "primeng/fileupload";


@Component({
    selector: 'app-noticia',
    standalone: true,
    templateUrl: './noticia.component.html',
    styleUrl: './noticia.component.scss',
    imports: [MenuComponent, CommonModule, FormsModule, QuillModule, ToastModule,
    FileUploadModule],
    providers: [MessageService]
})

/**
 * @David_Trujillo
 */

export class NoticiaComponent implements OnInit{
    noticia: ContenidoGet = {
        id: 0,
        id_usuario: 0,
        titulo: '',
        resumen_desc: '',
        descripcion: '',
        imagen: null
    }

    noticiaEditar: ContenidoPut = {
        titulo: '',
        resumen_desc: '',
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
        private msgService: MessageService,public authService: AuthService) {
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


    }

    alternarModoEdicion() {
        this.modoEdicion = !this.modoEdicion;
    }

    modificarContenido(event:any) {
        const formData = new FormData()

        if(event.files[0] == null){
            formData.append('archivo', 'null')
        }else {
           formData.append('archivo', event.files[0], event.files[0].name);
        }


        this.noticiaEditar.titulo = this.noticia.titulo
        this.noticiaEditar.resumen_desc = this.noticia.resumen_desc
        this.noticiaEditar.descripcion = this.noticia.descripcion


        formData.append('titulo',this.noticiaEditar.titulo)
        formData.append('resumen_desc',this.noticiaEditar.resumen_desc)
        formData.append('descripcion',this.noticiaEditar.descripcion)


        this.noticiasService.modificarContenido(this.noticiaId, formData).subscribe((response: any) => {
            if (response.success) {
                this.msg = 'Noticia modificada correctamente'
                this.mostrarExito(this.msg)

                setTimeout(() => {
                    window.location.reload()
                }, 1000)

            }
        })
    }

    mostrarExito(msg: string) {
        this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    }


}
