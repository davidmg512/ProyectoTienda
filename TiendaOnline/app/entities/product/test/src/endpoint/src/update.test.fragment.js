const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Update endpoint', function () {
        it ('Update a Product successfully (200)');

        it ('Update a Product with invalid data (400)');

        it ('Update a Product with invalid token (401)');

        it ('Update a Product with no permission (403)');

        it ('Update a Product with invalid id (404)');
    });

};