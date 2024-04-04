import {Button} from "react-bootstrap";

export default function Inventory() {
    return (
        <div>
            <h1>Bestandsliste</h1>
            <p>Hier wird die Liste aller Produkte im Laden angezeigt</p>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>ProduktID</th>
                        <th>Produktname</th>
                        <th>Preis</th>
                        <th>Im Regal</th>
                        <th>Im Lager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>G/Y/R</td>
                        <td>1</td>
                        <td>Apfel</td>
                        <td>0.99</td>
                        <td>12</td>
                        <td>50</td>
                        <td>
                            <Button>Bestellen</Button>
                            <Button>Nachfüllen</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>G/Y/R</td>
                        <td>2</td>
                        <td>Birne</td>
                        <td>1.49</td>
                        <td>5</td>
                        <td>20</td>
                        <td>
                            <Button>Bestellen</Button>
                            <Button>Nachfüllen</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>G/Y/R</td>
                        <td>3</td>
                        <td>Kiwi</td>
                        <td>2.99</td>
                        <td>3</td>
                        <td>10</td>
                        <td>
                            <Button>Bestellen</Button>
                            <Button>Nachfüllen</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}