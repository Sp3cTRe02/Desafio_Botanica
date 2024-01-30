const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

const crearFamilia = async (ctos = 1) => {
    let familias = []
    for (let i = 0; i < ctos; i++) {
        const familia = {
            nombre : faker.lorem.word(),   
        }
        console.log(familia);
        familias.push(familia)
    }
    return Promise.all(familias)
}

module.exports = crearFamilia