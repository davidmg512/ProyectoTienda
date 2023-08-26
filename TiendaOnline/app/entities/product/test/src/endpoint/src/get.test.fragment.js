const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe('Get endpoint', function () {

        describe('Get all Products', function () {

            it('Get all Products successfully (200) with data');

            it('Get all Products successfully (200) without data');

            it('Get all Products with invalid token (401)');

            it('Get all Products with no permission (403)');

        });

        describe('Get Product by id', function () {

            it('Get a Product successfully (200)');

            it('Get a Product with invalid token (401)');

            it('Get a Product with no permission (403)');

            it('Get a Product with invalid id (404)');

        });

    });

};