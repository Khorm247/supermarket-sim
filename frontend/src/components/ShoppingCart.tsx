import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { ShoppingCartItem } from "./ShoppingCartItem.tsx"
import {Product} from "../types/Product.ts";

type ShoppingCartProps = {
    isOpen: boolean,
    products: Product[],
}

export function ShoppingCart(props: ShoppingCartProps) {
    const { closeCart, shoppingCartItems } = useShoppingCart()
    return (
        <Offcanvas show={props.isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {shoppingCartItems.map(item => (
                        <ShoppingCartItem products={[]} key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            shoppingCartItems.reduce((total, shoppingCartItem) => {
                                console.log(shoppingCartItems)
                                const item = props.products.find(i => i.id === shoppingCartItem.id)
                                return total + (item?.pricePerBox || 0) * shoppingCartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}