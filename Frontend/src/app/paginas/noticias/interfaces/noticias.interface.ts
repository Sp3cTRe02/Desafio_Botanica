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


export interface ContenidoPut{
    titulo: string,
    resumenDesc: string,
    descripcion: string,
}

export interface NoticiaPostRespuesta{
    sucess:boolean;
    data: {
        msg: string;
    }
}

export interface NoticiaPutRespuesta{
    sucess:boolean;
    data: {
        msg: string;
    }
}