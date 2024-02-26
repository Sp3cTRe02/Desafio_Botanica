export interface Arbol{
    id:number;
    nombre: string;
    epFloracion: string;
    nombreFam: string;
}

export interface ArbolData{
    arboles: Arbol[]
}

export interface ArbolRespuesta{
    sucesss: boolean
    datos: ArbolData
}

export interface Ubicacion{
    latitud: number;
    longitud: number;
    ciudad: string;
}
export interface ResponseRutas {
  msg:    string;
  status: string;
  rutas:  string[];
}
