const express = require('express');
const Pedido = require('../models/pedido');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();


// ===========================
//  Crear un nuevo pedido
// ===========================

app.post('/pedido',  (req, res) => {
    let body = req.body;

    let pedido = new Pedido({
        usuario: body.usuario,
        ruta: body.ruta,
        resumen: body.resumen,
        mes: body.mes,
        year: body.year,
        cliente: body.cliente,
        dirreccion: body.dirreccion,
        cp: body.cp,
        telefono: body.telefono,
        factura: body.factura,
        pedido: body.pedido,
        producto: body.producto,
        precio: body.precio,
        iva: body.iva,
        order: body.order,
        baseImponible: body.baseImponible,
        cantidad: body.cantidad,
        totalPedido: body.totalPedido,
        poblacion: body.poblacion,
        order: body.order,
    });

    pedido.save((err, pedidoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!pedidoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay pedido'
                }
            });
        }
       

        res.status(201).json({
            ok: true,
            pedido: pedidoDB
        });

    });


});

//============================
//  Obtenesr pedido 
// ===========================
app.get('/pedido', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Pedido.paginate({}, options, (err, pedidoDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!pedidoDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun pedido." });
      } else {
        res.status(200).send({ code: 200, pedido: pedidoDB });
      }
    }
  });

});
// ===========================
//  Obtener pedido por resumen
// ===========================
app.get('/pedido/resumen/:id', (req, res) => {


    const { page = 1, limit = 20} = req.query;
  
    const options = {
      page,
      limit: parseInt(limit),
    };
    let {id} = req.params;
    
    Pedido.paginate({ resumen: id   }, options, (err, pedidoDB) => {
           
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!pedidoDB) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun pedido." });
        } else {
          res.status(200).send({ code: 200, pedido: pedidoDB });
        }
      }
    });

   
});
// ===========================
//  Obtener pedido por ruta
// ===========================
app.get('/pedido/ruta/:id', (req, res) => {


    const { page = 1, limit = 20} = req.query;
  
    const options = {
      page,
      limit: parseInt(limit),
    };
    let {id} = req.params;
    
    Pedido.paginate({ ruta: id   }, options, (err, pedidoDB) => {
           
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!pedidoDB) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun pedido." });
        } else {
          res.status(200).send({ code: 200, pedido: pedidoDB });
        }
      }
    });

   
});
// ===========================
//  Obtener pedido por mes
// ===========================
app.get('/pedido/mes/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Pedido.paginate({ mes: id   }, options, (err, pedidoDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!pedidoDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun pedido." });
      } else {
        res.status(200).send({ code: 200, pedido: pedidoDB });
      }
    }
  });

 
});
// ===========================
//  Obtener pedido por year
// ===========================
app.get('/pedido/year/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Pedido.paginate({ year: id   }, options, (err, pedidoDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!pedidoDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun pedido." });
      } else {
        res.status(200).send({ code: 200, pedido: pedidoDB });
      }
    }
  });

 
});
// ===========================
//  Obtener pedido 
// ===========================
app.get('/pedido/:id', (req, res) => {


    const { page = 1, limit = 20} = req.query;
  
    const options = {
      page,
      limit: parseInt(limit),
    };
    let {id} = req.params;
    
    Pedido.paginate({ _id: id   }, options, (err, pedidoDB) => {
           
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!pedidoDB) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun pedido." });
        } else {
          res.status(200).send({ code: 200, pedido: pedidoDB });
        }
      }
    });

   
});
// ===========================
//  Actualizar pedido me ID
// ===========================
app.put('/pedido/:id', verificaToken,  function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Pedido.findById(id, (err, pedidoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!pedidoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El pedido no existe'
                }
            });
        }

      
        pedidoDB.cliente = body.cliente;
        pedidoDB.dirreccion = body.dirreccion;
        pedidoDB.cp = body.cp;
        pedidoDB.baseImponible = body.baseImponible ;
        pedidoDB.ruta = body.ruta;
        pedidoDB.resumen = body.resumen ;
        pedidoDB.poblacion = body.poblacion ;
        pedidoDB.telefono= body.telefono;
        pedidoDB.producto= body.producto;
        pedidoDB.totalPedido = body.totalPedido;
        pedidoDB.cantidad = body.cantidad ;
        pedidoDB.iva = body.iva;
        pedidoDB.order = body.order;
        pedidoDB.precio = body.precio;
        pedidoDB.factura = body.factura;
        pedidoDB.pedido = body.pedido;
        pedidoDB.mes = body.mes,
        pedidoDB.year = body.year,
        pedidoDB.save((err, pedidoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                pedido: pedidoGuardado
            });

        });

    });




});


