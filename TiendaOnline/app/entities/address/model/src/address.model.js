const { KaindaModel } = require('kainda');
const DbService = require('@services/db.service');

const mongoose = DbService.get();

const addressSchema = new mongoose.Schema({

    country:{
        type: String,
        required: true
    },

    province:{
        type: String,
        required: true
    },

    town:{
        type: String,
        required: true
    },

    postal_code:{
        type: String,
        required: true
    },

    street_and_number:{
        type: String,
        required: true
    },

    additional_data:{
        type: String,
        required: false
    }

}, {
    timestamps: true,

});

const tmpModel = mongoose.model('Address', addressSchema);
const Address = new KaindaModel(tmpModel);
module.exports = Address;
