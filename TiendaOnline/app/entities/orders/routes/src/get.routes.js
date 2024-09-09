const ModelsService = require("@services/models.service");
const { tokenValid,tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {

    getByUser: function (app){
        const Orders = ModelsService.Models.Orders;

        app.get(
            "/orders/byuser",
            [tokenFirebaseValid],
            Orders.Controller.getOrdersByUser
        );
    },
    
    getAll : function (app) 
    {

        const Orders = ModelsService.Models.Orders;

        // Get all orderss. // TODO: Secure this route, only admins should use it.
        app.get(
            "/orders",
            [
                //deactivateRoute,
                tokenFirebaseValid,
            ],
            Orders.Controller.getAllOrderss
        );
    },

    getCategorias: function (app){
        const Orders = ModelsService.Models.Orders;

        app.get(
            "/orders/categorias",
            [tokenFirebaseValid],
            Orders.Controller.getCategorias
        );
    },

    get : function (app) 
    {

        const Orders = ModelsService.Models.Orders;

        // Get orders by id
        app.get(
            "/orders/:orders_id/",
            [
                deactivateRoute,
                tokenValid,
                Orders.Middlewares.canReadResource,
            ],
            Orders.Controller.getOrdersById
        );
    }

};