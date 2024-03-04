const path = require('path')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

/**
 * @David_Trujillo
 */


const subirArchivoEvento = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]


        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`)
        }

    

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, process.env.UPLOADS_PATH, carpeta, nombreTemp)


        console.log(uploadPath)
        archivo.mv(uploadPath, (err) => {
            if (err) {
              
                return reject(err)
            }
           
            resolve(nombreTemp)
        })
    })
}

const subirArchivoEventoPost = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]


        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`)
        }

    

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, process.env.UPLOADS_PATH, carpeta, nombreTemp)


        console.log(uploadPath)
        archivo.mv(uploadPath, (err) => {
            if (err) {
              
                return reject(err)
            }
           
            resolve(nombreTemp)
        })
    })
}


module.exports = {
    subirArchivoEvento,
    subirArchivoEventoPost
}