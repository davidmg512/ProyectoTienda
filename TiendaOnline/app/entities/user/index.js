const User = require("@entities/user/model");

User.Controller = require("@entities/user/controllers");
User.Routes = require("@entities/user/routes");
User.Exceptions = require("@entities/user/exceptions");
User.Seeders = require("@entities/user/seeders");
User.Middlewares = require("@entities/user/middlewares");
User.Validators = require("@entities/user/validators");

/**
 * VARIABLES
*/
// TODO: Fill this
User.create_required_keys = [

];

// TODO: Fill this
User.updateable_keys = [

];

// TODO: Change this when not needed
User.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: User.Seeders.data
};

module.exports = User;