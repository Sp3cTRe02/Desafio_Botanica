export interface Arbol{
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