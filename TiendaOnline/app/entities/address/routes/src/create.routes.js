const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) {

        const Address = ModelsService.Models.Address;

        // Create new address
        app.post(
            "/address/",
            [
                tokenFirebaseValid,
                Address.Middlewares.checkRequiredKeys
            ],
            Address.Controller.createAddress
        );
    }

};