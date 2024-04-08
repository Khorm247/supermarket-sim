import {Product} from "./Product.ts";

export type InventoryItem = {
    productId: string,
    product: Product,
    quantityInShelf: number,
    quantityInStock: number,
}