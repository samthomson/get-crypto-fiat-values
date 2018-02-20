import axios from 'axios'

export async function getCryptoUSDValue (sCurrencyCode: string) : Promise<number | null> {
    try{
        let sAPIURL = `https://api.coinmarketcap.com/v1/ticker/${sCurrencyCode}/`
        let apiResponse = await axios.get(sAPIURL).then(data => Number(data.data[0].price_usd))
        return apiResponse
    }catch(err){ return null }
}
