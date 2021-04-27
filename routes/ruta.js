const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');
let Ruta = require('../models/ruta');
let app = express();





// ===========================
//  Crear un nueva ruta
// ===========================
app.post('/ruta',verificaToken,  (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado 

    let body = req.body;

    let ruta = new Ruta({
      mes:body.mes,
      year:body.year,
        usuario: body.usuario,
        order:body.order
    });

    ruta.save((err, rutaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!rutaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay ruta'
                }
            });
        }
       

        res.status(201).json({
            ok: true,
            ruta: rutaDB
        });

    });

});
// ===========================
//  Obtener todas las ruta
// ===========================
app.get('/ruta', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Ruta.paginate({ }, options, (err, rutaDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!rutaDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun ruta." });
      } else {
        res.status(200).send({ code: 200, ruta: rutaDB });
      }
    }
  });


});
// ===========================
//  Obtener ruta por mes
// ===========================
app.get('/ruta/mes/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Ruta.paginate({ mes: id   }, options, (err, rutaDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!rutaDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun ruta." });
      } else {
        res.status(200).send({ code: 200, ruta: rutaDB });
      }
    }
  });

 
});
// ===========================
//  Obtener ruta por mes
// ===========================
app.get('/ruta/year/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Ruta.paginate({ year: id   }, options, (err, rutaDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!rutaDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun ruta." });
      } else {
        res.status(200).send({ code: 200, ruta: rutaDB });
      }
    }
  });

 
});

// ===========================
//  Actualizar  ruta order
// ===========================

app.put('/ruta/order/:id',verificaToken, function(req, res) {
    let menuItem = req.body;
    const params = req.params;

  Ruta.findByIdAndUpdate(params.id, menuItem, (err, rutaUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!rutaUpdate) {
        res.status(404).send({ message: "No se ha encontrado ninguna ruta." });
      } else {
        res.status(200).send({ message: "Ruta actualizada correctamente.",rutaUpdate });
      }
    }
  });
})
// ===========================
//  Obtener todas las ruta por url
// ===========================

app.get('/ruta/:params',verificaToken,(req, res) => {
    let { params } = req.params;
  
    Ruta.findOne({ date: params }, (err, rutaDB)=>{
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else {
            if (!rutaDB) {
              res.status(404).send({ message: "No se ha encontrado ninguna ruta." });
            } else {
              res.status(200).send({ message:  `Ruta de fecha ${rutaDB.date} `,rutaDB });
            }
          }
        
  
    });
  
  
  });
  // ===========================
//  Actualizar ruta me ID
// ===========================
app.put('/ruta/actualizar/:id',verificaToken,  function(req, res) {
  let id = req.params.id;
  let body = req.body;

  Ruta.findById(id, (err, rutaDB) => {

      if (err) {
          return res.status(500).json({
              ok: false,
              err
          });
      }

      if (!rutaDB) {
          return res.status(400).json({
              ok: false,
              err: {
                  message: 'El ruta no existe'
              }
          });
      }

      rutaDB.mes = body.mes,
      rutaDB.year = body.year,
      rutaDB.order = body.order;
      rutaDB.usuario = body.usuario;
     

      rutaDB.save((err, rutaGuardado) => {

          if (err) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }

          res.json({
              ok: true,
              ruta: rutaGuardado
          });

      });

  });




}); 

// ===========================
//  Eliminar  ruta
// ===========================
app.delete('/ruta/:id', verificaToken, function(req, res) {

    const { id } = req.params;

    Ruta.findByIdAndRemove(id, (err, rutaDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!rutaDeleted) {
          res.status(404).send({ message: "Ruta no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "La Ruta ha sido eliminada correctamente." });
        }
      }
    });



});

module.exports = app;