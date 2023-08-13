const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const User = ModelsService.Models.User;

        // Update user
        app.put(
            "/updateUser", 
            [
                tokenFirebaseValid,
                User.Middlewares.checkRequiredKeys
            ], 
            User.Controller.updateUser
        );
    }

};