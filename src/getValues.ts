import axios from 'axios'

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
