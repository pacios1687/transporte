const express = require('express');
const Resumen = require('../models/resumen');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();


// ===========================
//  Crear un nuevo resumen
// ===========================

app.post('/resumen',  (req, res) => {
    let body = req.body;

    let resumen = new Resumen({
        usuario: body.usuario,
        ruta: body.ruta,
        mes: body.mes,
        year: body.year,
        destino: body.destino,
        transportista: body.transportista,
        factura: body.factura,
        pedido: body.pedido,
        totalPed: body.totalPed,
        efectivo: body.efectivo,
        visa: body.visa,
        baseImponible: body.end,
        montaje: body.montaje,
      
    });

    resumen.save((err, resumenDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!resumenDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay resumen'
                }
            });
        }
       

        res.status(201).json({
            ok: true,
            resumen: resumenDB
        });

    });


});
// ===========================
//  Obtener todas las resumen por url
// ===========================

app.get('/resumen/:params',verificaToken,(req, res) => {
  let { params } = req.params;

  Resumen.findOne({ factura: params }, (err, resumenDB)=>{
      if (err) {
          res.status(500).send({ message: "Error del servidor." });
        } else {
          if (!resumenDB) {
            res.status(404).send({ message: "No se ha encontrado ninguna resumen." });
          } else {
            res.status(200).send({ message: `Resumen de factura ${resumenDB.factura}`,resumenDB });
          }
        }
      

  });


});
//============================
//  Obtenesr resumen 
// ===========================
app.get('/resumen', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Resumen.paginate({}, options, (err, resumenDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!resumenDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun resumen." });
      } else {
        res.status(200).send({ code: 200, resumen: resumenDB });
      }
    }
  });

});
// ===========================
//  Obtener resumen por ruta
// ===========================
app.get('/resumen/ruta/:id', (req, res) => {


    const { page = 1, limit = 20} = req.query;
  
    const options = {
      page,
      limit: parseInt(limit),
    };
    let {id} = req.params;
    
    Resumen.paginate({ ruta: id   }, options, (err, resumenDB) => {
           
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!resumenDB) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun resumen." });
        } else {
          res.status(200).send({ code: 200, resumen: resumenDB });
        }
      }
    });

   
});
// ===========================
//  Obtener resumen por mes
// ===========================
app.get('/resumen/mes/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Resumen.paginate({ mes: id   }, options, (err, resumenDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!resumenDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun resumen." });
      } else {
        res.status(200).send({ code: 200, resumen: resumenDB });
      }
    }
  });

 
});
// ===========================
//  Obtener resumen por year
// ===========================
app.get('/resumen/year/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Resumen.paginate({ year: id   }, options, (err, resumenDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!resumenDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun resumen." });
      } else {
        res.status(200).send({ code: 200, resumen: resumenDB });
      }
    }
  });

 
});
// ===========================
//  Actualizar resumen me ID
// ===========================
app.put('/resumen/:id', verificaToken,  function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Resumen.findById(id, (err, resumenDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!resumenDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El resumen no existe'
                }
            });
        }

      
        resumenDB.factura = body.factura;
        resumenDB.pedido = body.pedido;
        resumenDB.totalPedido = body.totalPedido;
        resumenDB.baseImponible = body.baseImponible ;
        resumenDB.ruta = body.ruta;
        resumenDB.montaje = body.montaje ;
        resumenDB.visa = body.visa ;
        resumenDB.efectivo= body.efectivo
        resumenDB.transportista= body.transportista
        resumenDB.destino = body.destino
        resumenDB.mes = body.mes,
        resumenDB.year = body.year,
        resumenDB.save((err, resumenGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                resumen: resumenGuardado
            });

        });

    });




});


// ===========================
//  Actualizar  resumen
// ===========================

app.put('/resumen/order/:id',verificaToken, function(req, res) {
  let menuItem = req.body;
  const params = req.params;

Resumen.findByIdAndUpdate(params.id, menuItem, (err, resumenUpdate) => {
  if (err) {
    res.status(500).send({ message: "Error del servidor." });
  } else {
    if (!resumenUpdate) {
      res.status(404).send({ message: "No se ha encontrado ninguna resumen." });
    } else {
      res.status(200).send({ message: "Plataforma actualizada correctamente.",resumenUpdate });
    }
  }
});
})

// ===========================
//  Eliminar resumen  ID
// ===========================
app.delete('/resumen/:id', verificaToken, function(req, res) {

    const { id } = req.params;

    Resumen.findByIdAndRemove(id, (err, resumenDB) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!resumenDB) {
          res.status(404).send({ message: "resumen no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "El resumen ha sido eliminado correctamente." });
        }
      }
    });



});

// ===========================
//  Buscar resumen
// ===========================
app.get('/resumen/search', (req, res) => {

  let termino = req.query.termino;
  let regex = new RegExp(termino, 'i');

  const { page = 1, limit = 2} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };

  Resumen.paginate({ factura: regex  }, options, (err, resumenDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!resumenDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun resumen." });
      } else {
        res.status(200).send({ code: 200, resumen: resumenDB });
      }
    }
  });

 

});

module.exports = app;