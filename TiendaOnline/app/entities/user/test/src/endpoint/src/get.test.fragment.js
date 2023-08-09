const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all Users", function () 
        {

            it("Get all Users successfully (200) with data");

            it("Get all Users successfully (200) without data");

            it("Get all Users with invalid token (401)");

            it("Get all Users with no permission (403)");

        });

        describe("Get User by id", function () 
        {

            it("Get a User successfully (200)");

            it("Get a User with invalid token (401)");

            it("Get a User with no permission (403)");

            it("Get a User with invalid id (404)");

        });

    });

};