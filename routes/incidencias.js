const express = require('express');
const Incidencias = require('../models/incidencias');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();


// ===========================
//  Crear una nueva incidencias
// ===========================

app.post('/incidencias',  (req, res) => {
    let body = req.body;

    let incidencias = new Incidencias({
        usuario: body.usuario,
        ruta: body.ruta,
        mes: body.mes,
        year: body.year,
        numeroIncidencias: body.numeroIncidencias,
        incidencias: body.incidencias,
        order: body.order,
        
    });

    incidencias.save((err, incidenciasDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!incidenciasDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No hay incidencias'
                }
            });
        }
       

        res.status(201).json({
            ok: true,
            incidencias: incidenciasDB
        });

    });


});
// ===========================
//  Obtener todos los Incidencias  por url
// ===========================

app.get('/incidencias/:params',(req, res) => {
  let { params } = req.params;

  Incidencias.findOne({ incidencias: params }, (err, incidenciasDB)=>{
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }
     
      
     

  });


});

//===========================
//  Obtenesr incidencias activas
// ===========================
app.get('/incidencias-activas', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Incidencias.paginate({ estado : true   }, options, (err, incidenciasDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }


  });

});
//===========================
//  Obtenesr incidencias 
// ===========================
app.get('/incidencias-inactivas', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Incidencias.paginate({ estado : false   }, options, (err, incidenciasDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }
  });

});
// ===========================
//  Obtener incidencias todas por ruta
// ===========================
app.get('/incidencias-todas/ruta/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Incidencias.paginate({  ruta: id   }, options, (err, incidenciasDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }
  });

 
});

// ===========================
//  Obtener incidencias todas por mes
// ===========================
app.get('/incidencias-todas/mes/:id', (req, res) => {


const { page = 1, limit = 20} = req.query;

const options = {
  page,
  limit: parseInt(limit),
};
let {id} = req.params;

Incidencias.paginate({  mes: id   }, options, (err, incidenciasDB) => {
       
  if (err) {
    res.status(500).send({ code: 500, message: "Error del servidor." });
  } else {
    if (!incidenciasDB) {
      res
        .status(404)
        .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
    } else {
      res.status(200).send({ code: 200, incidencias: incidenciasDB });
    }
  }
});


});
// ===========================
//  Obtener incidencias todas por year
// ===========================
app.get('/incidencias-todas/year/:id', (req, res) => {


const { page = 1, limit = 20} = req.query;

const options = {
  page,
  limit: parseInt(limit),
};
let {id} = req.params;

Incidencias.paginate({  year: id   }, options, (err, incidenciasDB) => {
       
  if (err) {
    res.status(500).send({ code: 500, message: "Error del servidor." });
  } else {
    if (!incidenciasDB) {
      res
        .status(404)
        .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
    } else {
      res.status(200).send({ code: 200, incidencias: incidenciasDB });
    }
  }
});


});
// ===========================
//  Obtener incidencias activas por ruta
// ===========================
app.get('/incidencias/ruta/:id', (req, res) => {


    const { page = 1, limit = 20} = req.query;
  
    const options = {
      page,
      limit: parseInt(limit),
    };
    let {id} = req.params;
    
    Incidencias.paginate({ activo : true, ruta: id   }, options, (err, incidenciasDB) => {
           
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!incidenciasDB) {
          res
            .status(404)
            .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
        } else {
          res.status(200).send({ code: 200, incidencias: incidenciasDB });
        }
      }
    });

   
});

// ===========================
//  Obtener incidencias activas por mes
// ===========================
app.get('/incidencias/mes/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Incidencias.paginate({ activo : true, mes: id   }, options, (err, incidenciasDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }
  });

 
});
// ===========================
//  Obtener incidencias activas por year
// ===========================
app.get('/incidencias/year/:id', (req, res) => {


  const { page = 1, limit = 20} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };
  let {id} = req.params;
  
  Incidencias.paginate({ activo : true, year: id   }, options, (err, incidenciasDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }
  });

 
});
//===========================
//  Obtenesr incidencias activas
// ===========================
app.get('/incidencias', (req, res) => {

  const { page = 1, limit = 20} = req.query;
  
  const options = {
    page,
    limit: parseInt(limit),
  };


  Incidencias.paginate({  }, options, (err, incidenciasDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }


  });

});

