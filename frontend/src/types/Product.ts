import {Category} from "./Category.ts";

export type Product = {
    id: string,
    name: string,
    producer: string,
    category: Category,
    pricePerBox: number,
    fairMarketValue: number,
    yourPrice: number,
    itemsPerBox: number,
}