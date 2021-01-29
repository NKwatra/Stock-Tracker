import { NextApiRequest, NextApiResponse } from 'next';
import { StocksData } from '../../src/components/StockRow';
import { ErrorMessage, getStocksData } from "../../src/utils/network";


export interface StocksResponse {
    s?: any,
    c?: number[],
    [key: string] : number[]
}

export interface FetchedStocksResponse {
    status: "success",
    data: StocksData[]
}


export default function(req: NextApiRequest, res: NextApiResponse<FetchedStocksResponse | ErrorMessage>): Promise<void> {
    const {stocks,names} = req.query;
    const symbols = (stocks as string).split(",")
    const stockNames = (names as string).split(",");
    return new Promise(resolve => { getStocksData(symbols).then(results => {
        const retrived = results.filter(result => result !== null);
        if(retrived.length === 0)
        {
            res.status(200).json(
            {status: "error",
                code: 503   // check if any other code is more apt
            })
        }else{
             res.status(200).json({
                status: "success",
                data: retrived.map((stock,index) => ({
                    symbol: symbols[index],
                    values: stock["c"].map(price => ({price})),
                    name: stockNames[index]
                }))
            })
        }

        return resolve()
    })
})
}