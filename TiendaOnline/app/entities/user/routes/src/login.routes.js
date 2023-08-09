const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    login : function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new user
        app.post(
            "/login",
            [
                User.Middlewares.checkRequiredKeys
            ],
            User.Controller.loginUser
        );
    },

    register : function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new user
        app.post(
            "/register",
            [
                User.Middlewares.checkRequiredKeys
            ],
            User.Controller.registerUser
        );
    }



};