// ===========================
//  Actualizar  pedido
// ===========================

app.put('/pedido/order/:id',verificaToken, function(req, res) {
  let menuItem = req.body;
  const params = req.params;

Pedido.findByIdAndUpdate(params.id, menuItem, (err, pedidoUpdate) => {
  if (err) {
    res.status(500).send({ message: "Error del servidor." });
  } else {
    if (!pedidoUpdate) {
      res.status(404).send({ message: "No se ha encontrado ninguna pedido." });
    } else {
      res.status(200).send({ message: "Plataforma actualizada correctamente.",pedidoUpdate });
    }
  }
});
})
// ===========================
//  Actualizar pedido activos y inactivos por ID 
// ===========================
app.put('/pedido/activos/:id',verificaToken, function(req, res) {

    const { id } = req.params;
    const { estado } = req.body;
   
    Pedido.findByIdAndUpdate(id, { estado },{ new: true, runValidators: true }, (err, pedidoDB) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!pedidoDB) {
          res.status(404).send({ message: "No se ha encontrado el pedido." });
         
        } else {
          if ( pedidoDB.activo === true) {
           
             pedidoDB.start = new Date();
             pedidoDB.save((err, pedidoGuardado) => {

              if (err) {
                  return res.status(500).json({
                      ok: false,
                      err
                  });
              }
  
              res.json({
                  ok: true,
                  pedidoGuardado,
                  message: "pedido activado correctamente y actualizado la fecha.",
              });
  
          });
  
          } else {
          
              pedidoDB.end = new Date();
              pedidoDB.save((err, pedidoGuardado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                res.json({
                    ok: true,
                    pedidoGuardado,
                    message: "pedido desactivado correctamente y actualizado la fecha.",
                });
    
            });
    
          }
        }
      }
    });

});

// ===========================
//  Eliminar pedido  ID
// ===========================
app.delete('/pedido/:id', verificaToken, function(req, res) {

    const { id } = req.params;

    Pedido.findByIdAndRemove(id, (err, pedidoDB) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!pedidoDB) {
          res.status(404).send({ message: "pedido no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "El pedido ha sido eliminado correctamente." });
        }
      }
    });



});

// ===========================
//  Buscar pedido
// ===========================
app.get('/pedido-buscar', (req, res) => {

  let termino = req.query.termino;
  let regex = new RegExp(termino, 'i');

  const { page = 1, limit = 2} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };

  Pedido.paginate({ factura: regex }, options, (err, pedidoDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!pedidoDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun pedido." });
      } else {
        res.status(200).send({ code: 200, pedido: pedidoDB });
      }
    }
  });

 

});
// ===========================
//  Buscar pedido
// ===========================
app.get('/pedido-buscar', (req, res) => {

    let termino = req.query.termino;
    let regex = new RegExp(termino, 'i');
  
    const { page = 1, limit = 2} = req.query;
  
    const options = {
      page,
      limit: parseInt(limit),
    };
  
    Pedido.paginate({ cliente: regex }, options, (err, pedidoDB) => {
           
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!pedidoDB) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun pedido." });
        } else {
          res.status(200).send({ code: 200, pedido: pedidoDB });
        }
      }
    });
  
   
  
  });

module.exports = app;