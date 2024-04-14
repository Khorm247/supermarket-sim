import {Button, Table} from "react-bootstrap";
import {Inventory} from "../../types/Inventory.ts";
import {useShoppingCart} from "../../context/ShoppingCartContext.tsx";
import Container from "react-bootstrap/Container";

type InventoryProps = {
    inventory: Inventory,
}

export default function InventoryList(props: Readonly<InventoryProps>) {

    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

    return (
        <Container className={"rounded"}>
            <h1>Bestandsliste</h1>
            <Table striped bordered hover variant="dark" size="sm"
            >
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Produktname</th>
                        <th>Preis</th>
                        <th>Im Regal</th>
                        <th>Im Lager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.inventory.inventoryItems.map((item) => (
                        <tr key={item.product.id}>
                            <td>
                                <div
                                    className="rounded-circle bg-success"
                                    style={{
                                        width: "1.5rem",
                                        height: "1.5rem",
                                    }}
                                >
                                    &nbsp;
                                </div>
                            </td>
                            <td>{item.product.name}</td>
                            <td>{item.product.fairMarketValue}</td>
                            <td>{item.quantityInShelf}</td>
                            <td>{item.quantityInStorage}</td>
                            <td>
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{gap: ".5rem"}}
                                >
                                    <Button className={"btn-sm"} onClick={() => decreaseCartQuantity(item.product.id)}>-</Button>
                                    <Button className={"btn-sm"} onClick={() => increaseCartQuantity(item.product.id)}>+</Button>
                                    <div>
                                        <span className="fs-3">{getItemQuantity(item.product.id)}</span> in cart
                                    </div>
                                    <Button className={"btn-sm"} onClick={() => removeFromCart(item.product.id)} variant="danger" size="sm">
                                        Remove
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}