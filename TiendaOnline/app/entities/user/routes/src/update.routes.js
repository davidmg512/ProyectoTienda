const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const User = ModelsService.Models.User;

        // Update user
        app.put(
            "/user/:user_id/", 
            [
                deactivateRoute,
                tokenValid,
                User.Middlewares.canUpdateResource,
            ], 
            User.Controller.updateUser
        );
    }

};