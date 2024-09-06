const { KaindaModel } = require('kainda');
const DbService = require('@services/db.service');

const mongoose = DbService.get();

const productSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String
    },

    precio: {
        type: Number,
        required: true
    },

    categorias: [{
        type: String,
        required: true
    }],

    stock: {
        type: Number,
        required: true
    },


    imagenes: {
        type: String,
        required: true
    },

    ventas: {
        type: Number,
        default: 0,
        required: true
    }
    


}, {
    timestamps: true,

});

const tmpModelProduct = mongoose.model('Product', productSchema);
const Product = new KaindaModel(tmpModelProduct);
module.exports = Product, tmpModelProduct;
