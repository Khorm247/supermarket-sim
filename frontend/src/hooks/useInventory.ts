import {useEffect, useState} from "react";
import axios from "axios";
import {Inventory} from "../types/Inventory.ts";

export default function useInventory() {
    const [inventory, setInventory] = useState<Inventory>(
        {
            id: "",
            playerId: "",
            inventoryItems: []
        }
    );
    const playerId = "111";

    function fetchInventory() {
        axios.get('/api/inventory/player/' + playerId)
            .then((response) => setInventory(response.data))
            .catch((error) => console.error(error));
    }

    function addCategory(category: string) {
        axios.put(`/api/inventory/${inventory?.id}`, category, {headers:
                {"Content-Type": "text/plain"}})
            .then(() => fetchInventory())
            .catch((error) => console.log(error));
    }

    function deleteInventory(id: string) {
        axios.delete(`/api/inventory/${id}`)
            .then(() => fetchInventory())
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchInventory();
    }, []);

    return {
        inventory,
        addCategory,
        deleteInventory
    }
}