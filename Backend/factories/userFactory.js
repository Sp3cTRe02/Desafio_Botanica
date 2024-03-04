const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');


/**
 * Factoria hecha por @Jaime_Rafael
 * @param {*} ctos 
 * @param {*} pass 
 * @returns 
 */
const crearUser = async (ctos = 1, pass) => {

    let users = []
    const adminPass = await bcrypt.hash('admin123', 10)
    let admin = {
        nombre: 'admin',
        ap1: 'admin',
        ap2: 'admin',
        email: 'admin@admin.com',
        passwd: adminPass,
        foto: null,
        desactivado: false,
    }
        
    for (let i = 0; i < ctos; i++) {
        // log
        const pass = await bcrypt.hash('user123', 10)

        let user = {
            nombre: fakerES.person.firstName(),
            ap1: fakerES.person.lastName(),
            ap2: fakerES.person.lastName(),
            email: faker.internet.email(),
            passwd: pass,
            foto: null,
            desactivado: false,

        }

        users.push(user)
    }

    return Promise.all(users)
}

module.exports = crearUser