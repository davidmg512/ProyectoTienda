const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe ("Create endpoint", function () 
    {
        it ("Create a Orders successfully (200)");

        it ("Create a Orders with invalid data (400)");

        it ("Create a Orders with invalid token (401)");

        it ("Create a Orders with no permission (403)");

        it ("Create a Orders with conflicting data (409)");
    });

};