import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistro } from '../../interfaces/auth.interface';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-registromodal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MessagesModule, ToastModule,PasswordModule],
  templateUrl: './registromodal.component.html',
  styleUrl: './registromodal.component.scss'
})

/**
 * @David_Trujillo
 */

export class RegistromodalComponent {
  usuario: UserRegistro = {
    nombre: '',
    ap1: '',
    ap2: '',
    email: '',
    passwd: ''
  }

  confirmarContrasena: string = ''
  msg: string = '';

  errores: { [campo: string]: string } = {};

  passwordVisible: boolean = false;
  passwordType: string = 'password';

  value: string | undefined;
  constructor(public router: Router, private authService: AuthService,
    private msgService: MessageService) { }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordType = this.passwordVisible ? 'text' : 'password';
    
  }


  mostrarExito(msg: string) {
    this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });
  }

  mostrarError(mensajes: string[]) {
    mensajes.forEach((msg) => {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
    });
  }

  registrar() {
    if (this.usuario.passwd !== this.confirmarContrasena) {
      return;
    }

    this.authService.registrar(this.usuario)
      .subscribe(
        (response) => {
          if (response?.success) {
            this.mostrarExito('Usuario registrado exitosamente');
            this.limpiarCampos();
          }
        },
        (error) => {
          console.log(error);
          this.errores = {};
          error.error.errors.forEach((err: { path: string | number; msg: string; }) => {
            this.errores[err.path] = err.msg;
          });
        }
      );
  }

  limpiarCampos() {
    this.usuario = {
      nombre: '',
      ap1: '',
      ap2: '',
      email: '',
      passwd: ''
    };
    this.confirmarContrasena = '';
    this.errores = {};
  }

  limpiarMensajes() {
    this.errores = {};
  }


}
