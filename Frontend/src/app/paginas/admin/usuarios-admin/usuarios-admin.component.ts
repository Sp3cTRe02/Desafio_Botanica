import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MenuComponent} from '../../../shared/menu/menu.component';
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {Table, TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {Usuario, UsuarioPost} from "../interface/admin.interface";
import {UsuarioAdminService} from "../services/usuario-admin.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InputSwitchModule} from "primeng/inputswitch";
import {ReactiveFormsModule} from "@angular/forms";
import {Rol, usuarioRol} from "../interface/rol.interface";
import {RolService} from "../services/rol.service";


@Component({
    selector: 'app-usuarios-admin',
    standalone: true,
    templateUrl: './usuarios-admin.component.html',
    styleUrl: './usuarios-admin.component.scss',
    imports: [MenuComponent, CommonModule, TableModule, FormsModule, InputSwitchModule, ReactiveFormsModule,],
    providers : [MessageService]
})
//JaimeRafael
export class UsuariosAdminComponent implements OnInit{

  usuarios : Usuario[] = []
  usuarioSeleccionado : any
  usuarioRoles : Rol[] = []
  roles : Rol[] = []

  usuario : UsuarioPost = {
    nombre: '',
    ap1: '',
    ap2: '',
    email: '',
    passwd: '',
    foto: '',
  }
  usuarioRol : Usuario = {
    id: 0,
    nombre: '',
    ap1: '',
    ap2: '',
    email: '',
    passwd: '',
    foto: '',
    desactivado: false,
  }

  @ViewChild('editar') editar: Table | undefined
  @ViewChild('anadir') anadir: Table | undefined
  @ViewChild('mRoles') mRoles : Table | undefined

  constructor(
    private adminService : UsuarioAdminService,
    private rolService : RolService,
    private modalService : NgbModal,
    private msgService: MessageService
  ){}

  ngOnInit() {
    this.mosrarUsuarios()
    this.traerRoles()
  }

  mosrarUsuarios(){
    this.adminService.obtenerUsuarios().subscribe( (response: any) => {
        if(response.status === "OK"){
          this.usuarios = response.usuarios
        }
    })
  }

  traerRoles() {
    this.rolService.obtenerRoles().subscribe((response: any) => {
      if (response.status === "OK") {
        this.roles = response.roles
      }
    })
  }

  abrirEditar(usuario : Usuario){
    this.usuarioSeleccionado = usuario
    this.modalService.open(this.editar, { ariaLabelledBy: 'modal-basic-title' })
  }

  abrirAnadir(){
    this.modalService.open(this.anadir, { ariaLabelledBy: 'modal-basic-title' })
  }

  abrirRoles(usuario : Usuario){
  this.usuarioSeleccionado = usuario
    this.rolService.obtenerRolesUsuario(usuario.id).subscribe((response: any) => {
      if(response.status === "OK"){
        this.usuarioRoles = response.roles
        this.modalService.open(this.mRoles, { ariaLabelledBy: 'modal-basic-title' })
      }
    })
  }

  crearUsuario(){
    console.log(this.usuario)
    this.adminService.crearUsuario(this.usuario).subscribe( (response: any) => {
      if(response.status === "OK"){
        window.location.reload()
        this.mosrarUsuarios()
      }
    })
  }

  editarUsuario(){
    console.log(this.usuarioSeleccionado)
    this.adminService.modificarUsuario(this.usuarioSeleccionado.id, this.usuarioSeleccionado).subscribe( (response: any) => {
      if(response.status === "OK"){
        window.location.reload()
        this.mosrarUsuarios()
      }
    })
  }
  tieneRol(rol : Rol, RolesUsuario : Rol[]){
    let tieneRol = false
    RolesUsuario.forEach( (rolUsuario) => {
      if(rol.id === rolUsuario.id){
        tieneRol = true
      }
    })
    return tieneRol
  }

  addRol(idRol : number, idUsuario : number){
    let usuarioRol : usuarioRol = {
      id_rol: idRol,
      id_usuario: idUsuario
    }


    this.rolService.addRolUsuario(usuarioRol).subscribe( (response: any) => {
      if(response.status === "OK"){
        window.location.reload()
      }
    })
  }

  removeRol(idRol : number, idUsuario : number){
    let usuarioRol : usuarioRol = {
      id_rol: idRol,
      id_usuario: idUsuario
    }
    this.rolService.deleteRolUsuario(usuarioRol).subscribe( (response: any) => {
      if(response.status === "OK"){
        window.location.reload()
      }
    })
  }
}


/*


 */
