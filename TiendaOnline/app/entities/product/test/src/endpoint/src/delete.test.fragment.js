const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Delete endpoint', function () {
        it ('Delete a Product successfully (200)');

        it ('Delete a Product with invalid token (401)');

        it ('Delete a Product with no permission (403)');

        it ('Delete a Product with invalid id (404)');
    });

};