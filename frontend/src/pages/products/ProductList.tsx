import {Product} from "../../types/Product.ts";
import {Button, Stack, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Gear, Trash} from "phosphor-react";

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
        <Container>
            <h1>Product List</h1>
            <Table className="table" bordered striped hover variant="dark" size="sm">
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
                            <Stack direction={"horizontal"}>
                                <Button onClick={() => handleEditClick(product)} size="sm" variant="outline-primary"><Gear size={20} /></Button>
                                <Button onClick={() => handleDeleteClick(product)} size="sm" variant="danger"><Trash size={20} /></Button>
                            </Stack>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}