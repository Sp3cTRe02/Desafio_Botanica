import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoticiasService } from '../noticias/services/noticias.service';
import { ContenidoGet } from '../noticias/interfaces/noticias.interface';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss',
    imports: [CommonModule, MenuComponent, FormsModule, 
        QuillModule,RouterLink, ]
})

/**
 * @David_Trujillo
 */

export class InicioComponent {

    cabecera: any = ''
    public contenidoInicio: any;

    @ViewChild('editar') editar: Table | undefined

    nuevaNoticia: any = {};
    noticias: ContenidoGet[] = []

    constructor(private noticiasService: NoticiasService,private modalService: NgbModal,
        public authService: AuthService) {
        this.obtenerUltimasNoticias()
        window.scrollTo(-2, 0)
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


    obtenerUltimasNoticias(){
        this.noticiasService.getUltimasNoticias().subscribe((response:any)=>{
            if(response.success){
                this.noticias = response.data.contenido
                console.log(this.noticias)
            }
        })
    }
    
}
