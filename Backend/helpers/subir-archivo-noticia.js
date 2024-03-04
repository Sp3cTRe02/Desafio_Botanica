const path = require('path')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

/**
 * @David_Trujillo
 */


const subirArchivoNoticia = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files
        console.log(archivo[0].name)
        const nombreCortado = archivo[0].name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, process.env.UPLOADS_PATH, carpeta, nombreTemp)

        archivo[0].mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

            resolve(nombreTemp)
        })
    })
}

const subirArchivoNoticiaPost = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files
        console.log(archivo.name)
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, process.env.UPLOADS_PATH, carpeta, nombreTemp)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

            resolve(nombreTemp)
        })
    })
}

module.exports = {
    subirArchivoNoticia,
    subirArchivoNoticiaPost
}