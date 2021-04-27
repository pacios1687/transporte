var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

var yearSchema = new Schema({
   
    year:{ type:String, required:[true, 'El year es obligatorio']},
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    order: {type: Number,required: true[true, 'La posicion es necesaria'] },
});

yearSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Year', yearSchema);