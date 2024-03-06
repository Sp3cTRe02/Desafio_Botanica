const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

const  crearUbicacion = async (ctos = 1) => {
    let ubicacion = []
    const arboles = [1, 2, 3]

    for (let i = 0; i < ctos; i++) {
        ubicacion.push({
            id_arbol: arboles[Math.floor(Math.random() * arboles.length)],
            latitud: faker.location.latitude(),
            longitud: faker.location.longitude(),
            ciudad: fakerES.location.city(),
        })
    }
    return Promise.all(ubicacion)
}

module.exports = crearUbicacion