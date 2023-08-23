const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const User = ModelsService.Models.User;

        // Delete user by id
        app.delete(
            "/user/:user_id/", 
            [
                deactivateRoute,
                tokenValid,
                //User.Middlewares.canDeleteResource,
            ], 
            User.Controller.deleteUser
        );
    },


    deleteUserFromAll : function (app){

        const User = ModelsService.Models.User;

        app.delete(
            "/user/delete/:user_id",

            [
                tokenFirebaseValid
            ],
            User.Controller.deleteUserFull
        );


    }

};