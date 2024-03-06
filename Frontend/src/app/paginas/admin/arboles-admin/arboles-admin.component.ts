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

    familiaSeleccionada : number = 0

    arbol: ArbolPost = {
        id_familia: 1,
        nombre: '',
        ep_floracion: '',
        descripcion: '',
        foto: '',
        desactivado:false,
    }

    arbolPut: actualizarArbolResponse = {
        id: 0,
        id_familia: 0,
        ep_floracion: '',
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
        let familia = familias.find(familia => familia.id === arbol.id_familia)
        if(familia){
            arbol.nombre_familia = familia.nombre
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
          case 0: this.arbol.ep_floracion = this.meses[0].name
            break;
          case 1: this.arbol.ep_floracion = this.meses[1].name
            break;
          case 2: this.arbol.ep_floracion = this.meses[2].name
            break;
          case 3: this.arbol.ep_floracion = this.meses[3].name
            break;
          case 4: this.arbol.ep_floracion = this.meses[4].name
            break;
          case 5: this.arbol.ep_floracion = this.meses[5].name
            break;
          case 6: this.arbol.ep_floracion = this.meses[6].name
            break;
          case 7: this.arbol.ep_floracion = this.meses[7].name
            break;
          case 8: this.arbol.ep_floracion = this.meses[8].name
            break;
          case 9: this.arbol.ep_floracion = this.meses[9].name
            break;
          case 10: this.arbol.ep_floracion = this.meses[10].name
            break;
          case 11: this.arbol.ep_floracion = this.meses[11].name
            break;

        }

        const formData = new FormData();
        formData.append('archivo', event.files[0], event.files[0].name);
        formData.append('nombre', this.arbol.nombre);
        formData.append('descripcion', this.arbol.descripcion);
        formData.append('ep_floracion', this.arbol.ep_floracion);
        formData.append('id_familia', this.familiaSeleccionada.toString());
        formData.append('desactivado', this.arbol.desactivado.toString());


        this.adminService.anadirArboles(formData).subscribe((response: any) => {
            if (response.status == "OK") {
                this.msg = 'Árbol registrado exitosamente'
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
    actualizarFamilia(event : any){
        this.familiaSeleccionada = event.target.value
    }

    editarArbol(idArbol:number, event: any){
        this.arbol = this.arbolSeccionado
        this.arbolPut = {
            id: idArbol,
            id_familia: this.familiaSeleccionada,
            ep_floracion: this.arbolSeccionado.ep_floracion,
            descripcion: this.arbolSeccionado.descripcion,
            desactivado: this.arbolSeccionado.desactivado,
            nombre: this.arbolSeccionado.nombre,
            estado: this.arbolSeccionado.estado
        }


        switch (this.fechaArbol?.getMonth()) {
          case 0: this.arbolPut.ep_floracion = this.meses[0].name
            break
          case 1: this.arbolPut.ep_floracion = this.meses[1].name
            break
          case 2: this.arbolPut.ep_floracion = this.meses[2].name
            break
          case 3: this.arbolPut.ep_floracion = this.meses[3].name
            break
          case 4: this.arbolPut.ep_floracion = this.meses[4].name
            break
          case 5: this.arbolPut.ep_floracion = this.meses[5].name
            break;
          case 6: this.arbolPut.ep_floracion = this.meses[6].name
            break;
          case 7: this.arbolPut.ep_floracion = this.meses[7].name
            break;
          case 8: this.arbolPut.ep_floracion = this.meses[8].name
            break;
          case 9: this.arbolPut.ep_floracion = this.meses[9].name
            break;
          case 10: this.arbolPut.ep_floracion = this.meses[10].name
            break;
          case 11: this.arbolPut.ep_floracion = this.meses[11].name
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
        formData.append('ep_floracion', this.arbolPut.ep_floracion);
        formData.append('id_familia', this.arbolPut.id_familia.toString());
        formData.append('desactivado', this.arbolPut.desactivado.toString());




        this.adminService.editarArboles(idArbol,formData).subscribe((response:any)=>{
            if(response.status==="OK"){
                this.msg = 'Árbol editado correctamente';
                this.mostrarExito(this.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
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
        let numMes = this.sacarMes(this.arbolSeccionado.ep_floracion)
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
