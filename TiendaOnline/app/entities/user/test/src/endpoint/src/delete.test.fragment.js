const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a User successfully (200)");

        it ("Delete a User with invalid token (401)");

        it ("Delete a User with no permission (403)");

        it ("Delete a User with invalid id (404)");
    });

};