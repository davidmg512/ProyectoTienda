const { KaindaModel } = require('kainda');
const DbService = require('@services/db.service');

const mongoose = DbService.get();

const productSchema = new mongoose.Schema({

    Nombre: {
        type: String,
        required: true
    },

    Descripcion: {
        type: String
    },

    Precio: {
        type: Number,
        required: true
    },

    Categorias: [{
        type: String,
        required: true
    }],

    Stock: {
        type: Number,
        required: true
    },


    Imagenes: {
        type: String,
        required: true
    },

    Ventas: {
        type: Number,
        default: 0,
        required: true
    }
    


}, {
    timestamps: true,

});

const tmpModel = mongoose.model('Product', productSchema);
const Product = new KaindaModel(tmpModel);
module.exports = Product;
