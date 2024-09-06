const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {

    getUserAddresses : function (app) {

        const Address = ModelsService.Models.Address;

        // Get address by id
        app.get(
            "/user/addresses/",
            [
                tokenFirebaseValid
            ],
            Address.Controller.getAddressesOfUser
        );
    },

    getMainAddress: function (app) {
        const Address = ModelsService.Models.Address;

        app.get(
            "/main_address",
            [
                tokenFirebaseValid
            ],
            Address.Controller.getMainAddress
        );
    }

};