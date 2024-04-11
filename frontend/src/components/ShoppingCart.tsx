import {Button, Offcanvas, Stack, Table} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext"
import useProduct from "../hooks/useProduct.ts";

type ShoppingCartProps = {
    isOpen: boolean,
}


export function ShoppingCart(props: Readonly<ShoppingCartProps>) {
    const { closeCart, shoppingCartItems, resetShoppingCart} = useShoppingCart()
    const { products } = useProduct()

    function getTotal() {
        return shoppingCartItems.reduce((total, item) => {
            const product = products.find(product => product.id === item.id)
            if (product == null) return total
            return total + product.pricePerBox * item.quantity
        }, 0)
    }

    function handleCheckoutClick() {
        // check for balance and deduct

        // update inventory


        // remove items from cart if successful
        resetShoppingCart()
    }

    return (
        <Offcanvas show={props.isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price per box</th>
                        </tr>
                        </thead>
                        {shoppingCartItems.map((item) => (
                            <tbody key={item.id}>
                                <tr>
                                    <td>{products.find(product => product.id === item.id)?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{products.find(product => product.id === item.id)?.pricePerBox}</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <div>
                        Total: {getTotal()}
                    </div>
                </Stack>
                <Button variant="primary" onClick={handleCheckoutClick}>Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}