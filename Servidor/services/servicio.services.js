var Servicio = require('../models/servicio.model');

exports.createServicio = async function (servicioData) {
    var newServicio = new Servicio(servicioData);

    try {
        var savedServicio = await newServicio.save();
        console.log("create servicio: ")
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

exports.getServiciosByUser = async function (query, page, limit) {
    try {
        var options = {
            page,
            limit,
            sort: { createdAt: -1 } // Ordenar por fecha de creación
        };
        var serviciosPaginated = await Servicio.paginate(query, options);
        return serviciosPaginated;
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
            },

            populate: {
                path: 'proveedorId', 
                select: 'imgProfile nombre apellido' 

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

exports.removeServicio = async function (servicioId) {
    try {
        var deletedServicio = await Servicio.findByIdAndRemove(servicioId);
        return deletedServicio;
    } catch (e) {
        throw new Error('Error while Deleting Servicio: ' + e.message);
    }
};

exports.editServicio = async (id, datosActualizados) => {
  try {
    const servicioActualizado = await Servicio.findByIdAndUpdate(
      id,
      datosActualizados,
      
      { new: true } // Para devolver el documento actualizado
    );
    console.log(datosActualizados);
    return servicioActualizado;
  } catch (error) {
    console.error('Error al editar el servicio en el servicio', error);
    throw error; // Propaga el error para manejarlo en el controlador
  }
};