var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var incidenciasSchema = new Schema({
    numeroIncidencias:{ type:String, required:[true, 'el Numero de  Incidencias es obligatorio']},
    incidencias:{ type:String, required:[true, 'La Incidencias es obligatorio']},
    img:{ type: String,required: false},
    start:{type: Date, default: new Date()},
    end:{type: Date},
    estado: { type: Boolean, default: true },
    order: {type: Number,required: true[true, 'La posicion es necesaria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    ruta: { type: Schema.Types.ObjectId, ref: 'Ruta' },
    year: { type: Schema.Types.ObjectId, ref: 'Year' },
    mes: { type: Schema.Types.ObjectId, ref: 'Mes' }
});

incidenciasSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Incidencias', incidenciasSchema);