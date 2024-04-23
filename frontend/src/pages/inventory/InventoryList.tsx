import {Button, Table} from "react-bootstrap";
import {Inventory} from "../../types/Inventory.ts";
import {useShoppingCart} from "../../context/ShoppingCartContext.tsx";
import Container from "react-bootstrap/Container";
import {Backspace} from "phosphor-react";

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
                    <th>Ladenpreis</th>
                    {
                        /*
                        <th>Im Regal</th>
                        <th>bestücken</th>
                        */
                    }
                    <th>Im Lager</th>
                    <th>Kosten</th>
                    <th>Nachbestellen</th>

                </tr>
                </thead>
                <tbody>
                    {props.inventory.inventoryItems.map((item) => (
                        <tr key={item.product.id} className={"fs-4"}>
                            <td>
                                {
                                    item.quantityInStorage == 0 &&
                                    <div
                                        className="rounded-circle bg-danger"
                                        style={{
                                            width: "1.8rem",
                                            height: "1.8rem",
                                        }}
                                    >
                                        &nbsp;
                                    </div>
                                }
                                {
                                    item.quantityInStorage > 0 && item.quantityInStorage < 5 &&
                                    <div
                                        className="rounded-circle bg-warning"
                                        style={{
                                            width: "1.8rem",
                                            height: "1.8rem",
                                        }}
                                    >
                                        &nbsp;
                                    </div>
                                }
                                {
                                    item.quantityInStorage >= 5 &&
                                    <div
                                        className="rounded-circle bg-success"
                                        style={{
                                            width: "1.8rem",
                                            height: "1.8rem",
                                        }}
                                    >
                                        &nbsp;
                                    </div>
                                }
                            </td>
                            <td>{item.product.name}</td>
                            <td>{item.product.yourPrice}€</td>
                            {
                            /*

                            <td>{item.quantityInShelf}</td>
                            <td>
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{gap: ".5rem"}}
                                >
                                    <Button className={"btn-sm"}
                                            onClick={() => decreaseCartQuantity(item.product.id)}>-</Button>
                                    <div>
                                        <span className="fs-4">{getItemQuantity(item.product.id)}</span>
                                    </div>
                                    <Button className={"btn-sm"}
                                            onClick={() => increaseCartQuantity(item.product.id)}>+</Button>
                                </div>
                            </td>
                             */
                            }

                            <td>{item.quantityInStorage}</td>
                            <td>{item.product.pricePerBox}€</td>
                            <td>
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{gap: ".5rem"}}
                                >
                                    <Button className={"btn-sm"}
                                            onClick={() => decreaseCartQuantity(item.product.id)}>-</Button>
                                    <div>
                                        <span className="fs-4">{getItemQuantity(item.product.id)}</span>
                                    </div>
                                    <Button className={"btn-sm"}
                                            onClick={() => increaseCartQuantity(item.product.id)}>+</Button>
                                    <Button className={"btn-sm"} onClick={() => removeFromCart(item.product.id)}
                                            variant="danger" size="sm">
                                        <Backspace size={22}/>
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