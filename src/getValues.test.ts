import { expect } from 'chai'
import * as sinon from 'sinon'
import axios from 'axios'
import nock = require('nock')
import { getCryptoUSDValue } from './getValues'

describe('getCryptoUSDValue function test', async () => {
    beforeEach(function () {
    })
    
    afterEach(function () {
      nock.cleanAll()
    })

    it('should return value as expected', async () => {
      
      // stub response
      // const apiStub = this.sandbox.stub(axios,' get', function (url))
      nock('https://api.coinmarketcap.com')
        .get('/v1/ticker/ethereum/')
        .reply(200, `
          [
            {
                "id": "ethereum", 
                "name": "Ethereum", 
                "symbol": "ETH", 
                "rank": "2", 
                "price_usd": "10000000", 
                "price_btc": "0.0743", 
                "24h_volume_usd": "1840370000.0", 
                "market_cap_usd": "77113918221.0", 
                "available_supply": "98040084.0", 
                "total_supply": "98040084.0", 
                "max_supply": null, 
                "percent_change_1h": "-0.93", 
                "percent_change_24h": "-5.28", 
                "percent_change_7d": "-9.55", 
                "last_updated": "1520432652"
            }
          ]
        `)


      var result = await getCryptoUSDValue('ethereum')
      expect(result).to.exist
      expect(result).to.be.a('number')
      expect(result).to.equal(10000000)
    })

    it('should return null on bad response', async () => {
      nock('https://api.coinmarketcap.com')
        .get('/v1/ticker/ethereum/')
        .reply(500, '')


      var result = await getCryptoUSDValue('ethereum')
      expect(result).to.equal(null)
    })

    it('should return null on bad data', async () => {
      nock('https://api.coinmarketcap.com')
        .get('/v1/ticker/ethereum/')
        .reply(200, `
          [
            {
                "id": "ethereum", 
                "name": "Ethereum", 
                "symbol": "ETH", 
                "rank": "2", 
                "price_btc": "0.0743", 
                "24h_volume_usd": "1840370000.0", 
                "market_cap_usd": "77113918221.0", 
                "available_supply": "98040084.0", 
                "total_supply": "98040084.0", 
                "max_supply": null, 
                "percent_change_1h": "-0.93", 
                "percent_change_24h": "-5.28", 
                "percent_change_7d": "-9.55", 
                "last_updated": "1520432652"
            }
          ]
        `)


      var result = await getCryptoUSDValue('ethereum')
      expect(result).to.equal(null)
    })
})
