var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var rutaSchema = new Schema({
   
    date:{type: Date, default: new Date() },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    order: {type: Number,required: true[true, 'La posicion es necesaria'] },
    mes: { type: Schema.Types.ObjectId, ref: 'Mes' },
    year: { type: Schema.Types.ObjectId, ref: 'Year' }
});

rutaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Ruta', rutaSchema);