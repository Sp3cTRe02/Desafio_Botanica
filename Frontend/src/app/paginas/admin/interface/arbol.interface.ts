export interface arboles{
    id: number;
    idFamilia: number;
    nombre: string;
    epFloracion: string;
    descripcion: string;
    desactivado: boolean;

}
export interface crearArbolResponse {
  id: number;
  idFamilia: number;
  nombre: string;
  epFloracion: string;
  descripcion: string;
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
  idFamilia: number;
  nombre: string;
  epFloracion: string;
  descripcion: string;
  desactivado: boolean;

}




export interface actualizarArbolResponse {
  id: number;
    idFamilia: number;
    nombre: string;
    epFloracion: string;
    descripcion: string;
    desactivado: boolean;
   estado: number;
}


