const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Orderss", function () 
        {

            it("Get all Orderss successfully (200) with data");

            it("Get all Orderss successfully (200) without data");

            it("Get all Orderss with invalid token (401)");

            it("Get all Orderss with no permission (403)");

        });

        describe("Get Orders by id", function () 
        {

            it("Get a Orders successfully (200)");

            it("Get a Orders with invalid token (401)");

            it("Get a Orders with no permission (403)");

            it("Get a Orders with invalid id (404)");

        });

    });

};