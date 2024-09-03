const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Update endpoint", function () 
    {
        it ("Update a Orders successfully (200)");

        it ("Update a Orders with invalid data (400)");

        it ("Update a Orders with invalid token (401)");

        it ("Update a Orders with no permission (403)");

        it ("Update a Orders with invalid id (404)");
    });

};