// ===========================
//  Actualizar Incidencia me ID
// ===========================
app.put('/incidencias/:id', verificaToken,  function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Incidencias.findById(id, (err, incidenciasDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!incidenciasDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El incidencias no existe'
                }
            });
        }

      
        incidenciasDB.numeroIncidencias = body.numeroIncidencias;
        incidenciasDB.incidencias = body.incidencias;
        incidenciasDB.ruta = body.ruta;
        incidenciasDB.usuario = body.usuario;
    

        incidenciasDB.save((err, incidenciasGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                incidencias: incidenciasGuardado
            });

        });

    });




});
// ===========================
//  Actualizar incidencias activos y inactivos por ID 
// ===========================
app.put('/incidencias/activos/:id',verificaToken, function(req, res) {

    const { id } = req.params;
    const { estado } = req.body;
   
    Incidencias.findByIdAndUpdate(id, { estado },{ new: true, runValidators: true }, (err, incidenciasDB) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!incidenciasDB) {
          res.status(404).send({ message: "No se ha encontrado el incidencias." });
         
        } else {
          if ( incidenciasDB.activo === true) {
           
             incidenciasDB.start = new Date();
             incidenciasDB.save((err, incidenciasGuardado) => {

              if (err) {
                  return res.status(500).json({
                      ok: false,
                      err
                  });
              }
  
              res.json({
                  ok: true,
                  incidenciasGuardado,
                  message: "incidencias activado correctamente y actualizado la fecha.",
              });
  
          });
  
          } else {
          
              incidenciasDB.end = new Date();
              incidenciasDB.save((err, incidenciasGuardado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                res.json({
                    ok: true,
                    incidenciasGuardado,
                    message: "incidencias desactivado correctamente y actualizado la fecha.",
                });
    
            });
    
          }
        }
      }
    });

});

// ===========================
//  Actualizar incidencias me ID
// ===========================
app.put('/incidencias/actualizar/:id',verificaToken,  function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Incidencias.findById(id, (err, incidenciasDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!incidenciasDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El incidencias no existe'
                }
            });
        }

      
        incidenciasDB.numeroIncidencias = body.numeroIncidencias;
        incidenciasDB.incidencias = body.incidencias;
        incidenciasDB.ruta = body.ruta;
        incidenciasDB.usuario = body.usuario;
        incidenciasDB.mes = body.mes,
        incidenciasDB.year = body.year,

        incidenciasDB.save((err, incidenciasGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                incidencias: incidenciasGuardado
            });

        });

    });




}); 

// ===========================
//  Actualizar  incidencias
// ===========================

app.put('/incidencias/order/:id',verificaToken, function(req, res) {
  let menuItem = req.body;
  const params = req.params;

Incidencias.findByIdAndUpdate(params.id, menuItem, (err, incidenciasUpdate) => {
  if (err) {
    res.status(500).send({ message: "Error del servidor." });
  } else {
    if (!incidenciasUpdate) {
      res.status(404).send({ message: "No se ha encontrado ninguna incidencias." });
    } else {
      res.status(200).send({ message: "Plataforma actualizada correctamente.",incidenciasUpdate });
    }
  }
});
})
// ===========================
//  Eliminar incidencias admin ID
// ===========================
app.delete('/incidencias/:id', verificaToken, function(req, res) {

    const { id } = req.params;

    Incidencias.findByIdAndRemove(id, (err, incidenciasDB) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!incidenciasDB) {
          res.status(404).send({ message: "incidencias no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "La incidencias ha sido eliminado correctamente." });
        }
      }
    });



});

// ===========================
//  Buscar incidencias
// ===========================
app.get('/incidencias-buscar', (req, res) => {

  let termino = req.query.termino;
  let regex = new RegExp(termino, 'i');

  const { page = 1, limit = 2} = req.query;

  const options = {
    page,
    limit: parseInt(limit),
  };

  Incidencias.paginate({ numeroIncidencias: regex  }, options, (err, incidenciasDB) => {
         
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!incidenciasDB) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun incidencias." });
      } else {
        res.status(200).send({ code: 200, incidencias: incidenciasDB });
      }
    }
  });

 

});

module.exports = app;