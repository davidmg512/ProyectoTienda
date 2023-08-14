const ModelsService = require("@services/models.service");
const { tokenValid,tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    login : function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new user
        app.post(
            "/login",
            [
                deactivateRoute,
                User.Middlewares.checkRequiredKeys
            ],
            User.Controller.loginUser
        );
    },

    loginGoogle : function (app) 
    {

        const User = ModelsService.Models.User;

        // Create new user
        app.post(
            "/loginGoogle",
            [
                tokenFirebaseValid
            ],
            User.Controller.loginUserGoogle
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