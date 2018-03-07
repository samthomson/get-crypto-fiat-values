import { expect } from 'chai'

import * as sinon from 'sinon'



import { getCryptoUSDValue } from './getValues'

describe('getCryptoUSDValue function test', async () => {
    beforeEach(function () {
      this.sandbox = sinon.sandbox.create()
    })
    
    afterEach(function () {
      this.sandbox.restore()
    })

    it('should return value', async () => {
        var result = await getCryptoUSDValue('ethereum')
        expect(result).to.exist
        expect(result).to.be.a('number')
    });
});
