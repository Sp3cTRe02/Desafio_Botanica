import { Component } from '@angular/core';

@Component({
  selector: 'app-perfildropdown',
  standalone: true,
  imports: [],
  templateUrl: './perfildropdown.component.html',
  styleUrl: './perfildropdown.component.scss'
})
export class PerfildropdownComponent {
  nombreUsuario: string | null = ''

  ngOnInit(): void {
    const usuarioJSON = localStorage.getItem('usuario');
    this.nombreUsuario = usuarioJSON ? JSON.parse(usuarioJSON).nombre : null;
  }

  obtenerInicial(nombre: string | null): string {
    return nombre ? nombre.charAt(0).toUpperCase() : '';
  }
}