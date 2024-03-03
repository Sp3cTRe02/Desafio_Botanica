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
}

export interface EventoPost{
    cantidadEntradas:number | null
}