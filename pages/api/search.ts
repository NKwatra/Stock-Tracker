import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorMessage, fetchSuggestions } from '../../src/utils/network';

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



export default async function(req: NextApiRequest, res: NextApiResponse<{suggestions: SuggestionResponse[], status: "success"} | ErrorMessage>) : Promise<void> {
  const {search} = req.query;
  return new Promise(resolve => {
  fetchSuggestions((search as string))
  .then((result:  SearchResponse | ErrorMessage ) => {
    switch(result.status) {
      case "success":  res.status(200).json({
        suggestions: result.data.result.map((entry: Company) => ({
        symbol: entry.symbol,
        name: entry.description
      })),
      status: "success"
    }); 
    break;
    case "error": res.status(200).json(result); 
    break; 
    }
    return resolve();
 })
  })
}