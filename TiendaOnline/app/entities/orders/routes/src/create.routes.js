const ModelsService = require("@services/models.service");
const { tokenValid,tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) 
    {

        const Orders = ModelsService.Models.Orders;

        // Create new orders
        app.post(
            "/orders",
            [
                tokenFirebaseValid,
                Orders.Middlewares.checkRequiredKeys
            ],
            Orders.Controller.createOrders
        );
    }

};