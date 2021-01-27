import { ErrorMessage, SearchResponse } from "../../pages/api/search";

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