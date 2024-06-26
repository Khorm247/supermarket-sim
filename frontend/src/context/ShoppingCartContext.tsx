import {createContext, ReactNode, useContext, useMemo, useState, useCallback} from "react"

import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartItem = {
    id: string,
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    cartQuantity: number
    shoppingCartItems: ShoppingCartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: Readonly<ShoppingCartProviderProps>) {
    const [isOpen, setIsOpen] = useState(false)
    const [shoppingCartItems, setShoppingCartItems] = useLocalStorage<ShoppingCartItem[]>(
        "shopping-cart",
        []
    )

    const cartQuantity = shoppingCartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = useCallback(() => setIsOpen(true), [])
    const closeCart = useCallback(() => setIsOpen(false), [])
    const getItemQuantity = useCallback((id: string) => {
        return shoppingCartItems.find(item => item.id === id)?.quantity || 0
    }, [shoppingCartItems])
    const increaseCartQuantity = useCallback((id: string) => {
        setShoppingCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }, [setShoppingCartItems])
    const decreaseCartQuantity = useCallback((id: string) => {
        setShoppingCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }, [setShoppingCartItems])
    const removeFromCart = useCallback((id: string) => {
        setShoppingCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }, [setShoppingCartItems])

    const value = useMemo(() => ({
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        shoppingCartItems,
        cartQuantity,
    }), [getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, shoppingCartItems, cartQuantity])

    return (
        <ShoppingCartContext.Provider
            value={value}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}