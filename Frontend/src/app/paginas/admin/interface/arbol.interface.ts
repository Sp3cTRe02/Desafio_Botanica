export interface arboles{
    id: number;
    nombre: string;
}
export interface Arbol {
  id: number;
  nombre: string;
  epFloracion: string;
  descripcion: string;
  desactivado: boolean;
  createdAt:   null;
  updatedAt:   null;
}

export interface crearArbolResponse {
  nombre: string;
  epFloracion: string;
  descripcion: string;
}


export interface actualizarArbolResponse {
  nombre: string;
  estado: number;
}

export interface obtenerArbolResponse {
  nombre: string;
  arbol: Arbol;
  estado: number;
}

export interface obtenerArbolesResponse {
  nombre: Arbol[] | string;
  estado: number;
}

export interface eliminarArbolResponse {
  nombre: string;
 estado: number;
}

