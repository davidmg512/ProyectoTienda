const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Create endpoint', function () {
        it ('Create a Address successfully (200)');

        it ('Create a Address with invalid data (400)');

        it ('Create a Address with invalid token (401)');

        it ('Create a Address with no permission (403)');

        it ('Create a Address with conflicting data (409)');
    });

};