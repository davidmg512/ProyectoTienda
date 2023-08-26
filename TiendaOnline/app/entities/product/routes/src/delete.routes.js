const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) {

        const Product = ModelsService.Models.Product;

        // Delete product by id
        app.delete(
            "/product/:product_id/", 
            [
                deactivateRoute,
                tokenValid,
                Product.Middlewares.canDeleteResource,
            ], 
            Product.Controller.deleteProduct
        );
    }

};