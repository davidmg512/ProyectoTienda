const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Delete endpoint', function () {
        it ('Delete a Address successfully (200)');

        it ('Delete a Address with invalid token (401)');

        it ('Delete a Address with no permission (403)');

        it ('Delete a Address with invalid id (404)');
    });

};