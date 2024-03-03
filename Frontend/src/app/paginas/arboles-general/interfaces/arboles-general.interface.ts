export interface Arbol{
    id:number;
    nombre: string;
    epFloracion: string;
    nombreFam: string;
    foto: string;
}

export interface ArbolInfo{
  id:number;
  nombre: string;
  epFloracion: string;
  descripcion: string;
  nombreFam: string;
  foto: string;
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

export interface ubicaciones {
  ciudad: string;
  cantidad: number;
}
