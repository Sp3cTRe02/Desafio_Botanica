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