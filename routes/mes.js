const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');
let Mes = require('../models/mes');
let app = express();





// ===========================
//  Crear un nueva mes
// ===========================
app.post('/mes',verificaToken,  (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado 

    let body = req.body;

    let mes = new Mes({
        mes:body.mes,
        year:body.year,
        usuario: body.usuario,
        order:body.order
    });

    mes.save((err, mesDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!mesDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay mes'
                }
            });
        }
       

        res.status(201).json({
            ok: true,
            mes: mesDB
        });

    });

});
// ===========================
//  Obtener todas las mes
// ===========================
app.get('/mes', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Mes.paginate({ }, options, (err, mesDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!mesDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun mes." });
      } else {
        res.status(200).send({ code: 200, mes: mesDB });
      }
    }
  });


});

// ===========================
//  Obtener mes por year
// ===========================
app.get('/mes/year/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Mes.paginate({ year: id   }, options, (err, mesDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!mesDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun mes." });
      } else {
        res.status(200).send({ code: 200, mes: mesDB });
      }
    }
  });

 
});


// ===========================
//  Actualizar  mes order
// ===========================

app.put('/mes/order/:id',verificaToken, function(req, res) {
    let menuItem = req.body;
    const params = req.params;

  Mes.findByIdAndUpdate(params.id, menuItem, (err, mesUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!mesUpdate) {
        res.status(404).send({ message: "No se ha encontrado ninguna mes." });
      } else {
        res.status(200).send({ message: "mes actualizada correctamente.",mesUpdate });
      }
    }
  });
})
// ===========================
//  Obtener todas las mes por url
// ===========================

app.get('/mes/:params',verificaToken,(req, res) => {
    let { params } = req.params;
  
    Mes.findOne({ mes: params }, (err, mesDB)=>{
        if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else {
            if (!mesDB) {
              res.status(404).send({ message: "No se ha encontrado ninguna mes." });
            } else {
              res.status(200).send({ message:  `mes de fecha ${mesDB.date} `,mesDB });
            }
          }
        
  
    });
  
  
  });
  // ===========================
//  Actualizar mes me ID
// ===========================
app.put('/mes/actualizar/:id',verificaToken,  function(req, res) {
  let id = req.params.id;
  let body = req.body;

  Mes.findById(id, (err, mesDB) => {

      if (err) {
          return res.status(500).json({
              ok: false,
              err
          });
      }

      if (!mesDB) {
          return res.status(400).json({
              ok: false,
              err: {
                  message: 'El mes no existe'
              }
          });
      }

    
      mesDB.order = body.order;
      mesDB.usuario = body.usuario;
      mesDB.mes = body.mes;
      mesDB.year = body.year;

      mesDB.save((err, mesGuardado) => {

          if (err) {
              return res.status(500).json({
                  ok: false,
                  err
              });
          }

          res.json({
              ok: true,
              mes: mesGuardado
          });

      });

  });




}); 

// ===========================
//  Eliminar  mes
// ===========================
app.delete('/mes/:id', verificaToken, function(req, res) {

    const { id } = req.params;

    Mes.findByIdAndRemove(id, (err, mesDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!mesDeleted) {
          res.status(404).send({ message: "mes no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "La mes ha sido eliminada correctamente." });
        }
      }
    });



});

module.exports = app;