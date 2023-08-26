const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) {

        const Product = ModelsService.Models.Product;

        // Create new product
        app.post(
            "/product/",
            [
                deactivateRoute,
                tokenValid,
                Product.Middlewares.canCreateResource,
                Product.Middlewares.checkRequiredKeys
            ],
            Product.Controller.nuevoProducto
        );
    }

};