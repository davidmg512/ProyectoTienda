const { KaindaModel } = require("kainda");
const DbService = require("@services/db.service");

const mongoose = DbService.get();

const ordersSchema = new mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de usuario
        required: true
    },

    productos: [{
        producto_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Referencia al modelo de producto
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
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
