const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");
const Address = require("../../../address/model/src/address.model");

const mongoose = DbService.get();

const ordersSchema = new mongoose.Schema({
    
    user_id: {
        type: String,
        ref: 'User', // Referencia al modelo de usuario
        required: true
    },

    address:{
        address_country:{
            type: String,
            required: true
        },
    
        address_province:{
            type: String,
            required: true
        },
    
        address_town:{
            type: String,
            required: true
        },
    
        address_postal:{
            type: String,
            required: true
        },
    
        street_and_number:{
            type: String,
            required: true
        },
    },

    productos: [{
        producto_id: {
            type: String,
            ref: 'Product', // Referencia al modelo de producto
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        imagen: {
            type: String,
            required: true
        }
    }],

    total: {
        type: Number,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now,
        required: true
    },

    estado: {
        type: String,
        enum: ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
        default: 'Pendiente',
        required: true
    }

}, {
    timestamps: true,

});

ordersSchema.statics.findByUserId = function(userId) {
    return this.find({ user_id: userId }).populate('productos.producto_id').exec();
};

const tmpModel = mongoose.model("Orders", ordersSchema);
const Orders = new KaindaModel(tmpModel);
module.exports = Orders;
