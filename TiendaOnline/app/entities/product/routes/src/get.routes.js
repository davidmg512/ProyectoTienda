const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) {

        const Product = ModelsService.Models.Product;

        // Get all products. // TODO: Secure this route, only admins should use it.
        app.get(
            "/product",
            [
            ],
            Product.Controller.getAllProducts
        );
    },
    
    getDestacados : function (app) {
        const Product = ModelsService.Models.Product;

        app.get(
            "/product/destacados",
            [
            ],
            Product.Controller.getProductosDestacados
        );
    },

    get : function (app) {

        const Product = ModelsService.Models.Product;

        // Get product by id
        app.get(
            "/product/:product_id/",
            [
                deactivateRoute,
                tokenValid,
                Product.Middlewares.canReadResource,
            ],
            Product.Controller.getProductById
        );
    },

    getUrl : function (app) {

        const Product = ModelsService.Models.Product;

        // Get product by id
        app.get(
            "/imageUrl",
            [

            ],
            Product.Controller.getUrl
        );
    },

    

    

};