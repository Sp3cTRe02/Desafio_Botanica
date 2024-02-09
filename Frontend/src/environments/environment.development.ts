export const environment = {
    production: false,
    baseUrl : 'http://localhost:9090/api',
    authEndpoint: '/auth',
    familiaEndpoint: '/familia',
    usuarioEndpoint: '/cliente',
    arbolEndpoint: '/arboles'
};

export const authRoutes = {
    login: '/login',
    registro: '/registrar'
}

export const familiaRoutes = {
    familiaAdmin :  "/familia-admin",
    familiaPost: "/",
    familiaPut: "/"
}

export const usuarioRoutes = {
    usuariobase: "/usuario",
}

export const arbolesRoutes = {
    arbolesGeneral: "/lista-arboles"
}

   


