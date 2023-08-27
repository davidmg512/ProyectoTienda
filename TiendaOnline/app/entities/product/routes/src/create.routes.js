const ModelsService = require("@services/models.service");
const { tokenValid, tokenFirebaseValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) {

        const Product = ModelsService.Models.Product;

        // Create new product
        app.post(
            "/addProduct/",
            [

                tokenFirebaseValid,
                Product.Middlewares.checkRequiredKeys
            ],
            Product.Controller.nuevoProducto
        );
    }

};