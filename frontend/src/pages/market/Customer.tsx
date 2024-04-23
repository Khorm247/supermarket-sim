import Container from "react-bootstrap/Container";
import {useState} from "react";
import {Product} from "../../types/Product.ts";
import {Market} from "../../types/Market.ts";
import {Inventory} from "../../types/Inventory.ts";
import Card from "react-bootstrap/esm/Card";
import {Button, Col, Row, Table} from "react-bootstrap";
import axios from "axios";
import {useUser} from "../../context/UserContext.tsx";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";

type Customer = {
    id: number,
    quantity: number,
    product: Product
}

type CustomerProps = {
    inventory: Inventory,
    markets: Market[],
    fetchInventory: () => void,
    fetchMarkets: () => void
}

export default function Customer(props: Readonly<CustomerProps>) {
    const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
    const [error, setError] = useState<{ id:number, error: boolean }>({id: 0, error: false});
    const { userId } = useUser();
    const [idCounter, setIdCounter] = useState<number>(1);

    function randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomProduct() {
        const randomIndex = randomInt(0, props.inventory.inventoryItems.length - 1);
        return props.inventory.inventoryItems[randomIndex].product;
    }

    function createCustomer() {
        let newId = idCounter;
        while(customers.some(customer => customer.id === newId)) {
            newId++;
        }
        setIdCounter(newId + 1);

        const newCustomer = {
            id: newId,
            quantity: randomInt(1, 4),
            product: getRandomProduct(),
        }
        setCustomers([...customers, newCustomer]);
    }

    function hasEnoughProductInShelf(product: Product, quantity: number) {
        const inventoryItem = props.inventory.inventoryItems.find(i => i.product.id === product.id);
        if(inventoryItem === undefined) {
            return false;
        }
        // todo: change from storage to shelf
        return quantity <= inventoryItem.quantityInStorage;
    }

    function handleCustomer(customer: Customer) {
        console.log(`Kunde ${customer.id} wird bedient`);
        const finalPrice = customer.quantity * customer.product.yourPrice;


        const customerCheckout = {
            userId: props.markets[0].id,
            cartItem:
                {
                    productId: customer.product.id,
                    quantity: customer.quantity
                },
            totalPrice: finalPrice
        }

        if(hasEnoughProductInShelf(customer.product, customer.quantity)) {
            axios.post(`/api/cart/checkout/customer/${userId}`, customerCheckout)
                .then((response) => {
                    if(response.data === "Customer served")
                    {
                        console.log(response.data)
                        props.fetchInventory()
                        props.fetchMarkets();
                        console.log(`Kunde ${customer.id} zahlt ${finalPrice}€`);
                        setCustomers(customers.filter(c => c.id !== customer.id));
                    }
                })
                .catch((error) => console.error(error));
        }
        else {
            console.log(`Kunde ${customer.id} konnte nicht bedient werden, da nicht genügend Ware vorhanden ist`);
            setError({id: customer.id, error: true});
        }
    }

    return (
        <Container>
            <p>Willkommen im Markt</p>
            <h1>Kunden</h1>
            <button onClick={createCustomer}>Neuer Kunde</button>

            <Row xs={1} md={3} className="g-4">
                {customers.map((customer) => (
                    <Col key={customer.id}>
                        <Card style={{ width: '18rem' }} className={"bg-dark-subtle"}>
                            <Card.Body>
                                <Card.Title>Kunde: #{customer.id}</Card.Title>
                                <Card.Text as="div">
                                    <Table striped bordered variant="dark">
                                        <tbody>
                                            <tr>
                                                <td>{customer.quantity} x</td>
                                                <td>{customer.product.name}</td>
                                                <td>{customer.product.yourPrice}€</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={3}>
                                                    Gesamtpreis: {customer.quantity * customer.product.yourPrice}€
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </Card.Text>
                                <Button variant={error.id === customer.id && error.error ? "danger" : "success"}
                                        onClick={() => handleCustomer(customer)}>
                                    Kunde bedienen
                                </Button>
                                {error.id === customer.id && error.error && <p style={{color: 'red'}}>Nicht genügend Ware vorhanden</p>}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}