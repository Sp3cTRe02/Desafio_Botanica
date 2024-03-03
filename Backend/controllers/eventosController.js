const eventoConexion = require('../database/eventosConexion')
const { StatusCodes } = require('http-status-codes')
const { Readable } = require('stream')
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode')
const PDFDocument = require('pdfkit')
const {subirArchivoEventoPost} = require('../helpers/subir-archivo-evento');


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
                doc.text(`Fecha de emisión: ${ticket.fechaParticipacion}`);
                doc.text(`Nombre del evento: ${ticket.nombreEvento}`);
                doc.text(`Fecha del evento: ${ticket.fechaInicio}`);
                doc.text(`Ubicación: ${ticket.ubicacion}`);
                doc.text(`Nombre: ${ticket.nombre}`);
                doc.text(`Primer apellido: ${ticket.ap1}`);
                doc.text(`Segundo apellido: ${ticket.ap2}`);

                

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
            const tickets = await eventoConexion.getDetallesEntradas();
            const detallesTickets = tickets[0]; 
            console.log(detallesTickets);
    
            const qrImages = await Promise.all(detallesTickets.map((ticket) => this.generarQR(ticket, { size: 300 })));
    
            const pdfBuffer = await this.generarPDF(detallesTickets, qrImages);
    
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
    }

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
                const resultado = await this.modificarContenidoSinImagen(req, id);

                if (resultado == 0) {
                    return res.status(StatusCodes.NOT_FOUND).json({ success: false, msg: 'Contenido no encontrado' });
                } else {
                    return res.status(StatusCodes.OK).json({ success: true, msg: 'Contenido modificado exitosamente' });
                }
            }else{
                const imagen = await eventoConexion.getImagen(id)

                if(imagen.dataValues.imagen !=null){
                    await this.eliminarImagenAnterior(imagen)
                    const nombre = await subirArchivoEventoPost(req.files, undefined, process.env.UPLOADS_DIR_EVENT);
                    const ruta = `${nombre}`
                    console.log(ruta)

                    const resultado = await this.modificarContenidoConImagen(req, id, ruta);

                    return this.enviarRespuesta(resultado, res)
                } else{
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

    static participarEvento = async (req, res) => {
        try {
            const idUsuario = req.idToken;
            const idEvento = req.params.id;
    
            const plazasTotales = await eventoConexion.getTotalPlazas(idEvento);
            const plazasOcupadas = await eventoConexion.getPlazasOcupadas(idEvento);
            const plazasRestantes = plazasTotales.dataValues.cantidadMax - plazasOcupadas;
    
            if (plazasRestantes <= 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    data: {
                        msg: 'No quedan plazas disponibles para este evento.'
                    }
                });
            }
    
            if (plazasOcupadas >= plazasTotales.dataValues.cantidadMax) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    data: {
                        msg: 'Se alcanzó el límite de participantes para este evento.'
                    }
                });
            }
    
            const cantidadEntradas = req.body.cantidadEntradas;
    
            const inserciones = [];
    
            for (let i = 0; i < cantidadEntradas; i++) {

                const fechaActual = new Date()
                fechaActual.setHours(fechaActual.getHours() + 1)

                const contenido = {
                    ...req.body,
                    idUsuario: idUsuario,
                    idEvento: idEvento,
                    fechaParticipacion:fechaActual

                };
                inserciones.push(eventoConexion.participarEvento(contenido));
            }
    
            // Espera a que todas las inserciones se completen
            await Promise.all(inserciones);
    

            console.log("Contenido registrado correctamente");
            return res.status(StatusCodes.CREATED).json({
                success: true,
                data: {
                    msg: 'Registrado correctamente',
                }
            });
    
        } catch (error) {
            console.error("Error en el servidor al registrar contenido:", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: 'Error en el servidor al registrar contenido.',
                sqlMessage: error
            });
        }
    };
    

}

module.exports = eventoController