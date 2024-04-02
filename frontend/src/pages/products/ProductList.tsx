import ProductService from "../../services/ProductService.tsx";
import {Product} from "../../types/Product.ts";
import {useEffect, useState} from "react";

const productService = new ProductService();
export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productService.getAllProducts().then((response) => {
            setProducts(response.data);
        });
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Producer</th>
                    <th>Price per Box</th>
                    <th>Fair Market Value</th>
                    <th>Your Price</th>
                    <th>Items per Box</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.producer}</td>
                        <td>{product.pricePerBox}</td>
                        <td>{product.fairMarketValue}</td>
                        <td>{product.yourPrice}</td>
                        <td>{product.itemsPerBox}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}