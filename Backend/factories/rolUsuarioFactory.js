const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');



const crearRolUsuario = async (ctos = 1) => {
    const usuarios = [1,2,3,4]
    const roles = [1,2,3]
    let rolUsuario = []

    let admin = {
        id_rol: 1,
        id_usuario: 1
    }
    rolUsuario.push(admin)
    for (let i = 0; i < ctos; i++) {
        rolUsuario.push({
            id_rol: roles[Math.floor(Math.random() * roles.length )], 
            id_usuario: usuarios[Math.floor(Math.random() * usuarios.length)]            
        })
    }
    return Promise.all(rolUsuario)
}

module.exports = crearRolUsuario