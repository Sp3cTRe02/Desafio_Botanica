export const environment = {
    production: false,
    baseUrl : 'http://localhost:9090/api',
    authEndpoint: '/auth',
    familiaEndpoint: '/familia',
    usuarioEndpoint: '/cliente'
};

export const authRoutes = {
    login: '/login',
    registro: '/registrar'
}

export const familiaRoutes = {
    familiaAdmin :  "/familia-admin",
    familiaPost: "/"
}

export const usuarioRoutes = {
    usuariobase: "/usuario",
}
