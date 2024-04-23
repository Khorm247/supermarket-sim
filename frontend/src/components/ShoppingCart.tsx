import {Button, Offcanvas, Stack, Table} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext"
import {useUser} from "../context/UserContext.tsx";
import axios from "axios";
import {Product} from "../types/Product.ts";

type ShoppingCartProps = {
    isOpen: boolean,
    products: Product[],
    fetchInventory: () => void,
    fetchMarkets: () => void
}

export function ShoppingCart(props: Readonly<ShoppingCartProps>) {
    const { closeCart, shoppingCartItems, resetShoppingCart} = useShoppingCart()

    const { userId } = useUser()

    function getTotal() {
        return shoppingCartItems.reduce((total, item) => {
            const product = props.products.find(product => product.id === item.productId)
            if (product == null) return total
            return total + product.pricePerBox * item.quantity
        }, 0)
    }

    function handleCheckoutClick() {
        // checkout logic
        // send order as JSON to backend
        const order = {
            userId: userId,
            cartItems: shoppingCartItems,
            totalPrice: getTotal()
        }

        axios.post(`/api/cart/checkout/${userId}`, order)
            .then((response) => {
                console.log(response.data)
                props.fetchInventory()
                props.fetchMarkets();

                resetShoppingCart()
                closeCart()

            })
            .catch((error) => console.error(error));
    }

    function handleResetCartClick() {
        resetShoppingCart()
        closeCart()
    }

    return (
        <Offcanvas className={"bg-dark-subtle"} show={props.isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3} data-bs-theme="dark">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Anzahl</th>
                            <th>Preis</th>
                        </tr>
                        </thead>
                        {shoppingCartItems.map((item) => (
                            <tbody key={item.productId}>
                                <tr>
                                    <td>{props.products.find(product => product.id === item.productId)?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{props.products.find(product => product.id === item.productId)?.pricePerBox}€</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <div>
                        Gesamtsumme: {getTotal()}€
                    </div>
                </Stack>
                <Button variant="primary" onClick={handleCheckoutClick}>Checkout</Button>
                <Button variant="danger" onClick={handleResetCartClick}>ResetCart</Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}