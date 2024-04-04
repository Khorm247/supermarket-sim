import {Product} from "../../types/Product.ts";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

type ProductListProps = {
    products: Product[],
}

export default function ProductList(props: Readonly<ProductListProps>) {

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
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.producer}</td>
                        <td>{product.pricePerBox}</td>
                        <td>{product.fairMarketValue}</td>
                        <td>{product.yourPrice}</td>
                        <td>{product.itemsPerBox}</td>
                        <td>
                            <Link to={`/api/products/${product.id}/edit`}>
                                <Button size="sm" variant="outline-primary">Edit</Button>
                            </Link>
                            <Link to={`/api/products/${product.id}/delete`}>
                                <Button size="sm" variant="danger">X</Button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}