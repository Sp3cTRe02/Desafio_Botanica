const eventoConexion = require('../database/eventosConexion')
const { StatusCodes } = require('http-status-codes')
const { Readable } = require('stream')
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode')
const PDFDocument = require('pdfkit')
const {subirArchivoEventoPost} = require('../helpers/subir-archivo-evento')


class eventoController {
    static crearEvento = async (req, res) => {
        try {

        } catch (error) {

        }

    }

    static getEventos = async (req, res) => {
        try {
            const eventos = await eventoConexion.getEventos()

            for (let i = 0; i < eventos.length; i++) {
                const id = eventos[i].dataValues.id
                const imagen = process.env.URL_PETICION + process.env.PORT + "/api/eventos/upload/" + id
                eventos[i].dataValues.imagen = imagen
            }

            const response = {
                success: true,
                data: {
                    eventos
                }
            }

            res.status(StatusCodes.OK).json(response)


        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static getInfoEvento = async (req, res) => {
        try {
            const id = req.params.id
            const evento = await eventoConexion.getInfoEvento(id)

            const imagen = process.env.URL_PETICION + process.env.PORT + "/api/eventos/upload/" + id
            evento.imagen = imagen

            const response = {
                success: true,
                data: {
                    evento
                }
            }

            res.status(StatusCodes.OK).json(response)

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static mostrarImagen = async (req, res) => {
        try {
            const imagen = await eventoConexion.getImagen(req.params.id);
            console.log(imagen.dataValues.imagen)

            if (imagen) {
                const pathImagen = path.join(__dirname, '../uploads', 'imgs/event', imagen.dataValues.imagen);
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

    static getOrganizador = async (req, res) => {

        try {
            const id = req.params.id
            const organizador = await eventoConexion.getOrganizador(id)

            const response = {
                success: true,
                data: {
                    organizador
                }
            }

            res.status(StatusCodes.OK).json(response)

        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el organizador.', sqlMessage: error })
        }
    }

    static getPlazasRestantes = async (req, res) => {
        try {
            const id = req.params.id
            const plazasTotales = await eventoConexion.getTotalPlazas(id)
            const plazasOcupadas = await eventoConexion.getPlazasOcupadas(id)

            const plazasRestantes = plazasTotales.dataValues.cantidadMax - plazasOcupadas

            const response = {
                success: true,
                data: {
                    plazasRestantes
                }
            }

            res.status(StatusCodes.OK).json(response)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor', sqlMessage: error })
        }

    }

    static generarQR = async (ticketInfo, options = {}) => {
        const defaultOptions = {
            type: 'png',
            quality: 0.92,
            size: 100
        };

        const finalOptions = { ...defaultOptions, ...options };

        const text = JSON.stringify(ticketInfo);

        try {
            return QRCode.toBuffer(text, finalOptions);
        } catch (err) {
            console.error("Error al generar el QR code:", err);
            throw err;
        }
    }

    static generarPDF = async (tickets, qrImages) => {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();

            const chunks = [];
            let pdfBuffer;

            doc.on('data', (chunk) => {
                chunks.push(chunk);
            });

            doc.on('end', () => {
                pdfBuffer = Buffer.concat(chunks);
                resolve(pdfBuffer);
            });

            tickets.forEach((ticket, index) => {
                doc.fontSize(20).text(`Detalles del billete ${index + 1}:`, { align: 'center' });
                doc.fontSize(14).text(`Número de billete: ${ticket.ticketNumber}`);
                doc.text(`Salida: ${ticket.departure}`);
                doc.text(`Destino: ${ticket.destination}`);
                doc.text(`Fecha: ${ticket.date}`);

                doc.moveDown();
                doc.fontSize(20).text(`Código QR del billete ${index + 1}:`, { align: 'center' });
                doc.image(qrImages[index], { fit: [250, 250], align: 'center' });

                if (index !== tickets.length - 1) {
                    doc.addPage();
                }
            });

            doc.end();
        });
    }


    static descargarPDF = async (req, res) => {
        try {
            const tickets = [
                {
                    ticketNumber: "ABC456",
                    departure: "New York",
                    destination: "Los Angeles",
                    date: "2024-03-01",

                },
                {
                    ticketNumber: "DEF456",
                    departure: "Los Angeles",
                    destination: "San Francisco",
                    date: "2024-03-02",

                }
            ];

            const qrImages = await Promise.all(tickets.map((ticket) => this.generarQR(ticket, { size: 300 })));

            const pdfBuffer = await this.generarPDF(tickets, qrImages);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=ticket-details.pdf');
            const pdfStream = new Readable();
            pdfStream.push(pdfBuffer);
            pdfStream.push(null);
            pdfStream.pipe(res);

        } catch (err) {
            console.error("Error:", err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error al generar el PDF");
        }
    };

    static getMisEventos  = async (req, res) => {
        try {
            let id = req.idToken
            const eventos = await eventoConexion.getMisEventos(id)
        
            for (let i = 0; i < eventos.length; i++) {
                const id = eventos[i].id
                const imagen = process.env.URL_PETICION + process.env.PORT + "/api/eventos/upload/" + id
                eventos[i].imagen = imagen
            }

            const response = {
                success: true,
                data: {
                    eventos
                }
            }

            res.status(StatusCodes.OK).json(response)


        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, msg: 'Error en el servidor al obtener el contenido.', sqlMessage: error })
        }
    }

    static modificarEvento = async (req,res) =>{
        try{
            const id = req.params.id

            if(req.files == null){
                console.log('pasa por aqui 1')
                const resultado = await this.modificarContenidoSinImagen(req, id);

                if (resultado == 0) {
                    return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: 'Contenido no encontrado' });
                } else {
                    return res.status(StatusCodes.OK).json({ success: true, msg: 'Contenido modificado exitosamente' });
                }
            }else{
                const imagen = await eventoConexion.getImagen(id)

                if(imagen.dataValues.imagen !=null){
                    console.log('pasa por aqui 2')
                    await this.eliminarImagenAnterior(imagen)
                    const nombre = await subirArchivoEventoPost(req.files, undefined, process.env.UPLOADS_DIR_EVENT);
                    const ruta = `${nombre}`
                    console.log(ruta)

                    const resultado = await this.modificarContenidoConImagen(req, id, ruta);

                    return this.enviarRespuesta(resultado, res)
                } else{
                    console.log('pasa por aqui 3')
                    const nombre = await subirArchivoEventoPost(req.files, undefined, process.env.UPLOADS_DIR_EVENT)
                    const ruta = `${nombre}`

                    const resultado = await this.modificarContenidoConImagen(req, id, ruta)

                    return this.enviarRespuesta(resultado, res)
                }
            }

        }catch(error){

        }
    }

    static modificarContenidoSinImagen = async (req, id) => {
        const evento = { ...req.body };
        return await eventoConexion.modificarEvento(id, evento);
    }

    static eliminarImagenAnterior = async (imagen) => {
        const rutaAnterior = path.join(__dirname, process.env.UPLOADS_PATH, process.env.UPLOADS_DIR_EVENT, imagen.dataValues.imagen);
        if (fs.existsSync(rutaAnterior)) {
            fs.unlinkSync(rutaAnterior);
        }
    }

    static modificarContenidoConImagen = async (req, id, ruta) => {
        const evento = { ...req.body, imagen: ruta };
        return await eventoConexion.modificarEvento(id, evento);
    }

    static enviarRespuesta = (resultado, res) => {
        if (resultado == 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: 'Evento no encontrado' });
        } else {
            return res.status(StatusCodes.OK).json({ success: true, msg: 'Evento modificado exitosamente' });
        }
    }

}

module.exports = eventoController