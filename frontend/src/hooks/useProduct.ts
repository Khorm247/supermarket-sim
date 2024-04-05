import {useEffect, useState} from "react";
import {Product} from "../types/Product.ts";
import axios from "axios";
import {Category} from "../types/Category.ts";

export default function useCats() {
    const [products, setProduct] = useState<Product[]>([]);

    function fetchProducts() {
        axios.get('/api/products')
            .then((response) => setProduct(response.data))
            .catch((error) => console.error(error));
    }

    function saveProduct(
        name: string,
        producer: string,
        category: Category,
        pricePerBox: number,
        fairMarketValue: number,
        yourPrice: number,
        itemsPerBox: number,
    ) {
        axios.post('/api/products', {
            "name": name,
            "producer": producer,
            "category": category,
            "pricePerBox": pricePerBox,
            "fairMarketValue": fairMarketValue,
            "yourPrice": yourPrice,
            "itemsPerBox": itemsPerBox,
        })
            .then(() => fetchProducts())
            .catch((error) => console.log(error));
    }

    function updateProduct(
        id: string,
        name: string,
        producer: string,
        category: Category,
        pricePerBox: number,
        fairMarketValue: number,
        yourPrice: number,
        itemsPerBox: number,
    ) {
        axios.put(`/api/products/${id}`, {
            "id": id,
            "name": name,
            "producer": producer,
            "category": category,
            "pricePerBox": pricePerBox,
            "fairMarketValue": fairMarketValue,
            "yourPrice": yourPrice,
            "itemsPerBox": itemsPerBox,
        })
            .then(() => fetchProducts())
            .catch((error) => console.log(error));
    }

    function deleteProduct(id: string) {
        axios.delete(`/api/products/${id}`)
            .then(() => fetchProducts())
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        saveProduct,
        updateProduct,
        deleteProduct
    }
}