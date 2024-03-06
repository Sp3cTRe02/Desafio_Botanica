export interface arboles{
    id: number;
    id_familia: number;
    nombre_familia : string;
    nombre: string;
    ep_floracion: string;
    descripcion: string;
    foto: string;
    desactivado: boolean;

}
export interface crearArbolResponse {
  id: number;
  id_familia: number;
  nombre: string;
  ep_floracion: string;
  descripcion: string;
  desactivado: boolean;
}
export interface ArbolPost {
  id_familia: number;
  nombre: string;
  ep_floracion: string;
  descripcion: string;
  foto: string;
  desactivado: boolean;

}
// export interface obtenerArbolResponse {
//   arboles: Arbol[] ;
//   estado: number;
// }
export interface obtenerArbolesResponse {
  arboles: Arbol[] ;
  status:  string;
}

export interface Arbol {
  id: number;
  id_familia: number;
  nombre: string;
  ep_floracion: string;
  descripcion: string;
  foto: string;
  desactivado: boolean;

}




export interface actualizarArbolResponse {
  id: number;
    id_familia: number;
    nombre: string;
    ep_floracion: string;
    descripcion: string;
    desactivado: boolean;
   estado: number;
}


