var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var pedidoSchema = new Schema({
    cliente:{ type:String, required:[true, 'el Cliente es obligatorio']},
    dirreccion:{ type:String, required:[true, 'La dirrecion es obligatorio']},
    cp:{ type:String, required:[true, 'La codigo postal es obligatorio']},
    poblacion:{ type:String, required:[true, 'La poblacion es obligatorio']},
    telefono:{ type:String, required:[true, 'La telefono es obligatorio']},
    factura:{ type:String, required:[true, 'el Factura es obligatorio']},
    pedido:{ type:String, required:[true, 'el Pedido es obligatorio']},
    producto:{ type:String, required:[true, 'La producto es obligatorio']},
    precio:{ type:String, required:[true, 'La precio es obligatorio']}, 
    cantidad:{ type:String, required:[true, 'La cantidad es obligatorio']},
    iva:{ type:String, required:[true, 'La iva es obligatorio']},
    baseImponible:{ type:String, required:[true, 'La baseImponible es obligatorio']},
    start:{type: Date, default: new Date()},
    end:{type: Date},
    estado: { type: Boolean, default: true },
    order: {type: Number,required: true[true, 'La posicion es necesaria'] },
    totalPedido:{ type:String, required:[true, 'La total es obligatorio']},
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    ruta: { type: Schema.Types.ObjectId, ref: 'Ruta' },
    resumen: { type: Schema.Types.ObjectId, ref: 'Resumen' },
    year: { type: Schema.Types.ObjectId, ref: 'Year' },
    mes: { type: Schema.Types.ObjectId, ref: 'Mes' }
});

pedidoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Pedido', pedidoSchema);