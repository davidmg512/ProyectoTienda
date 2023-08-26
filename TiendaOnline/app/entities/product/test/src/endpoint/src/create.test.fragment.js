const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Create endpoint', function () {
        it ('Create a Product successfully (200)');

        it ('Create a Product with invalid data (400)');

        it ('Create a Product with invalid token (401)');

        it ('Create a Product with no permission (403)');

        it ('Create a Product with conflicting data (409)');
    });

};