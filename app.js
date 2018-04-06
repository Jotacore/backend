var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary: require('bluebird')}) //Método connect. Entre los paréntesis escribimos la uri: una ip, el puerto y el nombre de la base de datos. Las url son un tipo de uri. Erp Enterprise Resouce Planning es como llamamos a nuestra base de datos. Añadimos entre llaves la librería bluebird
            .then(()=>{ //Para saber que nos hemos conectado bien
                console.log('Conexión a la DB ok ');
            }) 
            .catch((err)=>{ //Gestión de los errores en JavaScript. Err es el parámetro de error
                console.error('Error de conexión', err);
            }) 

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.use('/proveedor', proveedor); //Lo que entre por la ruta 3000 (en el puerto 3000 por la ruta proveedor) lo va a gestionar el archivo proveedor

app.listen(3000, function(){  //Método listen para que el servidor pueda funcionar
    console.log('Servidor ok en el puerto 3000');
})