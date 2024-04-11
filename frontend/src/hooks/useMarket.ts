import {useEffect, useState} from "react";
import {Market} from "../types/Market.ts";
import axios from "axios";

export default function useMarket() {
    const [markets, setMarkets] = useState<Market[]>([]);

    function fetchMarkets() {
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
        saveMarket,
        updateMarket,
        deleteMarket
    }
}