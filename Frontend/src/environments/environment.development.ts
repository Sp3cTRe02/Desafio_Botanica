export const environment = {
    production: false,
    baseUrl : 'http://localhost:9090/api',
    authEndpoint: '/auth',
    familiaEndpoint: '/familia',
    usuarioEndpoint: '/cliente',
    adminEndPoint: '/admin',
    arbolEndpoint: '/arboles',
    arbolesEndPoint: '/arbol',
    contenidoEndPoint: '/contenido',
    mapBoxToken: 'pk.eyJ1IjoiZGF2aXRydTYwIiwiYSI6ImNsc3JucXNhazA1cnEyaW1sZngxa2pqNHIifQ.vslWBUZtPTf7cgGyqDQpvg'
};

export const authRoutes = {
    login: '/login',
    registro: '/registrar'
}

export const familiaRoutes = {
    familiaAdmin :  "/familia-admin",
    familiaPost: "/",
    familiaPut: "/",
    familias : "/"
}

export const usuarioRoutes = {
    usuariobase: "/usuario",
    addRol: "/addRol",
    deleteRol: "/deleteRol",
    subirImagen : "/subirImagen/"
}

export const adminRoutes = {
    getRoles : "/getRoles",
    getRolesUsuario : "/getRolesUsuario",
}
export const arbolRoutes = {
    arbolesAdmin: "/",
    arbolesPost: "/",
    arbolesPut: "/",
    addUbicacion: "/ubicacion",
    subirFotoArbol: "/imagen",
    galeriaArbol: "/galeria",
    topCiudadesArbol: "/ciudades"
}

export const arbolesRoutes = {
    arbolesGeneral: "/lista-arboles",
    informacionArbol: "/",
    ubicacionesArbol: "/ubi/"
}

export const contenidoRoutes = {
    contenidoPost: "/",
    contenidoGet: "/",
    contenidoPut: "/",
    ultimasNoticiasGet: "/ultimas-noticias"
}

