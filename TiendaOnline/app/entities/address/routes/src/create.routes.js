const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) {

        const Address = ModelsService.Models.Address;

        // Create new address
        app.post(
            "/address/",
            [
                deactivateRoute,
                tokenValid,
                Address.Middlewares.canCreateResource,
                Address.Middlewares.checkRequiredKeys
            ],
            Address.Controller.createAddress
        );
    }

};