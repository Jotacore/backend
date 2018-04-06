var express = require('express');
var mongooose = require('mongoose');

var Proveedor = require('../models/proveedor'); //Llamamos al esquema de proveedor. Como en Angular, no hace falta ponerle la extensión. Lo importamos de mongoose

var app = express();

app.get('/', (req, res, next) =>{
    Proveedor.find({}).exec((err,datos)=>{
        if(err){     
            return res.status(400).json({   
                ok: false,
                mensaje: 'Error de conexión',
                errores: err
            })   
        }

        res.status(200).json({ //Código de que el servidor devuelve un recurso con éxito
            ok: true,
            proveedores: datos
        })
    });
});

//Inauguramos nuestra API con un método POST
app.post('/',(req, res)=>{ //El método recibe un ruta (raíz), la función callBack (que espera) como flecha, que recibe los parámetros request y response

    var body = req.body; //Creamos una variable donde almacenamos el cuerpo del mensaje

    var proveedor = new Proveedor({ //Creamos el snipet proveedor y lo guardamos en la base de datos con un método mongoose
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });

    proveedor.save((err, datos)=>{  //Graba proveedor en la DB. Dentro de save metemos una función flecha, con los parámetros de error, y lo que haya grabado lo devuelve en el segundo parámetro
        if(err){     //Gestionamos lo que hace con esos dos parámetros
            return res.status(400).json({   //400: código de estado
                ok: false, //porque es un error
                mensaje: 'Error al crear el proveedor',
                errores: err
            })   
        }

        res.status(201).json({ //Código de estado apropiado cuando crea algo. Se crea un recurso
            ok: true,
            mensaje: 'Proveedor creado',
            proveedor: datos
        }) 
    })
});

app.put('/:id', function(req, res, next){ //Método put para actualizar. Campo que queremos cambiar (id)

    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos){ //Método de MongoDB  1º parámetro: req.params.id busca en la base de datos, para localizar el id que vamos a actualizar 2º parámetro: obtenemos lo que queremos cambiar, donde está el json que vamos a actualizar 3º parámetro: localiza errores
        console.log(req.params.id, req.body, datos.nombre);
        if(err){     
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al actualizar el proveedor',
                errores: err
            })   
        }
        res.status(200).json({
            ok: true,
            mensaje: 'El proveedor' + datos.nombre + ' se ha actualizado'
        })
    });
})

app.delete('/:id', function(req, res, next){ //Método delete para eliminar. Puede copiarse del put al tener que hacer solo pequeños cambios en el código

    Proveedor.findByIdAndRemove(req.params.id, function(err, datos){ //Se podría quitar el parámetro datos, pero lo dejamos por si lo usamos más adelante

        if(err){     
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al eliminar el proveedor',
                errores: err
            })   
        }
        res.status(200).json({
            ok: true,
            mensaje: 'El proveedor ' + datos.nombre + ' se ha eliminado'
        })
    });
})

module.exports = app;  //Para usar el archivo app en el archivo principal de backend hay que exportarlo al mismo