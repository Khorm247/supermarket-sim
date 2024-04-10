import {Button} from "react-bootstrap";
import {Inventory} from "../../types/Inventory.ts";
import {Circle} from "phosphor-react";

type InventoryProps = {
    inventory: Inventory,
}

export default function InventoryList(props: Readonly<InventoryProps>) {
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
                                <Button size="sm" variant="outline-primary">Nachbestellen</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}