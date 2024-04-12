import {useEffect, useState} from "react";
import axios from "axios";
import {Inventory} from "../types/Inventory.ts";
import {useUser} from "../context/UserContext.tsx";

export default function useInventory() {
    const [inventory, setInventory] = useState<Inventory>(
        {
            id: "",
            playerId: "",
            inventoryItems: []
        }
    );
    const { userId } = useUser();
    const playerId = userId;

    function fetchInventory() {
        if (!playerId) return;
        axios.get('/api/inventory/player/' + playerId)
            .then((response) => setInventory(response.data))
            .catch((error) => console.error(error));
    }

    function addCategory(category: string) {
        axios.put(`/api/inventory/${inventory.id}`, category, {headers:
                {"Content-Type": "text/plain"}})
            .then(fetchInventory)
            .catch((error) => console.log(error));
    }

    function deleteInventory(id: string) {
        axios.delete(`/api/inventory/${id}`)
            .then(fetchInventory)
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchInventory();
    }, [userId]);

    return {
        inventory,
        fetchInventory,
        addCategory,
        deleteInventory
    }
}