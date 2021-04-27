var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var resumenSchema = new Schema({
    
    transportista:{ type:String, required:[true, 'El transportista es obligatorio']},
    destino:{ type:String, required:[true, 'el destino es necesario'] },
    img:{ type: String,required: false},
    factura: { type: String, required: [true, 'La factura es necesario'] },
    pedido: { type: String, required: [true, 'La pedido es necesario'] },
    totalPed: { type: Number, required: [true, 'El total es necesario'] },
    montaje: { type: Number, required: [true, 'El montaje es necesario'] },
    efectivo: { type: Number, required: [true, 'El efectivo es necesario'] },
    visa: { type: Number, required: [true, 'El visa es necesario'] },
    baseImponible: { type: Number, required: false },
    order: {type: Number,required: true[true, 'La posicion es necesaria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    ruta: { type: Schema.Types.ObjectId, ref: 'Ruta' },
    year: { type: Schema.Types.ObjectId, ref: 'Year' },
    mes: { type: Schema.Types.ObjectId, ref: 'Mes' }
});

resumenSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Resumen', resumenSchema);