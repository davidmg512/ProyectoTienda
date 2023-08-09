const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new user
        app.post(
            "/user/",
            [
                deactivateRoute,
                tokenValid,
                User.Middlewares.canCreateResource,
                User.Middlewares.checkRequiredKeys
            ],
            User.Controller.createUser
        );
    }

};