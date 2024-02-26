import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {SubirImagenUsuariosService} from "../services/subir-imagen-usuarios.service";

@Component({
  selector: 'app-subir-imagen-usuarios',
  standalone: true,
  imports: [ToastModule, FileUploadModule],
  templateUrl: './subir-imagen-usuarios.component.html',
  styleUrl: './subir-imagen-usuarios.component.scss'
})
/**
 * @Jaime_Rafael
 */
export class SubirImagenUsuariosComponent {

    archivoSubido : any[] = []

    constructor(private msgService: MessageService,
    private uploadService : SubirImagenUsuariosService) {}


    mostrarExito(msg: string) {
      this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    }

    mostrarError(msg: string) {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
    }


    subirImagen(event: any){
      const formData = new FormData();
      const id = 1;
      formData.append('archivo', event.files[0], event.files[0].name);
      this.archivoSubido.push(formData)
      this.uploadService.subirImagen(formData)
        .subscribe((response) => {
          if (response?.status == 'OK') {
            this.mostrarExito('Imagen subida correctamente');
          } else {
            this.mostrarError('Error al subir la imagen');
          }
        })
    }
}
