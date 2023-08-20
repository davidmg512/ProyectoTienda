const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) {

        const Address = ModelsService.Models.Address;

        // Delete address by id
        app.delete(
            "/address/:address_id/", 
            [
                tokenFirebaseValid
            ], 
            Address.Controller.deleteAddress
        );
    }

};