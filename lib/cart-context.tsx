"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { Product, Variant } from "./products"
import { products } from "./products"

export interface CartItem {
  productId: string
  variant: Variant
  quantity: number
}

export const INTEGRAL_EXTRA = 300

interface CartContextType {
  items: CartItem[]
  addItem: (productId: string, variant: Variant) => void
  removeItem: (productId: string, variant: Variant) => void
  updateQuantity: (productId: string, variant: Variant, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  totalProductPrice: number
  getProduct: (productId: string) => Product | undefined
  getSuggestions: () => Product[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const getProduct = useCallback((productId: string) => {
    return products.find((p) => p.id === productId)
  }, [])

  const addItem = useCallback((productId: string, variant: Variant) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.variant === variant
      )
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { productId, variant, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string, variant: Variant) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variant === variant)
      )
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: string, variant: Variant, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, variant)
        return
      }
      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId && item.variant === variant
            ? { ...item, quantity }
            : item
        )
      )
    },
    [removeItem]
  )

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const INTEGRAL_EXTRA = 300

  const totalProductPrice = items.reduce((sum, item) => {
    const product = getProduct(item.productId)
    if (!product) return sum
    const unitPrice = product.price + (item.variant === "integral" ? INTEGRAL_EXTRA : 0)
    return sum + unitPrice * item.quantity
  }, 0)

  const totalPrice = totalProductPrice

  const getSuggestions = useCallback(() => {
    const inCart = new Set(items.map((i) => i.productId))
    return products.filter((p) => !inCart.has(p.id))
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalProductPrice,
        getProduct,
        getSuggestions,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
