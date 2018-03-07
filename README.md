# Get Crypto FIAT Values

[![Build Status](https://travis-ci.org/samthomson/get-crypto-fiat-values.svg?branch=master)](https://travis-ci.org/samthomson/get-crypto-fiat-values)

For a crypto currency or several, get its/their FIAT value (in USD).

# install

`yarn add get-crypto-fiat-values`


# use

```
import { getCryptoUSDValue } from 'get-crypto-fiat-values'

let aPortfolioAllocation: string[] = ['bitcoin', 'ethereum', 'litecoin', 'dogecoin']

aPortfolioAllocation.forEach(async sCurrency => {
    let value = await getCryptoUSDValue(sCurrency)
    console.log(`Got value: ${value}, for ${sCurrency}`)
})
```

prints:
```
Got value: 248.464, for litecoin
Got value: 11519.5, for bitcoin
Got value: 944.51, for ethereum
Got value: 0.00707836, for dogecoin
```