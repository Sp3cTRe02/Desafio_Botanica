import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfildropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perfildropdown.component.html',
  styleUrl: './perfildropdown.component.scss'
})

/**
 * @David_Trujillo
 */

export class PerfildropdownComponent {
  nombreUsuario: string | null = ''

  constructor(public authService: AuthService){

  }

  ngOnInit(): void {
    const usuarioJSON = sessionStorage.getItem('usuario');
    this.nombreUsuario = usuarioJSON ? JSON.parse(usuarioJSON).nombre : null;
  }

  obtenerInicial(nombre: string | null): string {
    return nombre ? nombre.charAt(0).toUpperCase() : '';
  }
  
}
