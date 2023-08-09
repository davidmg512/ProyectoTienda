const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a User successfully (200)");

        it ("Update a User with invalid data (400)");

        it ("Update a User with invalid token (401)");

        it ("Update a User with no permission (403)");

        it ("Update a User with invalid id (404)");
    });

};