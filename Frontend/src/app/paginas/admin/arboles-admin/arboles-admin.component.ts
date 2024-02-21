import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { MenuComponent } from '../../../shared/menu/menu.component';
import { arboles, crearArbolResponse, actualizarArbolResponse, ArbolPost} from '../interface/arbol.interface';
import { ArbolesAdminService } from '../services/arbol-admin.service';
import { FamiliaAdminService } from '../services/familia-admin.service';
import { FamiliaAdmin } from '../interface/admin.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-arboles-admin',
    standalone: true,
    templateUrl: './arboles-admin.component.html',
    styleUrl: './arboles-admin.component.scss',
    imports: [CommonModule, MenuComponent, TableModule, FormsModule, ToastModule,InputSwitchModule,ReactiveFormsModule],
    providers: [MessageService]
})
//JaimeRafael select para las familias y corregir añadirFamilias
export class ArbolesAdminComponent {
    arboles: arboles[] = []
    arbolSeccionado: any
    arbolEliminar: any

    arbol: ArbolPost = {
        idFamilia: 0,
        nombre: '',
        epFloracion: '',
        descripcion: '',
        desactivado:false,
    }

    arbolPut: actualizarArbolResponse = {
        id: 3,
        idFamilia: 3,
        epFloracion: '',
        descripcion: '',
        desactivado:false,
        nombre: '',
        estado: 3
    }
    Familias : FamiliaAdmin[] = []

    msg: string = '';

    @ViewChild('editar') editar: Table | undefined
    @ViewChild('anadir') anadir: Table | undefined
    @ViewChild('eliminar') eliminar: TemplateRef<any> | undefined

constructor(private adminService: ArbolesAdminService, private modalService: NgbModal,
    private msgService: MessageService, private familiaService : FamiliaAdminService) {
    this.mostrarArboles()
    this.cargarFamilias()
    }

    mostrarArboles() {
    this.adminService.obtenerArbolesAdmin().subscribe((response: any) => {
        if (Array.isArray(response.msg)) {
            this.arboles = response.msg;

        }
    })
    }

    cargarFamilias(){
        this.familiaService.obtenerFamilias().subscribe((response:any)=>{
            if(Array.isArray(response.msg)){
                this.Familias = response.msg
            }
        })
    }

    anadirArboles() {
        console.log(this.arbol)
        this.adminService.anadirArboles(this.arbol).subscribe((response: any) => {
            if (response.status = "OK") {
                this.msg = 'Arbol registrado exitosamente'
                this.mostrarExito(this.msg)
              setTimeout(() => {
                window.location.reload()
              })
            }

        },
            (error) => {
                let mensajesError = [];
                if (error.error && error.error.errors) {
                    for (let i = 0; i < error.error.errors.length; i++) {
                        mensajesError.push(error.error.errors[i].msg);
                    }
                }

                this.mostrarError(mensajesError)
            })
    }
    actualizarFamilia(event : Event){
        this.arbol.idFamilia = +(<HTMLSelectElement>event.target).value
        console.log(this.arbol.idFamilia);

    }
    editarArbol(idArbol:number) {
        this.arbolPut.nombre = this.arbolSeccionado.nombre
        this.arbolPut.estado = this.arbolSeccionado.desactivado

        console.log(this.arbolPut)

        this.adminService.editarArboles(idArbol,this.arbolPut).subscribe((response:any)=>{
            if(response.status="OK"){
                this.msg = 'Arbol editado correctamente';
                this.mostrarExito(this.msg)
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

    abrirEditar(arbol: arboles) {
        this.arbolSeccionado = arbol
        this.modalService.open(this.editar, { ariaLabelledBy: 'modal-basic-title' })
    }


    abrirAnadir() {
        this.modalService.open(this.anadir, { ariaLabelledBy: 'modal-basic-title' })
    }


    abrirEliminar(arbol: arboles) {
        this.arbolEliminar = arbol
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
