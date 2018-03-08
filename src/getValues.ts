import axios from 'axios'
import { CurrencyValues } from './types'

export async function getCryptoUSDValue (sCurrencyCode: string) : Promise<number | null> {
    try{
        let sAPIURL = `https://api.coinmarketcap.com/v1/ticker/${sCurrencyCode}/`
        let apiResponse = await axios.get(sAPIURL).then(data => {
            if (data.data && data.data.length > 0 && data.data[0].price_usd) {
                // has returned the data we expected
                return Number(data.data[0].price_usd)
            }
            return null
        })
        return apiResponse
    }catch(err){ return null }
}
export async function getMultipleCryptoUSDValue (saCurrencyCodes: string[]) : Promise<CurrencyValues | null> {
    try{
        let sAPIURL = `https://api.coinmarketcap.com/v1/ticker/?limit=0`
        let apiResponse = await axios.get(sAPIURL).then(data => {
            // parse out currencies we're interested in

            if (data.data && data.data.length > 0 && data.data[0].price_usd) {
                let currencies = data.data
                let oReturnCurrencies: CurrencyValues = {}

                for (let iIndex = 0; iIndex < currencies.length; iIndex++) {
                    if (saCurrencyCodes.indexOf(currencies[iIndex].id) > -1) {
                        // one of the currencies we're interested in
                        const { id, price_usd } = currencies[iIndex]
                        oReturnCurrencies[id] = {
                            usdValue: Number(price_usd)
                        }
                    }
                }
                // has returned the data we expected
                return oReturnCurrencies
            }
            return null
        })
        return apiResponse
    }catch(err){ return null }
}
