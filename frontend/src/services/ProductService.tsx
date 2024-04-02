import axios from 'axios';
import {Product} from "../types/Product.ts";

export default class ProductService {
    getAllProducts() {
        return axios.get('/api/products');
    }

    getProductById(id: string) {
        return axios.get(`/api/products/${id}`);
    }

    addProduct(product: Product) {
        return axios.post('/api/products', product);
    }

    updateProduct(id:string, product: Product) {
        return axios.put(`/api/products/${id}`, product);
    }
}