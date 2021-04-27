const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');
let Year = require('../models/year');
let app = express();





// ===========================
//  Crear un nueva year
// ===========================
app.post('/year',verificaToken,  (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado 

    let body = req.body;

    let year = new Year({
        year:body.year,
        usuario: body.usuario,
        order:body.order
    });

    year.save((err, yearDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!yearDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay year'
                }
            });
        }
       

        res.status(201).json({
            ok: true,
            year: yearDB
        });

    });

});
// ===========================
//  Obtener todas las year
// ===========================
app.get('/year', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Year.paginate({ }, options, (err, yearDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!yearDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun year." });
      } else {
        res.status(200).send({ code: 200, year: yearDB });
      }
    }
  });


});



// ===========================
//  Actualizar  year order
// ===========================

app.put('/year/order/:id',verificaToken, function(req, res) {
    let menuItem = req.body;
    const params = req.params;

  Year.findByIdAndUpdate(params.id, menuItem, (err, yearUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!yearUpdate) {
        res.status(404).send({ message: "No se ha encontrado ninguna year." });
      } else {
        res.status(200).send({ message: "year actualizada correctamente.",yearUpdate });
      }
    }
  });
})
// ===========================
//  Obtener todas las year por url
// ===========================

app.get('/year/:params',verificaToken,(req, res) => {
    let { params } = req.params;
  
    Year.findOne({ year: params }, (err, yearDB)=>{
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else {
            if (!yearDB) {
              res.status(404).send({ message: "No se ha encontrado ninguna year." });
            } else {
              res.status(200).send({ message:  `mes de fecha ${yearDB.date} `,yearDB });
            }
          }
        
  
    });
  
  
  });
  // ===========================
//  Actualizar year me ID
// ===========================
app.put('/year/actualizar/:id',verificaToken,  function(req, res) {
  let id = req.params.id;
  let body = req.body;

  Year.findById(id, (err, yearDB) => {

      if (err) {
          return res.status(500).json({
              ok: false,
              err
          });
      }

      if (!yearDB) {
          return res.status(400).json({
              ok: false,
              err: {
                  message: 'El year no existe'
              }
          });
      }

    
      yearDB.order = body.order;
      yearDB.usuario = body.usuario;
      yearDB.year = body.year;

      yearDB.save((err, yearGuardado) => {

          if (err) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }

          res.json({
              ok: true,
              year: yearGuardado
          });

      });

  });




}); 

// ===========================
//  Eliminar  year
// ===========================
app.delete('/year/:id', verificaToken, function(req, res) {

    const { id } = req.params;

    Year.findByIdAndRemove(id, (err, yearDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!yearDeleted) {
          res.status(404).send({ message: "year no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "La year ha sido eliminada correctamente." });
        }
      }
    });



});

module.exports = app;