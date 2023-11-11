var Servicio = require('../models/servicio.model');

exports.createServicio = async function (servicioData) {
    var newServicio = new Servicio(servicioData);

    try {
        var savedServicio = await newServicio.save();
        return savedServicio;
    } catch (e) {
        throw new Error('Error while Creating Servicio: ' + e.message);
    }
};

exports.getServicioById = async function (servicioId) {
    try {
        var servicio = await Servicio.findById(servicioId);
        if (!servicio) {
            throw new Error('Servicio not found');
        }
        return servicio;
    } catch (e) {
        throw new Error('Error while Getting Servicio by ID: ' + e.message);
    }
};

exports.getAllServicios = async function (query, page, limit) {
    try {
        var options = {
            page,
            limit,
            sort: { createdAt: -1 } // Ordenar por fecha de creación o cualquier otro criterio
        };
        var serviciosPaginated = await Servicio.paginate(query, options);
        return serviciosPaginated; // Devuelve el resultado paginado
    } catch (e) {
        throw Error('Error while Paginating Servicios: ' + e.message);
    }
};

exports.getServiciosByEstado = async function(estado, page, limit) {
    try {
        var options = {
            page,
            limit,
            sort: {
                createdAt: -1 
            }
        };
        
        // Asegúrate de que el valor de `estado` se pasa correctamente a la consulta.
        var servicios = await Servicio.paginate({ estado: estado }, options);
        return servicios;
    } catch (e) {
        throw Error('Error while Paginating Servicios by Estado: ' + e.message);
    }
};

exports.updateEstadoServicio = async function (servicioId, nuevoEstado) {
    try {
        console.log(`Actualizando servicio con ID: ${servicioId} a estado: ${nuevoEstado}`); // Añade esto para logging
        var servicio = await Servicio.findById(servicioId);
        if (!servicio) {
            throw new Error('Servicio not found');
        }
        servicio.estado = nuevoEstado;
        var updatedServicio = await servicio.save();
        return updatedServicio;
    } catch (e) {
        throw new Error('Error while updating Servicio: ' + e.message);
    }
};

exports.deleteServicio = async function (servicioId) {
    try {
        var deletedServicio = await Servicio.findByIdAndRemove(servicioId);
        return deletedServicio;
    } catch (e) {
        throw new Error('Error while Deleting Servicio: ' + e.message);
    }
};