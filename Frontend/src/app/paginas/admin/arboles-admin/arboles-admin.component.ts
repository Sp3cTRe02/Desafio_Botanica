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
import {MessageService, PrimeNGConfig} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from "primeng/calendar";
import {FileUploadModule} from "primeng/fileupload";

@Component({
    selector: 'app-arboles-admin',
    standalone: true,
    templateUrl: './arboles-admin.component.html',
    styleUrl: './arboles-admin.component.scss',
  imports: [CommonModule, MenuComponent, CalendarModule, TableModule, FormsModule, ToastModule, InputSwitchModule, ReactiveFormsModule, FileUploadModule],
    providers: [MessageService]
})
//Ismael
//JaimeRafael
export class ArbolesAdminComponent {
    meses = [
        {name: 'Enero', code: 1},
        {name: 'Febrero', code: 2},
        {name: 'Marzo', code: 3},
        {name: 'Abril', code: 4},
        {name: 'Mayo', code: 5},
        {name: 'Junio', code: 6},
        {name: 'Julio', code: 7},
        {name: 'Agosto', code: 8},
        {name: 'Septiembre', code: 9},
        {name: 'Octubre', code: 10},
        {name: 'Noviembre', code: 11},
        {name: 'Diciembre', code: 12}
    ];

    fecha: Date = new Date()
    fechaArbol: Date | undefined
    arboles: arboles[] = []
    arbolSeccionado: any
    arbolEliminar: any

    arbol: ArbolPost = {
        idFamilia: 1,
        nombre: '',
        epFloracion: '',
        descripcion: '',
        foto: '',
        desactivado:false,
    }

    arbolPut: actualizarArbolResponse = {
        id: 0,
        idFamilia: 0,
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
    private msgService: MessageService, private familiaService : FamiliaAdminService,
    private config: PrimeNGConfig) {

  this.config.setTranslation({
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    })
    this.cargarFamilias()
    this.mostrarArboles()

    }

    mostrarArboles() {
    this.adminService.obtenerArbolesAdmin().subscribe((response: any) => {
        if (Array.isArray(response.msg.arboles)) {
            this.arboles = response.msg.arboles;
            this.arboles.forEach(arbol => {
                this.asignarNombresFamilia(arbol, this.Familias)
            })
        }
    })
    }

    asignarNombresFamilia(arbol: arboles, familias: FamiliaAdmin[]){
        let familia = familias.find(familia => familia.id === arbol.idFamilia)
        if(familia){
            arbol.nombreFamilia = familia.nombre
        }
    }

    cargarFamilias(){
        this.familiaService.obtenerFamilias().subscribe((response:any)=>{
            if(Array.isArray(response.msg)){
                this.Familias = response.msg

            }
        })
    }

    anadirArboles(event : any) {

        switch (this.fecha.getMonth()) {
          case 0: this.arbol.epFloracion = this.meses[0].name
            break;
          case 1: this.arbol.epFloracion = this.meses[1].name
            break;
          case 2: this.arbol.epFloracion = this.meses[2].name
            break;
          case 3: this.arbol.epFloracion = this.meses[3].name
            break;
          case 4: this.arbol.epFloracion = this.meses[4].name
            break;
          case 5: this.arbol.epFloracion = this.meses[5].name
            break;
          case 6: this.arbol.epFloracion = this.meses[6].name
            break;
          case 7: this.arbol.epFloracion = this.meses[7].name
            break;
          case 8: this.arbol.epFloracion = this.meses[8].name
            break;
          case 9: this.arbol.epFloracion = this.meses[9].name
            break;
          case 10: this.arbol.epFloracion = this.meses[10].name
            break;
          case 11: this.arbol.epFloracion = this.meses[11].name
            break;

        }

        const formData = new FormData();
        formData.append('archivo', event.files[0], event.files[0].name);
        formData.append('nombre', this.arbol.nombre);
        formData.append('descripcion', this.arbol.descripcion);
        formData.append('epFloracion', this.arbol.epFloracion);
        formData.append('idFamilia', this.arbol.idFamilia.toString());
        formData.append('desactivado', this.arbol.desactivado.toString());


      console.log(this.arbol)
        this.adminService.anadirArboles(formData).subscribe((response: any) => {
            if (response.status == "OK") {
                this.msg = 'Arbol registrado exitosamente'
                this.mostrarExito(this.msg)
                 setTimeout(() => {
                  window.location.reload()
                 }, 1500)
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

    }
    editarArbol(idArbol:number, event: any){
        this.arbol = this.arbolSeccionado
        this.arbolPut.id = idArbol
        this.arbolPut = this.arbolSeccionado

        switch (this.fechaArbol?.getMonth()) {
          case 0: this.arbolPut.epFloracion = this.meses[0].name
            break;
          case 1: this.arbolPut.epFloracion = this.meses[1].name
            break;
          case 2: this.arbolPut.epFloracion = this.meses[2].name
            break;
          case 3: this.arbolPut.epFloracion = this.meses[3].name
            break;
          case 4: this.arbolPut.epFloracion = this.meses[4].name
            break;
          case 5: this.arbolPut.epFloracion = this.meses[5].name
            break;
          case 6: this.arbolPut.epFloracion = this.meses[6].name
            break;
          case 7: this.arbolPut.epFloracion = this.meses[7].name
            break;
          case 8: this.arbolPut.epFloracion = this.meses[8].name
            break;
          case 9: this.arbolPut.epFloracion = this.meses[9].name
            break;
          case 10: this.arbolPut.epFloracion = this.meses[10].name
            break;
          case 11: this.arbolPut.epFloracion = this.meses[11].name
            break;
        }

        const formData = new FormData();
        if(event.files[0] == null){
            formData.append('archivo', 'null')
        }else {
           formData.append('archivo', event.files[0], event.files[0].name);
        }

        formData.append('nombre', this.arbolPut.nombre);
        formData.append('descripcion', this.arbolPut.descripcion);
        formData.append('epFloracion', this.arbolPut.epFloracion);
        formData.append('idFamilia', this.arbolPut.idFamilia.toString());
        formData.append('desactivado', this.arbolPut.desactivado.toString());


        this.adminService.editarArboles(idArbol,formData).subscribe((response:any)=>{
            if(response.status==="OK"){
                this.msg = 'Arbol editado correctamente';
                this.mostrarExito(this.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
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
        let numMes = this.sacarMes(this.arbolSeccionado.epFloracion)
        this.fechaArbol = new Date(this.fecha.getFullYear(), numMes, 1)
        this.modalService.open(this.editar, { ariaLabelledBy: 'modal-basic-title' })
    }

    sacarMes(mes: string) {
        let mesNumero = 0
        switch (mes.toLowerCase()) {
            case 'enero': mesNumero = 0
                break;
            case 'febrero': mesNumero = 1
                break;
            case 'marzo': mesNumero = 2
                break;
            case 'abril': mesNumero = 3
                break;
            case 'mayo': mesNumero = 4
                break;
            case 'junio': mesNumero = 5
                break;
            case 'julio': mesNumero = 6
                break;
            case 'agosto': mesNumero = 7
                break;
            case 'septiembre': mesNumero = 8
                break;
            case 'octubre': mesNumero = 9
                break;
            case 'noviembre': mesNumero = 10
                break;
            case 'diciembre': mesNumero = 11
                break;
            default: mesNumero = 13
        }
        return mesNumero
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
