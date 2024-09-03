const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) 
    {

        const Orders = ModelsService.Models.Orders;

        // Update orders
        app.put(
            "/orders/:orders_id/", 
            [
                deactivateRoute,
                tokenValid,
                Orders.Middlewares.canUpdateResource,
            ], 
            Orders.Controller.updateOrders
        );
    }

};