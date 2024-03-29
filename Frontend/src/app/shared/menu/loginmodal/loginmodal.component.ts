import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-loginmodal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, MessagesModule, ToastModule, PasswordModule],
  providers: [MessageService],
  templateUrl: './loginmodal.component.html',
  styleUrl: './loginmodal.component.scss'
})

/**
 * @David_Trujillo
 */

export class LoginmodalComponent {

  @ViewChild('loginForm') loginForm!: ElementRef

  usuario = {
    email: '',
    passwd: ''
  }

  response: any;
  msg: string | undefined = '';


  constructor(public router: Router, private authService: AuthService,
    private msgService: MessageService) { }

  login() {
    this.authService.login(this.usuario)
      .subscribe((response) => {
          
        if (response?.success) {
          sessionStorage.setItem('usuario', JSON.stringify(response.data))
          sessionStorage.setItem('token', response.data.token)
          this.msg = 'Login correcto'
          this.mostrarExito(this.msg);
          this.limpiarCampos()


        } else {
          this.msg = 'Usuario o contraseña incorrectos'
          this.mostrarError(this.msg)
          this.limpiarCampos()
        }
      })

  }

  mostrarExito(msg: string) {
    this.msgService.add({ severity: 'success', summary: 'Éxito', detail: msg });

  }

  mostrarError(msg: string | undefined) {
    this.msgService.add({ severity: 'error', summary: 'Error', detail: msg });
  }


  limpiarCampos() {
    this.usuario = {
      email: '',
      passwd: ''
    }

  }

}
