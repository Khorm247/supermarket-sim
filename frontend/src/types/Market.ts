import {Product} from "./Product.ts";

export type Market = {
    id: string,
    name: string,
    balance: number,
    maximumStorage: number,
    currentStorage: number,
    maximumShelfSpace: number,
    currentShelfSpace: number,
    products: Product[],
}