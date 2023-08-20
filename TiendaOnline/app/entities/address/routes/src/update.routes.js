const ModelsService = require("@services/models.service");
const { tokenValid,tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) {

        const Address = ModelsService.Models.Address;

        // Update address
        app.put(
            "/address/:address_id/", 
            [
                
                tokenFirebaseValid
            ], 
            Address.Controller.updateAddress
        );
    }

};