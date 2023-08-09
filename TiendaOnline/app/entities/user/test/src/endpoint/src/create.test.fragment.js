const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a User successfully (200)");

        it ("Create a User with invalid data (400)");

        it ("Create a User with invalid token (401)");

        it ("Create a User with no permission (403)");

        it ("Create a User with conflicting data (409)");
    });

};