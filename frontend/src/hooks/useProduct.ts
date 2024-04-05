import {useEffect, useState} from "react";
import {Product} from "../types/Product.ts";
import axios from "axios";

export default function useCats() {
    const [products, setProduct] = useState<Product[]>([]);

    function fetchProducts() {
        axios.get('/api/products')
            .then((response) => setProduct(response.data))
            .catch((error) => console.error(error));
    }

    function saveProduct(
        product: Product
    ) {
        axios.post('/api/products', {
            "name": product.name,
            "producer": product.producer,
            "category": product.category,
            "pricePerBox": product.pricePerBox,
            "fairMarketValue": product.fairMarketValue,
            "yourPrice": product.yourPrice,
            "itemsPerBox": product.itemsPerBox,
        })
            .then(() => fetchProducts())
            .catch((error) => console.log(error));
    }

    function updateProduct(
        product: Product
    ) {
        axios.put(`/api/products/${product.id}`, {
            "id": product.id,
            "name": product.name,
            "producer": product.producer,
            "category": product.category,
            "pricePerBox": product.pricePerBox,
            "fairMarketValue": product.fairMarketValue,
            "yourPrice": product.yourPrice,
            "itemsPerBox": product.itemsPerBox,
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