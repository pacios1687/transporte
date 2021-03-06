const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Resumen= require('../models/resumen');
const Incidencias = require('../models/incidencias');

const fs = require('fs');
const path = require('path');


// default options
app.use(fileUpload());


app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }

    // Valida tipo
    let tiposValidos = ['resumen', 'incidencias','usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidas son ' + tiposValidos.join(', ')
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    // Cambiar nombre al archivo
    // 183912kuasidauso-123.jpg
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds()  }.${ extension }`;


    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        // Aqui, imagen cargada
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else if(tipo === 'resumen') {
            imagenResumen(id, res, nombreArchivo);
        }else{
            imagenIncidencias(id, res, nombreArchivo);
        }

    });

});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {

            borraArchivo(nombreArchivo, 'usuarios');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuaro no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {

            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });

        });


    });


}



function imagenResumen(id, res, nombreArchivo) {

    Resumen.findById(id, (err, resumenDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'resumen');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!resumenDB) {

            borraArchivo(nombreArchivo, 'resumen');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Resumen no existe'
                }
            });
        }

        borraArchivo(resumenDB.img, 'resumen')

        resumenDB.img = nombreArchivo;

        resumenDB.save((err, resumenGuardado) => {

            res.json({
                ok: true,
                resumen: resumenGuardado,
                img: nombreArchivo
            });

        });


    });


}
function imagenIncidencias(id, res, nombreArchivo) {

    Incidencias.findById(id, (err, incidenciasDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'incidencias');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!incidenciasDB) {

            borraArchivo(nombreArchivo, 'incidencias');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'incidencias no existe'
                }
            });
        }

        borraArchivo(incidenciasDB.img, 'incidencias')

        incidenciasDB.img = nombreArchivo;

        incidenciasDB.save((err, incidenciasGuardado) => {

            res.json({
                ok: true,
                incidencias: incidenciasGuardado,
                img: nombreArchivo
            });

        });


    });


}



function borraArchivo(nombreImagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }


}

module.exports = app;