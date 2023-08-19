const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {

    getUserAddresses : function (app) {

        const Address = ModelsService.Models.Address;

        // Get address by id
        app.get(
            "/user/addresses/",
            [
                
            ],
            Address.Controller.getAddressesOfUser
        );
    }

};