import {useEffect, useState} from "react";
import {Market} from "../types/Market.ts";
import axios from "axios";

export default function useMarket() {
    const [market, setMarket] = useState<Market>({
        id: "",
        name: "",
        balance: 0,
        maximumStorage: 0,
        currentStorage: 0,
        maximumShelfSpace: 0,
        currentShelfSpace: 0,
        products: [],
    });

    function fetchMarkets() {
        axios.get('/api/markets')
            .then((response) => setMarket(response.data))
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
        market,
        saveMarket,
        updateMarket,
        deleteMarket
    }
}