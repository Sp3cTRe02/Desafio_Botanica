import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegsitro } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-registromodal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MessagesModule, ToastModule],
  templateUrl: './registromodal.component.html',
  styleUrl: './registromodal.component.scss'
})
export class RegistromodalComponent {
  usuario: UserRegsitro = {
    nombre: '',
    ap1: '',
    ap2: '',
    email: '',
    passwd: ''
  }

  confirmarContrasena: string = ''
  msg: string = '';


  constructor(public router: Router, private sharedService: SharedService,
    private msgService: MessageService) { }

  mostrarExito(msg: string) {
    this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
  }

  mostrarError(mensajes: string[]) {
    mensajes.forEach((msg) => {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
    });
  }

  registrar() {
    this.sharedService.registrar(this.usuario)
      .subscribe((response) => {
        if (response?.success) {
          alert('xd')
          this.msg = 'Usuario registrado exitosamente'
          this.mostrarExito(this.msg);
          this.limpiarCampos()
          this.usuario = {
            nombre: '',
            ap1: '',
            ap2: '',
            email: '',
            passwd: ''
          }
        }

      },
      (error)=>{
        console.log(error)
        let mensajesError = [];
        for (let i = 0; i < error.error.errors.length; i++) {
          mensajesError.push(error.error.errors[i].msg);
        }

        this.mostrarError(mensajesError)
        this.limpiarCampos()
      })
  }

  limpiarCampos(){
    this.usuario = {
      nombre: '',
      ap1: '',
      ap2: '',
      email: '',
      passwd: ''
    }

  }


}
