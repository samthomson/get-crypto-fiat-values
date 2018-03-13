import axios from 'axios'
import { CurrencyValues, CMCCurrencySnapshot } from './types'

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
export async function getAllCryptoValues (): Promise<CMCCurrencySnapshot[] | null> {
    try{
        // request all currencies, parse to our type and return
        
        let sAPIURL = `https://api.coinmarketcap.com/v1/ticker/?limit=0`
        let apiResponse = await axios.get(sAPIURL).then(data => {
            let aReturnCurrencies: CMCCurrencySnapshot[] = []

            if (data.data && data.data.length > 0) {
                let currencies = data.data
                for (let iIndex = 0; iIndex < currencies.length; iIndex++) {

                    const {
                        id,
                        name,
                        symbol
                    } = currencies[iIndex]

                    const twenty_four_hour_volume = '24h_volume_usd'
                    const volume_usd_24h = Number(currencies[iIndex][twenty_four_hour_volume])

                    const rank = Number(currencies[iIndex].rank)
                    const price_usd = Number(currencies[iIndex].price_usd)
                    const price_btc = Number(currencies[iIndex].price_btc)
                    const market_cap_usd = Number(currencies[iIndex].market_cap_usd)
                    const available_supply = Number(currencies[iIndex].available_supply)
                    const total_supply = Number(currencies[iIndex].total_supply)
                    const max_supply = Number(currencies[iIndex].max_supply)
                    const percent_change_1h = Number(currencies[iIndex].percent_change_1h)
                    const percent_change_24h = Number(currencies[iIndex].percent_change_24h)
                    const percent_change_7d = Number(currencies[iIndex].percent_change_7d)
                    const last_updated = Number(currencies[iIndex].last_updated)
                    
                    const oParsingCurrency:CMCCurrencySnapshot = {
                        id,
                        name,
                        symbol,
                        rank,
                        price_usd,
                        price_btc,
                        volume_usd_24h,
                        market_cap_usd,
                        available_supply,
                        total_supply,
                        max_supply,
                        percent_change_1h,
                        percent_change_24h,
                        percent_change_7d,
                        last_updated
                    }

                    aReturnCurrencies.push(oParsingCurrency)
                }
                // has returned the data we expected
                return aReturnCurrencies
            }
            return null
        })
        return apiResponse
    }catch(err){
        console.log(err)
        return null
    }
}