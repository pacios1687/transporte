const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/usuario/activos',[verificaToken, verificaAdmin_Role], (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    let sort = req.query.sort || 5;
    sort = Number(sort);

    Usuario.find({ estado: true }, 'nombre apellidos usuario email role estado google img ')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });


});


app.get('/usuario/inactivos',[verificaToken, verificaAdmin_Role], (req, res) => {


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    let sort = req.query.sort || 5;
    sort = Number(sort);

    Usuario.find({ estado: false }, 'nombre apellidos usuario email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: false }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });


});
app.get('/usuario/me/:id', verificaToken,(req, res) => {
    let id = req.params.id;

    Usuario.find({ _id: id }, (err, usuarioDB)=>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
           
            usuarios:usuarioDB
           
        });

    });


});
app.post('/usuario',  function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        usuario: body.usuario,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
       
        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});
app.post('/usuario/admin', verificaToken, function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellidos: body.apellidos,
        email: body.email,
        usuario: body.usuario,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
       
        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});

app.put('/usuario/admin/:id',[verificaToken, verificaAdmin_Role], function(req, res) {

        const { id } = req.params;
        const { estado } = req.body;
      
        Usuario.findByIdAndUpdate(id, { estado }, { new: true, runValidators: true }, (err, usuarioDB) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else {
            if (!usuarioDB) {
              res.status(404).send({ message: "No se ha encontrado el usuario." });
            } else {
              if (estado === true) {
                res.status(200).send({ message: "Usuario activado correctamente." });
              } else {
                res
                  .status(200)
                  .send({ message: "Usuario desactivado correctamente." });
              }
            }
          }
        });
 
});

app.put('/usuario/actualizar/:id',verificaToken, function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }

      
        usuarioDB.nombre = body.nombre;
        usuarioDB.usuario = body.usuario;
        usuarioDB.apellidos = body.apellidos;
        usuarioDB.email = body.email;
        usuarioDB.password = bcrypt.hashSync(body.password, 10),
        usuarioDB.role = body.role
        usuarioDB.img = body.img

        usuarioDB.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });




}); 
   


app.put('/usuario/usuario/:id',verificaToken, function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email',  'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {//new: true devuelve el usuario actualizado 
                                                                                                 //runValidators: true devuelve el usuario con las validaciones del modelo
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.put('/usuario/email/:id', verificaToken,function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email',  'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {//new: true devuelve el usuario actualizado 
                                                                                                
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});



app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {


    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});

app.delete('/usuario/admin/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    const { id } = req.params;

    Usuario.findByIdAndRemove(id, (err, userDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!userDeleted) {
          res.status(404).send({ message: "Usuario no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "El usuario ha sido eliminado correctamente." });
        }
      }
    });



});



module.exports = app;