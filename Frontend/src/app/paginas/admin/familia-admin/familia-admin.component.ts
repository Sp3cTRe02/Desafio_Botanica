import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { MenuComponent } from '../../../shared/menu/menu.component';
import { FamiliaAdmin, FamiliaPost} from '../interface/admin.interface';
import { FamiliaAdminService } from '../services/familia-admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-familia-admin',
    standalone: true,
    templateUrl: './familia-admin.component.html',
    styleUrl: './familia-admin.component.scss',
    imports: [CommonModule, MenuComponent, TableModule, FormsModule, ToastModule, InputSwitchModule, ReactiveFormsModule],
    providers: [MessageService]
})

/**
 * @David_Trujillo
 */

export class FamiliaAdminComponent {
    familias: FamiliaAdmin[] = []
    familiaSeleccionada: any
    familiaEliminar: any

    familia: FamiliaPost = {
        nombre: ''
    }

    msg: string = '';

    @ViewChild('editar') editar: Table | undefined
    @ViewChild('anadir') anadir: Table | undefined
    @ViewChild('eliminar') eliminar: TemplateRef<any> | undefined

    constructor(private adminService: FamiliaAdminService, private modalService: NgbModal,
        private msgService: MessageService) {
        this.mostrarFamilias()
    }

    mostrarFamilias() {
        this.adminService.obtenerFamiliasAdmin().subscribe((response: any) => {
            if (Array.isArray(response.msg)) {
                this.familias = response.msg;

            }
        })
    }

    anadirFamilias() {
        this.adminService.anadirFamilias(this.familia).subscribe((response: any) => {
            if (response.status = "OK") {
                this.msg = 'Familia registrada exitosamente'
                this.mostrarExito(this.msg)
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
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

    editarFamilia() {
        console.log(this.familiaSeleccionada)
        this.adminService.editarFamilias(this.familiaSeleccionada.id, this.familiaSeleccionada).subscribe((response: any) => {
            if (response.status = "OK") {
                this.msg = 'Familia editada correctamente';
                this.mostrarExito(this.msg)
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        },

            (error) => {
                console.log(error)
                let mensajesError = [];
                for (let i = 0; i < error.error.errors.length; i++) {
                    mensajesError.push(error.error.errors[i].msg);
                }

                this.mostrarError(mensajesError)
            }

        )
    }


    abrirEditar(familia: FamiliaAdmin) {
        this.familiaSeleccionada = familia
        this.modalService.open(this.editar, { ariaLabelledBy: 'modal-basic-title' })
    }


    abrirAnadir() {
        this.modalService.open(this.anadir, { ariaLabelledBy: 'modal-basic-title' })
    }


    abrirEliminar(familia: FamiliaAdmin) {
        this.familiaEliminar = familia
        this.modalService.open(this.eliminar, { ariaLabelledBy: 'modal-basic-title' })
    }

    mostrarExito(msg: string) {
        this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });

    }

    mostrarError(mensajes: string[]) {
        mensajes.forEach((msg) => {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
        });
    }


}
