const Address = require('@entities/address/model');

Address.Controller = require('@entities/address/controllers');
Address.Routes = require('@entities/address/routes');
Address.Exceptions = require('@entities/address/exceptions');
Address.Seeders = require('@entities/address/seeders');
Address.Middlewares = require('@entities/address/middlewares');
Address.Validators = require('@entities/address/validators');

/**
 * VARIABLES
*/
// TODO: Fill this
Address.create_required_keys = [

];

// TODO: Fill this
Address.updateable_keys = [

];

// TODO: Change this when not needed
Address.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "deleteAll",
    data: Address.Seeders.data
};

module.exports = Address;