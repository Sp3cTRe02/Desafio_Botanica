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

  constructor(private perfilService : PerfilServiceService, private msgSercive : MessageService) { }

  ngOnInit() {
    this.conseguirPerfil()
  }

  conseguirPerfil(){
    this.perfilService.getPerfil().subscribe((response) => {
      this.usuario = response
      console.log(this.usuario)
    })
  }

  obtenerInicial(nombre: string | null): string {
    return nombre ? nombre.charAt(0).toUpperCase() : '';
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
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }else{
        this.mostrarError()
      }
    })
  }

  mostrarExito() {
    this.msgSercive.add({severity:'success', summary: 'Exito', detail: 'Perfil actualizado correctamente'});
  }

  mostrarError() {
    this.msgSercive.add({severity:'error', summary: 'Error', detail: 'No se pudo actualizar el perfil'});
  }

}
