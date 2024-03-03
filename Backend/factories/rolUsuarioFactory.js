const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');



const crearRolUsuario = async (ctos = 1) => {
    const usuarios = [1,2,3]
    const roles = [1,2,3]
    let rolUsuario = []

    for (let i = 0; i < ctos; i++) {
        rolUsuario.push({
            idRol: roles[Math.floor(Math.random() * roles.length )], 
            idUsuario: usuarios[Math.floor(Math.random() * usuarios.length)]            
        })
    }
    console.log('hola desde rolUsuarioFactory');
    return Promise.all(rolUsuario)
}

module.exports = crearRolUsuario