import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MenuComponent} from '../../../shared/menu/menu.component';
import {MessageService} from "primeng/api";
import {CommonModule} from "@angular/common";
import {Table, TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {Usuario, UsuarioPost} from "../interface/admin.interface";
import {UsuarioAdminService} from "../services/usuario-admin.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-usuarios-admin',
    standalone: true,
    templateUrl: './usuarios-admin.component.html',
    styleUrl: './usuarios-admin.component.scss',
    imports: [MenuComponent, CommonModule, TableModule, FormsModule],
    providers : [MessageService]
})
export class UsuariosAdminComponent {

  usuarios : Usuario[] = []
  usuarioSeleccionado : any
  usuarioEliminar : any

  usuario : UsuarioPost = {
    nombre: '',
    ap1: '',
    ap2: '',
    email: '',
    passwd: '',
    foto: '',
}

  @ViewChild('editar') editar: Table | undefined
  @ViewChild('anadir') anadir: Table | undefined
  @ViewChild('eliminar') eliminar: TemplateRef<any> | undefined

  constructor(private adminService : UsuarioAdminService, private modalService : NgbModal,
              private msgService: MessageService){
    this.mosrarUsuarios()
  }

  mosrarUsuarios(){
    this.adminService.obtenerUsuarios().subscribe( (response: any) => {
        if(response.status === "OK"){
          this.usuarios = response.usuarios
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

  abrirEliminar(usuario : Usuario){
    this.usuarioEliminar = usuario
    this.modalService.open(this.eliminar, { ariaLabelledBy: 'modal-basic-title' })
  }

  eliminarUsuario(id : number) {
    console.log(this.usuarioEliminar.id)
    this.adminService.desactivarUsuario(id).subscribe( (response: any) => {
      if(response.status === "OK"){
        window.alert("Usuario eliminado")
        window.location.reload()
        this.mosrarUsuarios()
      }
    })
  }

  crearUsuario(){
    console.log(this.usuario)
    this.adminService.crearUsuario(this.usuario).subscribe( (response: any) => {
      if(response.status === "OK"){
        window.alert("Usuario creado")
        window.location.reload()
        this.mosrarUsuarios()
      }
    })
  }

}


/*


 */
