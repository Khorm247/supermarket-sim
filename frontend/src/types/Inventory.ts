import {InventoryItem} from "./InventoryItem.ts";

export type Inventory = {
    id: string,
    playerId: string,
    inventoryItems: InventoryItem[]
}