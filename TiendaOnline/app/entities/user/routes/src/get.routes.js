const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
   /* getAll : function (app) 
    {

        const User = ModelsService.Models.User;

        // Get all users. // TODO: Secure this route, only admins should use it.
        app.get(
            "/user/",
            [
                deactivateRoute,
                tokenValid,
            ],
            User.Controller.getAllUsers
        );
    },

    get : function (app) 
    {

        const User = ModelsService.Models.User;

        // Get user by id
        app.get(
            "/user/:user_id/",
            [
                deactivateRoute,
                tokenValid,
                User.Middlewares.canReadResource,
            ],
            User.Controller.getUserById
        );
    },*/

    getTokenId : function (app) 
    {

        const User = ModelsService.Models.User;

        // Get user by id
        app.get(
            "/user/perfil",
            [
                
                tokenFirebaseValid,
                User.Middlewares.canReadResource,
            ],
            User.Controller.getUserByEmail
        );
    },


    getNombre : function (app)
    {

        const User = ModelsService.Models.User;
        // Get user by name
        app.get(
            "/user/usernombre/:user_nombre/",
            [
                User.Middlewares.canReadResource,
            ],
            User.Controller.getUserByNombre
        );

    },



};