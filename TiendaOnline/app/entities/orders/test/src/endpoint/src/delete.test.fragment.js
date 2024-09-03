const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Delete endpoint", function () 
    {
        it ("Delete a Orders successfully (200)");

        it ("Delete a Orders with invalid token (401)");

        it ("Delete a Orders with no permission (403)");

        it ("Delete a Orders with invalid id (404)");
    });

};