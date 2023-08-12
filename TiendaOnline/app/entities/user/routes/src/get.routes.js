const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {

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