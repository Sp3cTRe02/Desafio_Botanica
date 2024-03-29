import {Component, OnInit} from '@angular/core';
import { MenuComponent } from "../menu.component";
import {SubirImagenUsuariosComponent} from "../../subir-imagen-usuarios/subir-imagen-usuarios.component";
import {PerfilServiceService} from "../../services/perfil-service.service";
import {PaginatorModule} from "primeng/paginator";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.scss',
  imports: [MenuComponent, SubirImagenUsuariosComponent, PaginatorModule, ToastModule],
  providers: [MessageService]
})
//JaimeRafael
export class PerfilComponent implements OnInit{

  usuario : any = {}
  errores: { [campo: string]: string } = {};


  constructor(private perfilService : PerfilServiceService, private msgSercive : MessageService) { }

  ngOnInit() {
    this.conseguirPerfil()
  }

  conseguirPerfil(){
    this.perfilService.getPerfil().subscribe((response) => {
      this.usuario = response
      let url = this.usuario.foto
      let urlSeparada = url.split('/')
      let nombreImagen = urlSeparada[urlSeparada.length - 1]


      if(nombreImagen == 'null'){
        this.usuario.foto = null
      }

    })
  }

  actualizarPerfil(){
    let usuarioActualizado = {
      nombre : this.usuario.nombre,
      ap1 : this.usuario.ap1,
      ap2 : this.usuario.ap2,
      email : this.usuario.email,
    }
    this.perfilService.updatePerfil(usuarioActualizado).subscribe((response : any) => {
      if (response.success == true){
        this.mostrarExito()
        sessionStorage.setItem('usuario', JSON.stringify(usuarioActualizado))
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    }, (error)=>{
      this.errores = {};
      error.error.errors.forEach((err: { path: string | number; msg: string; }) => {
        this.errores[err.path] = err.msg;
      });
    })
  }

  mostrarExito() {
    this.msgSercive.add({severity:'success', summary: 'Exito', detail: 'Perfil actualizado correctamente'});
  }

  mostrarError() {
    this.msgSercive.add({severity:'error', summary: 'Error', detail: 'No se pudo actualizar el perfil'});
  }

}
