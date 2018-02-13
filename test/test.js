'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('getCryptoUSDValue function test', async () => {
    it('should return value', async () => {
        var result = await index.getCryptoUSDValue('ethereum')
        expect(result).to.exist
        expect(result).to.be.a('number')
    });
});
