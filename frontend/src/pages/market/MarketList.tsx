import {Market} from "../../types/Market.ts";
import {useEffect, useState} from "react";
import MarketService from "../../services/MarketService.tsx";

const marketService = new MarketService();
export default function ProductList() {
    const [markets, setMarkets] = useState<Market[]>([]);

    useEffect(() => {
        marketService.getAllMarkets().then((response) => {
            setMarkets(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Market List</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Market Name</th>
                    <th>Balance</th>
                    <th>Maximum Storage</th>
                    <th>Current Storage</th>
                    <th>Maximum Shelf Space</th>
                    <th>Current Shelf Space</th>
                </tr>
                </thead>
                <tbody>
                {markets.map((market) => (
                    <tr key={market.id}>
                        <td>{market.name}</td>
                        <td>{market.balance}</td>
                        <td>{market.maximumStorage}</td>
                        <td>{market.currentStorage}</td>
                        <td>{market.maximumShelfSpace}</td>
                        <td>{market.currentShelfSpace}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}