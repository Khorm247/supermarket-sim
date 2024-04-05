import {Product} from "../../types/Product.ts";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

type ProductListProps = {
    products: Product[],
    handleProduct: (product: Product) => void
    deleteProduct: (product: Product) => void
}

export default function ProductList(props: Readonly<ProductListProps>) {
    const navigate = useNavigate();

    function handleEditClick(product: Product){
        props.handleProduct(product);
        navigate(`/api/products/${product.id}/edit`);
    }

    function handleDeleteClick(product: Product){
        props.deleteProduct(product);
        navigate(`/api/products/${product.id}/delete`);
    }
    return (
        <div>
            <h1>Product List</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Producer</th>
                    <th>Category</th>
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
                        <td>{product.category}</td>
                        <td>{product.pricePerBox}</td>
                        <td>{product.fairMarketValue}</td>
                        <td>{product.yourPrice}</td>
                        <td>{product.itemsPerBox}</td>
                        <td>
                            <Button onClick={() => handleEditClick(product)} size="sm" variant="outline-primary">Edit</Button>
                            <Button onClick={() => handleDeleteClick(product)} size="sm" variant="danger">X</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}