import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../shared/menu/menu.component";
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-inicio',
    standalone: true,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.scss',
    imports: [CommonModule, MenuComponent, FormsModule, QuillModule]
})

export class InicioComponent {

    cabecera: any = ''
    public contenidoInicio: any;

    @ViewChild('editar') editar: Table | undefined

    constructor(private modalService: NgbModal) {

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
}
