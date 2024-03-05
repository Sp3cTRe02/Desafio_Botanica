export interface UserLogin {
    email: string;
    passwd: string;
}

export interface UserRegistro {
    nombre: string;
    ap1: string;
    ap2: string;
    email: string;
    passwd: string;
}

export interface Auth {
    success: boolean;
    data: {
        id: number;
        nombre: string;
        token: string;
        roles: string[]
    }
    msg: string;
}

export interface Registro {
    success: boolean;
    data: {
        msg: string;
        mensajeUsuarioRol?: string;
    };
}