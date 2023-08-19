const { KaindaModel } = require('kainda');
const DbService = require('@services/db.service');

const mongoose = DbService.get();

const addressSchema = new mongoose.Schema({

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

    additional_data:{
        type: String,
        required: false
    },

    user_id: {
        type: String,
        ref: 'user',
        required: true,
    }

}, {
    timestamps: true,

});

const tmpModel = mongoose.model('Address', addressSchema);
const Address = new KaindaModel(tmpModel);
module.exports = Address;
