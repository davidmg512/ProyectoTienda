const Orders = require("@entities/orders/model");

Orders.Controller = require("@entities/orders/controllers");
Orders.Routes = require("@entities/orders/routes");
Orders.Exceptions = require("@entities/orders/exceptions");
Orders.Seeders = require("@entities/orders/seeders");
Orders.Middlewares = require("@entities/orders/middlewares");
Orders.Validators = require("@entities/orders/validators");

/**
 * VARIABLES
*/
// TODO: Fill this
Orders.create_required_keys = [

];

// TODO: Fill this
Orders.updateable_keys = [

];

// TODO: Change this when not needed
Orders.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: Orders.Seeders.data
};

module.exports = Orders;