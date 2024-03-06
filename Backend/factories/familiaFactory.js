const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

/**
 * Factoria hecho por @Jaime_Rafael
 * @param {*} req 
 * @param {*} res 
 */

const crearFamilia = async (ctos = 1) => {
    let familias = []
    for (let i = 0; i < ctos; i++) {
        const familia = {
            nombre : faker.lorem.word(),   
        }
        familias.push(familia)
    }
    return Promise.all(familias)
}

module.exports = crearFamilia