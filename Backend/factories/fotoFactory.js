const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');


/**
 * Factoria hecho por @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */
const crearFoto = async (ctos = 1) => {
    let foto = []
    const arboles = [1, 2, 3]

    for (let i = 0; i < ctos; i++) {
        foto.push({
            id_arbol: arboles[Math.floor(Math.random() * arboles.length)],
            ruta: faker.lorem.word(),
        })
    }
    return Promise.all(foto)
}

module.exports = crearFoto
