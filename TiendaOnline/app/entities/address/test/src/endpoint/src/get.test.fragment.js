const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe('Get endpoint', function () {

        describe('Get all Addresss', function () {

            it('Get all Addresss successfully (200) with data');

            it('Get all Addresss successfully (200) without data');

            it('Get all Addresss with invalid token (401)');

            it('Get all Addresss with no permission (403)');

        });

        describe('Get Address by id', function () {

            it('Get a Address successfully (200)');

            it('Get a Address with invalid token (401)');

            it('Get a Address with no permission (403)');

            it('Get a Address with invalid id (404)');

        });

    });

};