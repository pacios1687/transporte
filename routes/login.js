const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


const Usuario = require('../models/usuario');

const app = express();



app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

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
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token1 = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token1
        });


    });

});


app.post('/login/admin',(req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

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
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }
        if(usuarioDB.role === "USER_ROLE" ){
            return res.json({
                ok: false,
                err: {
                    message: 'El usuario no esta Autorizado'
                }
            });

         }
         
         if(!usuarioDB.role === "ADMIN_ROLE" || !usuarioDB.role === "EDITOR_ROLE" ){
            return res.json({
                ok: false,
                err: {
                    message: 'El usuario no esta Autorizado'
                }
            });

         }
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    });

});

// Configuraciones de Google
async function verify(token) {
    const ticket = await client.verifyIdToken({
         idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        usuario: payload.given_name,
        apellidos: payload.family_name,
        email: payload.email,
        img: payload.picture,
        google: true,
    }

}


app.post('/google', async(req, res) => {

    let token = req.body.idToken;
    console.log(token)
    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            });
        });

        Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
    
            if (usuarioDB) {
    
                if (usuarioDB.google === false) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Debe de usar su autenticación normal'
                        }
                    });
                }  else {
                    let token = jwt.sign({
                        usuario: usuarioDB
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
    
    
                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token,
                    });
    
                }
    
            } else {
                // Si el usuario no existe en nuestra base de datos
                let usuario = new Usuario();
    
                usuario.nombre = googleUser.nombre;
                usuario.apellidos = googleUser.apellidos;
                usuario.usuario = googleUser.usuario;
                usuario.email = googleUser.email;
                usuario.img = googleUser.img;
                usuario.google = true;
                usuario.password = ':)';
    
                usuario.save((err, usuarioDB) => {
    
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    };
    
                    let token = jwt.sign({
                        usuario: usuarioDB
                    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
    
    
                    return res.json({
                        ok: true,
                        usuario: usuarioDB,
                        token,
                    });
    
    
                });
    
            }
    
    
        });
    
    
    });
    
   







module.exports = app;