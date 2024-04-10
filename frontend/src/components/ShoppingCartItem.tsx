import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import {Product} from "../types/Product.ts";

type ShoppingCartItemProps = {
    id: string,
    quantity: number,
    products: Product[]
}

export function ShoppingCartItem(props: ShoppingCartItemProps) {
    const { removeFromCart } = useShoppingCart()
    const item = props.products.find(i => i.id === props.id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">

            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {props.quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{props.quantity}
            </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.pricePerBox)}
                </div>
            </div>
            <div> {formatCurrency(item.pricePerBox * props.quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    )
}