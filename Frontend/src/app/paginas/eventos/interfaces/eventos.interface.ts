export interface EventoGet{
    id: number;
    nombre:string;
    descripcion:string;
    fecha_inicio: string;
    cantidad_max:number;
    latitud:number;
    longitud:number;
    ubicacion:number;
    imagen:string | null
}

export interface EventoPut{
    nombre:string;
    descripcion:string;
    cantidad_max:number;
}

export interface EventoPost{
    cantidad_entradas:number | null
}

export interface EventoAdd{
    id_usuario:number;
    nombre:string;
    descripcion:string;
    fecha_inicio:string;
    cantidad_max:number;
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
