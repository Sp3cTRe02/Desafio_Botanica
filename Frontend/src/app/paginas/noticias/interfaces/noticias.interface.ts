export interface ContenidoGet{
    id: number;
    idUsuario: number,
    titulo: string,
    resumenDesc: string,
    descripcion: string,
    imagen: string | null
}



export interface ContenidoPost{
    idUsuario: number,
    titulo: string,
    resumenDesc: string,
    descripcion: string,
    imagen: string | null
}

export interface NoticiaPostRespuesta{
    sucess:boolean;
    data: {
        msg: string;
    }
}