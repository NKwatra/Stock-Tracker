import moment from 'moment';
import { SearchResponse } from "../../pages/api/search";
import { StocksResponse } from "../../pages/api/stocks";


export interface ErrorMessage  {
    code: number
    status: "error"
  }
  
const BASE_URL = process.env.API_BASE_URL


const getAuthHeaders = (): Headers => {
    return new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Finnhub-Token": process.env.API_KEY
    })
}

export const fetchSuggestions = async (searchText: string): Promise<SearchResponse | ErrorMessage> => {
    let url = `${BASE_URL}/search?q=${searchText}`;
    const response = await fetch(url, {
        headers: getAuthHeaders(),
    });

    
    if(response.status === 200)
    {
        const data = await response.json();
        return {
            code: response.status,
            data: data,
            status: "success"
        }
    }else
    {
        return {
            code: response.status,
            status: "error"
        }
    }
}

export const getStocksData = (stocks: string[]) => {
    let promises : Promise<StocksResponse | null >[];
    promises = stocks.map(stock => {
        return getStockData(stock)
    })

    return Promise.all(promises).then(results => {
        return results
    })
}

export const getStockData = (stock:string) : Promise<StocksResponse | null >=> {
    const today = moment();
    const oneWeekBefore = moment().subtract(7, "w");
    return fetch(`${BASE_URL}/stock/candle?symbol=${stock}&resolution=W&from=${oneWeekBefore.unix()}&to=${today.unix()}`, {
        headers: getAuthHeaders(),
    })
    .then(response => {
        if(response.status === 200)
        {
            return response.json();
        }else
        {
            return new Promise((resolve) => {
                resolve(null);
            })
        }
    }).catch((err: Error) => {
        console.error(err)
    })
}