const { KaindaModel } = require('kainda');
const DbService = require('@services/db.service');

const mongoose = DbService.get();

const productSchema = new mongoose.Schema({
    producto_nombre: {
        type: String,
        required: true
    },

    producto_descripcion: {
        type: String
    },

    producto_precio: {
        type: Number,
        required: true
    },

    producto_imagenes: [{
        type: String,
        required: true
    }],

    producto_categoria: {
        type: String,
        required: true
    }

    


}, {
    timestamps: true,

});

const tmpModel = mongoose.model('Product', productSchema);
const Product = new KaindaModel(tmpModel);
module.exports = Product;
