const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
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
                User.Middlewares.canDeleteResource,
            ], 
            User.Controller.deleteUser
        );
    }

};