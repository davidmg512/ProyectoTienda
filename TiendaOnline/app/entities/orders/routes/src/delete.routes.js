const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) 
    {

        const Orders = ModelsService.Models.Orders;

        // Delete orders by id
        app.delete(
            "/orders/:orders_id/", 
            [
                deactivateRoute,
                tokenValid,
                Orders.Middlewares.canDeleteResource,
            ], 
            Orders.Controller.deleteOrders
        );
    }

};