const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) {

        const Address = ModelsService.Models.Address;

        // Get all addresss. // TODO: Secure this route, only admins should use it.
        app.get(
            "/addresses/",
            [
                deactivateRoute,
                tokenValid,
            ],
            Address.Controller.getAllAddresses
        );
    },

    getUserAddresses : function (app) {

        const Address = ModelsService.Models.Address;

        // Get address by id
        app.get(
            "/:user_id/addresses/",
            [
                deactivateRoute,
                tokenValid
            ],
            Address.Controller.getAddressesOfUser
        );
    }

};