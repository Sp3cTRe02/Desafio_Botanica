const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

const crearUser = async (ctos = 1, pass ) => {
    console.log('hola');
    let users = []
    for (let i = 0; i < ctos; i++) {
        // log
        const pass = await bcrypt.hash('user123', 10)

        let user = {
            nombre : fakerES.person.firstName(),
            ap1 : fakerES.person.lastName(),
            ap2 : fakerES.person.lastName(),
            email : faker.internet.email(), 
            passwd : pass,
            foto : faker.lorem.word(),
            desactivado : false,
            // 123 : 123
        }
    
        users.push(user)
    }
    console.log(users);

    return Promise.all(users)
}

module.exports = crearUser