const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Update endpoint', function () {
        it ('Update a Address successfully (200)');

        it ('Update a Address with invalid data (400)');

        it ('Update a Address with invalid token (401)');

        it ('Update a Address with no permission (403)');

        it ('Update a Address with invalid id (404)');
    });

};