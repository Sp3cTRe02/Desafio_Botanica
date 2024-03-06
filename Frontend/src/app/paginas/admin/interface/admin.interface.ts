export interface FamiliaAdmin{
    id: number;
    nombre: string;
}

export interface FamiliaPost{
    nombre:string;
}

export interface ResponseGetUsuarios {
  usuarios: Usuario[];
  status:   string;
}

export interface Usuario {
  id:          number;
  nombre:      string;
  ap1:         string;
  ap2:         string;
  email:       string;
  passwd:      string;
  foto:        string;
  desactivado: boolean;
}

export interface RolUsuario {
  id_rol: number;
  id_usuario: number;
}

export interface UsuarioPost {
  nombre:       string;
  ap1:          string;
  ap2:          string;
  email:        string;
  passwd:       string;
  foto:         string;
}

export interface FamiliaPut{
    nombre:string;
    estado: number;
}

