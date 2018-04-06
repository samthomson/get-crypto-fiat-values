# Get Crypto FIAT Values

[![Build Status](https://travis-ci.org/samthomson/get-crypto-fiat-values.svg?branch=master)](https://travis-ci.org/samthomson/get-crypto-fiat-values) [![Coverage Status](https://coveralls.io/repos/github/samthomson/get-crypto-fiat-values/badge.svg?branch=master)](https://coveralls.io/github/samthomson/get-crypto-fiat-values?branch=master) [![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/samthomson/get-crypto-fiat-values.svg)](http://isitmaintained.com/project/samthomson/get-crypto-fiat-values "Average time to resolve an issue") [![Percentage of issues still open](http://isitmaintained.com/badge/open/samthomson/get-crypto-fiat-values.svg)](http://isitmaintained.com/project/samthomson/get-crypto-fiat-values "Percentage of issues still open")

For a crypto currency or several, get its/their FIAT value (in USD).

# install

`yarn add get-crypto-fiat-values`


# use


get a single crypto usd value
-----------------------------

    import { getCryptoUSDValue } from 'get-crypto-fiat-values'

    let aPortfolioAllocation: string[] = ['bitcoin', 'ethereum', 'litecoin', 'dogecoin']

    aPortfolioAllocation.forEach(async sCurrency => {
        const value = await getCryptoUSDValue(sCurrency)
        console.log(`Got value: ${value}, for ${sCurrency}`)
    })


prints:
```
Got value: 248.464, for litecoin
Got value: 11519.5, for bitcoin
Got value: 944.51, for ethereum
Got value: 0.00707836, for dogecoin
```

get multiple crypto usd values
------------------------------

    import { getMultipleCryptoUSDValue } from 'get-crypto-fiat-values'

    const oResult: any = await getMultipleCryptoUSDValue(['ethereum', 'dogecoin', 'litecoin', 'ripple'])

    const sETHKey = 'ethereum'
    const sDOGEKey = 'dogecoin'
    console.log('ethereum value is: ', oResult[sETHKey].usdValue)
    console.log('dogecoin value is: ', oResult[sDOGEKey].usdValue)


prints:
```
ethereum value is:  749.677
dogecoin value is:  0.00421033
```

## get all crypto values

Returns an array of 'CMCCurrencySnapshot' types representing all currencies listed on coinmarketcap.com.

```
import { getAllCryptoValues, CMCCurrencySnapshot } from 'get-crypto-fiat-values'

main async () {
    const aResult: CMCCurrencySnapshot[] | null = await getAllCryptoValues()
}

main()
```