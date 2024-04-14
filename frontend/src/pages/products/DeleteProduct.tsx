import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {Alert, Button, Table} from "react-bootstrap";
import axios from "axios";
import Container from "react-bootstrap/Container";

type Product = {
    id: string,
    name: string,
    producer: string,
    pricePerBox: number,
    fairMarketValue: number,
    yourPrice: number,
    itemsPerBox: number
}

type ConfirmDeleteProductProps = {
    deleteProduct: (
        id: string,
    ) => void
}

export default function ConfirmDeleteProduct(props: Readonly<ConfirmDeleteProductProps>) {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error));
    }, [id]);

    function handleDelete(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (!id) {
            console.error("Id is undefined");
            return;
        }
        props.deleteProduct(id);
        navigate("/api/products")
    }

    return (
        <Container data-bs-theme="dark">
            <Alert variant="danger">
                Wollen Sie das Produkt wirklich löschen?
            </Alert>
            {product && (
                <Table striped bordered hover variant="dark" size="sm">
                    <tbody>
                        <tr><td>Name</td><td>{product.name}</td></tr>
                        <tr><td>Producer</td><td>{product.producer}</td></tr>
                        <tr><td>Price Per Box</td><td>{product.pricePerBox}</td></tr>
                        <tr><td>Fair Market Value</td><td>{product.fairMarketValue}</td></tr>
                        <tr><td>Your Price</td><td>{product.yourPrice}</td></tr>
                        <tr><td>Items Per Box</td><td>{product.itemsPerBox}</td></tr>
                    </tbody>
                </Table>
            )}
            <form onSubmit={handleDelete}>
                <Button variant="danger" type="submit">Delete</Button>
                <Button variant="secondary" onClick={() => navigate("/api/products")}>Cancel</Button>
            </form>
        </Container>
    )
}