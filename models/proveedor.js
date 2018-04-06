var mongoose = require('mongoose'); //Llamamos a mongoose
var unique = require('mongoose-unique-validator');

var ProveedorSchema = new mongoose.Schema({  //Llamamos al esquema
    nombre: String, //Creamos un objeto donde definimos los campos que va a tener nuestro objeto proveedor, los que vengan de la aplicación y los que tenga la DB. Mongoose te permite también tiparlos
    cif: {type: String, unique: true},
    domicilio: String,
    cp: Number,
    localicalidad: String,
    provincia: String,
    telefono: String, //No se pone number por si el número empieza por +34
    email: String,
    contacto: String //Al ser un objeto, el último campo no lleva coma
}) 

ProveedorSchema.plugin(unique, {message: 'El proveedor con ese CIF ya existe'});

module.exports = mongoose.model('Proveedor', ProveedorSchema); //Pongo este modelo en el servidor del API //Hasta ahora este modelo js no hace nada salvo tipar los campos
