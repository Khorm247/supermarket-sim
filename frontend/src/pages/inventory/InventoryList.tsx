import {Button} from "react-bootstrap";
import {Inventory} from "../../types/Inventory.ts";
import {Circle} from "phosphor-react";
import {useShoppingCart} from "../../context/ShoppingCartContext.tsx";

type InventoryProps = {
    inventory: Inventory,
}

export default function InventoryList(props: Readonly<InventoryProps>) {

    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

    return (
        <div>
            <h1>Bestandsliste</h1>
            <p>Hier wird die Liste aller Produkte im Laden angezeigt</p>
            <table>
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
                            <td><Circle color={'green'} /></td>
                            <td>{item.product.name}</td>
                            <td>{item.product.fairMarketValue}</td>
                            <td>{item.quantityInShelf}</td>
                            <td>{item.quantityInStorage}</td>
                            <td>
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{gap: ".5rem"}}
                                >
                                    <Button onClick={() => decreaseCartQuantity(item.product.id)}>-</Button>
                                    <Button onClick={() => increaseCartQuantity(item.product.id)}>+</Button>
                                    <div>
                                        <span className="fs-3">{getItemQuantity(item.product.id)}</span> in cart
                                    </div>
                                    <Button onClick={() => removeFromCart(item.product.id)} variant="danger" size="sm">
                                        Remove
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}