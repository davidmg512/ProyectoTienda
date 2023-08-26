const Product = require('@entities/product/model');

Product.Controller = require('@entities/product/controllers');
Product.Routes = require('@entities/product/routes');
Product.Exceptions = require('@entities/product/exceptions');
Product.Seeders = require('@entities/product/seeders');
Product.Middlewares = require('@entities/product/middlewares');
Product.Validators = require('@entities/product/validators');

/**
 * VARIABLES
*/
// TODO: Fill this
Product.create_required_keys = [

];

// TODO: Fill this
Product.updateable_keys = [

];

// TODO: Change this when not needed
Product.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "deleteAll",
    data: Product.Seeders.data
};

module.exports = Product;