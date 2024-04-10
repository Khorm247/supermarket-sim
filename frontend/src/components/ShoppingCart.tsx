import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import useProduct from "../hooks/useProduct.ts";

type ShoppingCartProps = {
    isOpen: boolean,
}

export function ShoppingCart(props: Readonly<ShoppingCartProps>) {
    const { closeCart, shoppingCartItems } = useShoppingCart()
    const { products } = useProduct()
    console.log(shoppingCartItems)
    return (
        <Offcanvas show={props.isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {shoppingCartItems.map((item) => (
                        <div>
                            <span>{products.find(product => product.id === item.id)?.name}</span>
                            <span>{products.find(product => product.id === item.id)?.pricePerBox}</span>
                            <span>{item.quantity}</span>
                        </div>
                    ))}

                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}