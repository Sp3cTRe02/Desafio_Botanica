export interface ContenidoGet{
    id: number;
    id_usuario: number,
    titulo: string,
    resumen_desc: string,
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
    resumen_desc: string,
    descripcion: string,
}

export interface InicioGet{
    id:number,
    titulo:string,
    descripcion:string,
    imagen:string
}

export interface InicioPut{
    titulo: string,
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
