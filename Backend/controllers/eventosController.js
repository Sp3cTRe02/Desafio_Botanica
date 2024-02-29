const eventoConexion = require ('../database/eventosConexion')
const { StatusCodes } = require('http-status-codes')
const path = require('path');
const fs = require('fs');


class eventoController {
    static crearEvento = async (req,res) => {
        try{

        }catch(error){

        }

    }

    static getEventos = async (req,res) =>{
        try{
            const eventos = await eventoConexion.getEventos()

            for (let i = 0; i < eventos.length; i++) {
                const id = eventos[i].dataValues.id
                const imagen = process.env.URL_PETICION + process.env.PORT + "/api/eventos/upload/" + id
                eventos[i].dataValues.imagen = imagen
            }

            const response = {
                success:true,
                data: {
                    eventos
                }
            }

            res.status(StatusCodes.OK).json(response)


        }catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static getInfoEvento = async (req,res) =>{
        try{
            const id = req.params.id
            const evento = await eventoConexion.getInfoEvento(id)

            const imagen = process.env.URL_PETICION + process.env.PORT + "/api/eventos/upload/" + id
            evento.imagen = imagen

            const response = {
                success : true,
                data:{ 
                    evento
                }
            }

            res.status(StatusCodes.OK).json(response)
            
        }catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static getOrganizador= async (req,res)=>{

        try{
            const id = req.params.id
            const organizador = await eventoConexion.getOrganizador(id)
    
            const response = {
                success : true,
                data:{ 
                    organizador
                }
            }

            res.status(StatusCodes.OK).json(response)
    
        }catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el organizador.', sqlMessage: error })
        }
    }



    static mostrarImagen = async (req,res) =>{
        try {
            const imagen = await eventoConexion.getImagen(req.params.id);
            console.log(imagen.dataValues.imagen)

            if (imagen) {
                const pathImagen = path.join(__dirname, '../uploads', 'imgs/content', imagen.dataValues.imagen);
                console.log(pathImagen);

                if (fs.existsSync(pathImagen)) {
                    return res.sendFile(pathImagen);
                }
            }

            res.status(StatusCodes.NOT_FOUND).json({ error: "No se ha encontrado la imagen" });
        } catch (error) {
            console.error('Error al mostrar la imagen:', error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error interno del servidor" });
        }
    }
    
}

module.exports= eventoController