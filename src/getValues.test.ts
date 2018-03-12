import { expect } from 'chai'
import * as sinon from 'sinon'
import axios from 'axios'
import nock = require('nock')
import { 
  getAllCryptoValues,
  getCryptoUSDValue,
  getMultipleCryptoUSDValue
} from './getValues'
import { 
  CMCCurrencySnapshot,
  CurrencyValues
} from './types'

describe('getCryptoUSDValue function test', async () => {
  beforeEach(function () {})
  
  afterEach(function () {
    nock.cleanAll()
  })

  it('returns a single value as expected', async () => {
    
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

describe('getMultipleCryptoUSDValue function test', async () => {
  beforeEach(function () {})
  
  afterEach(function () {
    nock.cleanAll()
  })

  it('returns multiple value as expected', async () => {
    // stub response
    // const apiStub = this.sandbox.stub(axios,' get', function (url))
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
      .reply(200, `
        [
          {
            "id": "bitcoin",
            "name": "Bitcoin",
            "symbol": "BTC",
            "rank": "1",
            "price_usd": "10000",
            "price_btc": "1.0",
            "24h_volume_usd": "9152000000.0",
            "market_cap_usd": "167864563746",
            "available_supply": "16907412.0",
            "total_supply": "16907412.0",
            "max_supply": "21000000.0",
            "percent_change_1h": "0.12",
            "percent_change_24h": "-6.87",
            "percent_change_7d": "-8.06",
            "last_updated": "1520522665"
          },
          {
            "id": "ethereum",
            "name": "Ethereum",
            "symbol": "ETH",
            "rank": "2",
            "price_usd": "800",
            "price_btc": "0.0758599",
            "24h_volume_usd": "2232380000.0",
            "market_cap_usd": "73660479708.0",
            "available_supply": "98061520.0",
            "total_supply": "98061520.0",
            "max_supply": null,
            "percent_change_1h": "-0.02",
            "percent_change_24h": "-4.29",
            "percent_change_7d": "-13.9",
            "last_updated": "1520522652"
          },
          {
            "id": "ripple",
            "name": "Ripple",
            "symbol": "XRP",
            "rank": "3",
            "price_usd": "0.92",
            "price_btc": "0.00008730",
            "24h_volume_usd": "761182000.0",
            "market_cap_usd": "33791751940.0",
            "available_supply": "39091956706.0",
            "total_supply": "99992520283.0",
            "max_supply": "100000000000",
            "percent_change_1h": "0.35",
            "percent_change_24h": "-4.53",
            "percent_change_7d": "-6.81",
            "last_updated": "1520522640"
          }
        ]
      `)

    var result = await getMultipleCryptoUSDValue(['bitcoin', 'ethereum', 'ripple'])

    const oExpectedValues: CurrencyValues = {
      bitcoin: {
        usdValue: 10000
      },
      ethereum: {
        usdValue: 800
      },
      ripple: {
        usdValue: .92
      }
    }
    expect(result).to.exist
    expect(result).to.eql(oExpectedValues)
  })

  it('should return null on bad response', async () => {
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
      .reply(500, '')


    var result = await getMultipleCryptoUSDValue(['bitcoin', 'ethereum', 'ripple'])
    expect(result).to.equal(null)
  })

  it('should return null on bad data', async () => {
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
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
          },
          {
            "id": "ethereum",
            "name": "Ethereum",
            "symbol": "ETH",
            "rank": "2",
            "price_usd": "751.166",
            "price_btc": "0.0758599",
            "24h_volume_usd": "2232380000.0",
            "market_cap_usd": "73660479708.0",
            "available_supply": "98061520.0",
            "total_supply": "98061520.0",
            "max_supply": null,
            "percent_change_1h": "-0.02",
            "percent_change_24h": "-4.29",
            "percent_change_7d": "-13.9",
            "last_updated": "1520522652"
          },
          {
            "id": "ripple",
            "name": "Ripple",
            "symbol": "XRP",
            "rank": "3",
            "price_usd": "0.864417",
            "price_btc": "0.00008730",
            "24h_volume_usd": "761182000.0",
            "market_cap_usd": "33791751940.0",
            "available_supply": "39091956706.0",
            "total_supply": "99992520283.0",
            "max_supply": "100000000000",
            "percent_change_1h": "0.35",
            "percent_change_24h": "-4.53",
            "percent_change_7d": "-6.81",
            "last_updated": "1520522640"
          }
        ]
      `)


    var result = await getMultipleCryptoUSDValue(['bitcoin', 'ethereum', 'ripple'])
    expect(result).to.equal(null)
  })


  it('should return null on impartial data', async () => {
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
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
          },
          {
            "id": "ethereum",
            "name": "Ethereum",
            "symbol": "ETH",
            "rank": "2",
            "price_usd": "751.166",
            "price_btc": "0.0758599",
            "24h_volume_usd": "2232380000.0",
            "market_cap_usd": "73660479708.0",
            "available_supply": "98061520.0",
            "total_supply": "98061520.0",
            "max_supply": null,
            "percent_change_1h": "-0.02",
            "percent_change_24h": "-4.29",
            "percent_change_7d": "-13.9",
            "last_updated": "1520522652"
          }
        ]
      `)


    var result = await getMultipleCryptoUSDValue(['bitcoin', 'ethereum', 'ripple'])
    expect(result).to.equal(null)
  })
})

describe('getAllCryptoValues function test', async () => {
  beforeEach(function () {})
  
  afterEach(function () {
    nock.cleanAll()
  })

  it('returns multiple value as expected', async () => {
    // stub response
    // const apiStub = this.sandbox.stub(axios,' get', function (url))
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
      .reply(200, `
        [
          {
            "id": "bitcoin",
            "name": "Bitcoin",
            "symbol": "BTC",
            "rank": "1",
            "price_usd": "10000",
            "price_btc": "1.0",
            "24h_volume_usd": "9152000000.0",
            "market_cap_usd": "167864563746",
            "available_supply": "16907412.0",
            "total_supply": "16907412.0",
            "max_supply": "21000000.0",
            "percent_change_1h": "0.12",
            "percent_change_24h": "-6.87",
            "percent_change_7d": "-8.06",
            "last_updated": "1520522665"
          },
          {
            "id": "ethereum",
            "name": "Ethereum",
            "symbol": "ETH",
            "rank": "2",
            "price_usd": "800",
            "price_btc": "0.0758599",
            "24h_volume_usd": "2232380000.0",
            "market_cap_usd": "73660479708.0",
            "available_supply": "98061520.0",
            "total_supply": "98061520.0",
            "max_supply": null,
            "percent_change_1h": "-0.02",
            "percent_change_24h": "-4.29",
            "percent_change_7d": "-13.9",
            "last_updated": "1520522652"
          },
          {
            "id": "ripple",
            "name": "Ripple",
            "symbol": "XRP",
            "rank": "3",
            "price_usd": "0.92",
            "price_btc": "0.00008730",
            "24h_volume_usd": "761182000.0",
            "market_cap_usd": "33791751940.0",
            "available_supply": "39091956706.0",
            "total_supply": "99992520283.0",
            "max_supply": "100000000000",
            "percent_change_1h": "0.35",
            "percent_change_24h": "-4.53",
            "percent_change_7d": "-6.81",
            "last_updated": "1520522640"
          }
        ]
      `)

    var result = await getAllCryptoValues()

    const oExpectedValues: CMCCurrencySnapshot[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        rank: 1,
        price_usd: 10000,
        price_btc: 1,
        volume_usd_24h: 9152000000,
        market_cap_usd: 167864563746,
        available_supply: 16907412,
        total_supply: 16907412,
        max_supply: 21000000,
        percent_change_1h: 0.12,
        percent_change_24h: -6.87,
        percent_change_7d: -8.06,
        last_updated: 1520522665
      }
    ]
    console.log(result)
    expect(result).to.exist
    expect(result).to.eql(oExpectedValues)
  })

  it('should return null on bad response', async () => {
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
      .reply(500, '')


    var result = await getMultipleCryptoUSDValue(['bitcoin', 'ethereum', 'ripple'])
    expect(result).to.equal(null)
  })

  it('should return null on bad data', async () => {
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
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
          },
          {
            "id": "ethereum",
            "name": "Ethereum",
            "symbol": "ETH",
            "rank": "2",
            "price_usd": "751.166",
            "price_btc": "0.0758599",
            "24h_volume_usd": "2232380000.0",
            "market_cap_usd": "73660479708.0",
            "available_supply": "98061520.0",
            "total_supply": "98061520.0",
            "max_supply": null,
            "percent_change_1h": "-0.02",
            "percent_change_24h": "-4.29",
            "percent_change_7d": "-13.9",
            "last_updated": "1520522652"
          },
          {
            "id": "ripple",
            "name": "Ripple",
            "symbol": "XRP",
            "rank": "3",
            "price_usd": "0.864417",
            "price_btc": "0.00008730",
            "24h_volume_usd": "761182000.0",
            "market_cap_usd": "33791751940.0",
            "available_supply": "39091956706.0",
            "total_supply": "99992520283.0",
            "max_supply": "100000000000",
            "percent_change_1h": "0.35",
            "percent_change_24h": "-4.53",
            "percent_change_7d": "-6.81",
            "last_updated": "1520522640"
          }
        ]
      `)


    var result = await getMultipleCryptoUSDValue(['bitcoin', 'ethereum', 'ripple'])
    expect(result).to.equal(null)
  })


  it('should return null on impartial data', async () => {
    nock('https://api.coinmarketcap.com')
      .get('/v1/ticker/?limit=0')
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
          },
          {
            "id": "ethereum",
            "name": "Ethereum",
            "symbol": "ETH",
            "rank": "2",
            "price_usd": "751.166",
            "price_btc": "0.0758599",
            "24h_volume_usd": "2232380000.0",
            "market_cap_usd": "73660479708.0",
            "available_supply": "98061520.0",
            "total_supply": "98061520.0",
            "max_supply": null,
            "percent_change_1h": "-0.02",
            "percent_change_24h": "-4.29",
            "percent_change_7d": "-13.9",
            "last_updated": "1520522652"
          }
        ]
      `)


    var result = await getMultipleCryptoUSDValue(['bitcoin', 'ethereum', 'ripple'])
    expect(result).to.equal(null)
  })
})
