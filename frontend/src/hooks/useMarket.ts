import {useEffect, useState} from "react";
import {Market} from "../types/Market.ts";
import axios from "axios";

export default function useMarket() {
    const [markets, setMarkets] = useState<Market[]>([]);

    function fetchMarkets() {
        console.log("fetchMarkets");
        axios.get('/api/markets')
            .then((response) => setMarkets(response.data))
            .catch((error) => console.error(error));
    }

    function saveMarket(
        market: Market
    ) {
        axios.post('/api/markets', {
            "name": market.name,
        })
            .then(() => fetchMarkets())
            .catch((error) => console.log(error));
    }

    function updateMarket(
        market: Market
    ) {
        axios.put(`/api/products/${market.id}`, {
            "id": market.id,

        })
            .then(() => fetchMarkets())
            .catch((error) => console.log(error));
    }

    function upgradeStorage(amount: number, cost: number) {
        axios.put(`/api/markets/${markets[0].id}/upgrade`, {
            "newCapacity": amount,
            "upgradeCost": cost
        })
            .then(() => fetchMarkets())
            .catch((error) => console.error(error));
    }

    function deleteMarket(id: string) {
        axios.delete(`/api/products/${id}`)
            .then(() => fetchMarkets())
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchMarkets();
    }, []);

    return {
        markets,
        fetchMarkets,
        saveMarket,
        updateMarket,
        upgradeStorage,
        deleteMarket
    }
}