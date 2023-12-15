var ServicioService = require('../services/servicio.services');
const Servicio = require('../models/servicio.model');
const User = require('../models/User.model');

async function obtenerExperienciaDeUsuario(userId) {
    try {
        const usuario = await User.findById(userId).exec();
        return usuario ? usuario.experiencia : null;
    } catch (error) {
        console.error("Error al obtener la experiencia del usuario:", error);
        throw new Error(error);
    }
}

async function obtenerTituloDeUsuario(userId) {
    try {
        const usuario = await User.findById(userId).exec();
        return usuario ? usuario.titulo : null;
    } catch (error) {
        console.error("Error al obtener la experiencia del usuario:", error);
        throw new Error(error);
    }
}


// Async Controller function to create a service
exports.createServicio = async function (req, res, next) {

    let experienciaUsuario = await obtenerExperienciaDeUsuario(req.userId);
    let tituloUsuario = await obtenerTituloDeUsuario(req.userId);

    var servicioData = {
        proveedorId: req.userId,
        nombre: req.body.nombre,
        tipoClase: req.body.tipoClase,
        descripcion: req.body.descripcion,
        titulo: tituloUsuario,
        experiencia: experienciaUsuario,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        costo: req.body.costo,
        estado: req.body.estado 
    };
    try {
        var createdServicio = await ServicioService.createServicio(servicioData);
        console.log("servicio create controller");
        res.status(201).json({ servicio: createdServicio, message: "Servicio successfully created" });
    } catch (e) {
       
        res.status(400).json({ message: e.message });
    }
};

// Async Controller function to update a service status
exports.updateEstadoServicio = async function (req, res, next) {
    try {
       
        const servicioId = req.params.id;
        const nuevoEstado = req.body.estado;

       
        const updatedServicio = await ServicioService.updateEstadoServicio(servicioId, nuevoEstado);

        res.status(200).json({ servicio: updatedServicio, message: "Estado del servicio actualizado con éxito" });
    } catch (e) {
        res.status(400).json({ message: "Error al actualizar el estado del servicio: " + e.message });
    }
};

// Async Controller function to delete a service
exports.removeServicio = async function (req, res, next) {
    try {
        var deleted = await ServicioService.removeServicio(req.params.id);
        res.status(200).json({ message: "Servicio successfully deleted" });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};


exports.getServicioById = async function (req, res, next) {
    try {
        var servicio = await ServicioService.getServicioById(req.params.id);
        res.status(200).json({ servicio: servicio, message: "Servicio retrieved successfully" });
    } catch (e) {
        res.status(404).json({ message: e.message }); // Usar el código 404 para "No encontrado"
    }
};


exports.getServiciosByEstado = async function(req, res, next) {
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let estado = req.params.estado; 

    try {
        var servicios = await ServicioService.getServiciosByEstado(estado, page, limit);
        return res.status(200).json({
            status: 200,
            data: servicios,
            message: "Servicios retrieved successfully"
        });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};


exports.getNombreServicios = async function(req, res, next) {
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    try {
        var servicios = await ServicioService.getNombreServicios({estado: "activo"}, page, limit);
        return res.status(200).json({
            status: 200,
            data: servicios.docs,
            message: "Nombres de servicios obtenidos con éxito"
        });
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
};


exports.getServiciosByUser = async function(req, res, next) {
    let userId = req.userId; 
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 25;

    try {
        var servicios = await ServicioService.getServiciosByUser({ proveedorId: userId }, page, limit);
        return res.status(200).json({
            status: 200,
            data: servicios.docs,
            message: "Servicios retrieved successfully"
        });
    } catch (e) {
        res.status(400).json({ status: 400, message: e.message });
    }
};

exports.editServicio = async (req, res) => {
    try {
      
      const { id } = req.params;
      const updateFields = {};

      if (req.body.nombre) {
        updateFields.nombre = req.body.nombre;
      }
      if (req.body.tipoClase) {
        updateFields.tipoClase = req.body.tipoClase;
      }
      if (req.body.descripcion) {
        updateFields.descripcion = req.body.descripcion;
      }
      if (req.body.duracion) {
        updateFields.duracion = req.body.duracion;
      }
      if (req.body.costo) {
        updateFields.costo = req.body.costo;
      }
      if (req.body.frecuencia) {
        updateFields.frecuencia = req.body.frecuencia;
      }
      
      const servicioActualizado = await Servicio.findByIdAndUpdate(
        id,
      updateFields,
      { new: true }  
      );

      console.log(servicioActualizado);
  
      if (!servicioActualizado) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
  
      res.status(200).json(servicioActualizado);
    } catch (error) {
      console.error('Error al editar el servicio', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };