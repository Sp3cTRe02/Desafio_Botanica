export const environment = {
    production: false,
    baseUrl : 'http://localhost:9090/api',
    authEndpoint: '/auth',
    familiaEndpoint: '/familia'

};

export const authRoutes = {
    login: '/login',
    registro: '/registrar'
}

export const familiaRoutes = {
    familiaAdmin :  "/familia-admin",
    familiaPost: "/"
}