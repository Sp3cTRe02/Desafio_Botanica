export interface EventoGet{
    id: number;
    nombre:string;
    descripcion:string;
    fechaInicio: string;
    cantidadMax:number;
    latitud:number;
    longitud:number;
    ubicacion:number;
    imagen:string | null
}

export interface EventoPut{
    nombre:string;
    descripcion:string;
    cantidadMax:number;
}

export interface EventoPost{
    cantidadEntradas:number | null
}

export interface EventoAdd{
    idUsuario:number;
    nombre:string;
    descripcion:string;
    fechaInicio:string;
    cantidadMax:number;
    latitud:string;
    longitud:string;
    ubicacion:string;
    imagen:string

}

export interface EventoPostRespuesta{
    sucess:boolean;
    data: {
        msg: string;
    }
}