import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchSuggestions } from '../../src/utils/network';

export interface SuggestionResponse {
  symbol: string,
  name: string
}

type Company = {
  symbol: string,
  description: string,
  [key: string]: string
}

export interface SearchResponse  {
  code: number,
  status: "success"
  data: {
    count: number,
    result: Company[]
  }
}

export interface ErrorMessage  {
  code: number
  status: "error"
}

export default function(req: NextApiRequest, res: NextApiResponse<{suggestions: SuggestionResponse[], status: "success"} | ErrorMessage>)  {
  const {search} = req.query;
  return fetchSuggestions((search as string))
  .then((result:  SearchResponse | ErrorMessage ) => {
    switch(result.status) {
      case "success":  res.json({
        suggestions: result.data.result.map((entry: Company) => ({
        symbol: entry.symbol,
        name: entry.description
      })),
      status: "success"
    }); 
    break;
    case "error": res.json(result); 
    break; 
    }
 })

}