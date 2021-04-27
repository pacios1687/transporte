var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var mesSchema = new Schema({
   
    mes:{ type:String, required:[true, 'El mes es obligatorio']},
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    order: {type: Number,required: true[true, 'La posicion es necesaria'] },
    year: { type: Schema.Types.ObjectId, ref: 'Year' }
});

mesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Mes', mesSchema);