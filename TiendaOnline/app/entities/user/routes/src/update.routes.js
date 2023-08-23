const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");
//const { Model } = require("firebase-admin/lib/machine-learning/machine-learning");

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
    },

    updateAdmin : function (app)
    {
        const User = ModelsService.Models.User;

        app.put(
            "/updateAdmin/:user_id",
            [
                tokenFirebaseValid
            ],
            User.Controller.updateAdmin
        );
    }

};