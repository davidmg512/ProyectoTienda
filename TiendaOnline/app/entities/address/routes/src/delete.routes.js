const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) {

        const Address = ModelsService.Models.Address;

        // Delete address by id
        app.delete(
            "/address/:address_id/", 
            [
                deactivateRoute,
                tokenValid,
                Address.Middlewares.canDeleteResource,
            ], 
            Address.Controller.deleteAddress
        );
    }

};