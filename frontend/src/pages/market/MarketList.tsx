import {Market} from "../../types/Market.ts";

type MarketListProps = {
    markets: Market[]
}


export default function MarketList(props: Readonly<MarketListProps>) {

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
                {props.markets.map((market) => (
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