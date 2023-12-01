const Contratacion = require('../models/contratacion.model');
const sgMail = require('@sendgrid/mail');
const Servicio = require('../models/servicio.model');
const User = require('../models/User.model')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.createContratacion = async function(contratacionData) {
    try {
        const servicio = await Servicio.findById(contratacionData.servicioId);
        if (!servicio) {
            throw new Error('Servicio no encontrado');
        }

        const proveedor = await User.findById(servicio.proveedorId);
        if (!proveedor) {
            throw new Error('Proveedor no encontrado');
        }

        const newContratacion = new Contratacion({
            ...contratacionData,
            userId: proveedor._id,
            tipoClase: servicio.tipoClase,
            frecuencia: servicio.frecuencia,
        });

        await newContratacion.save();
        const destinatario = proveedor.email;
       // const destinatariotest = 'santglez51@gmail.com';

        // Envío del correo electrónico al proveedor
        const msg = {
            to: destinatario, 
            from: 'santiagojgonzalez@uade.edu.ar', // Tu dirección de correo electrónico verificada en SendGrid
            subject: `Contratación de ${servicio.nombre}`, // Nombre del servicio
            text: `Detalles de la contratación en formato texto...`, // Versión en texto para clientes de correo sin soporte HTML
    html: `
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 7px;">
            <h1 style="color: #333;">Detalles de la Contratación</h1>
            <p><strong>Nombre del Servicio:</strong> ${servicio.nombre}</p>
            <p><strong>Cantidad de Clases:</strong> ${contratacionData.cantclases}</p>
            <h2 style="color: #333;">Datos del Cliente:</h2>
            <ul>
                <li><strong>Nombre:</strong> ${contratacionData.cliente.nombre}</li>
                <li><strong>Apellido:</strong> ${contratacionData.cliente.apellido}</li>
                <li><strong>Email:</strong> ${contratacionData.cliente.email}</li>
                <li><strong>Teléfono:</strong> ${contratacionData.cliente.telefono}</li>
            </ul>
        </div>`
        };
        await sgMail.send(msg);     
        return newContratacion;
    } catch (e) {
        throw new Error('Error while sending email: ' + e.message);
    }
};


exports.getAllContrataciones = async function() {
    try {
        const contrataciones = await Contratacion.find({});
        return contrataciones;
    } catch (e) {
        throw Error('Error while Getting all Contrataciones: ' + e.message);
    }
};

exports.updateEstadoContratacion = async function(contratacionId, nuevoEstado) {
    try {
        const updatedContratacion = await Contratacion.findByIdAndUpdate(
            contratacionId,
            { estado: nuevoEstado },
            { new: true }
        );
        return updatedContratacion;
    } catch (e) {
        throw Error('Error while updating Contratacion: ' + e.message);
    }
};

exports.getContratacionesByUsuario = async function (userId, page, limit) {
    try {
        const options = {
            page: page,
            limit: limit,
            populate: 'servicioId' // Puedes especificar poblaciones adicionales aquí si es necesario
        };
        
        const contrataciones = await Contratacion.paginate({ userId: userId }, options);
        return contrataciones;
    } catch (error) {
        throw Error('Error while getting Contrataciones by User ID: ' + error.message);
    }
};