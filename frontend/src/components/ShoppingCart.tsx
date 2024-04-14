import {Button, Offcanvas, Stack, Table} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext"
import useProduct from "../hooks/useProduct.ts";
import {useUser} from "../context/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import useInventory from "../hooks/useInventory.ts";
import useMarket from "../hooks/useMarket.ts";

type ShoppingCartProps = {
    isOpen: boolean,
}

export function ShoppingCart(props: Readonly<ShoppingCartProps>) {
    const { closeCart, shoppingCartItems, resetShoppingCart} = useShoppingCart()
    const { products } = useProduct()
    const { fetchInventory } = useInventory()
    const { fetchMarkets } = useMarket()
    const { userId } = useUser()
    const navigate = useNavigate()

    function getTotal() {
        return shoppingCartItems.reduce((total, item) => {
            const product = products.find(product => product.id === item.productId)
            if (product == null) return total
            return total + product.pricePerBox * item.quantity
        }, 0)
    }

    async function handleCheckoutClick() {
        // checkout logic
        // send order as JSON to backend
        const order = {
            userId: userId,
            cartItems: shoppingCartItems,
            totalPrice: getTotal()
        }
        const response = await fetch(`/api/cart/checkout/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })

        if (!response.ok) {
            alert("Failed to checkout")
            throw new Error('Failed to checkout')
        }

        const responseBody = await response.text()

        if(responseBody === "checkout processed successfully"){

            fetchInventory()
            fetchMarkets();
            alert(responseBody)

            resetShoppingCart()
            closeCart()
            navigate('/api/inventory')

        }
    }

    function handleResetCartClick() {
        resetShoppingCart()
        closeCart()
    }

    return (
        <Offcanvas show={props.isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3} data-bs-theme="dark">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price per box</th>
                        </tr>
                        </thead>
                        {shoppingCartItems.map((item) => (
                            <tbody key={item.productId}>
                                <tr>
                                    <td>{products.find(product => product.id === item.productId)?.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{products.find(product => product.id === item.productId)?.pricePerBox}</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <div>
                        Total: {getTotal()}
                    </div>
                </Stack>
                <Button variant="primary" onClick={handleCheckoutClick}>Checkout</Button>
                <Button variant="danger" onClick={handleResetCartClick}>ResetCart</Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}