"use client"

import Image from "next/image"
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart, INTEGRAL_EXTRA } from "@/lib/cart-context"
import type { Variant } from "@/lib/products"

function CartItemRow({
  productId,
  variant,
  quantity,
}: {
  productId: string
  variant: Variant
  quantity: number
}) {
  const { getProduct, updateQuantity, removeItem } = useCart()
  const product = getProduct(productId)
  if (!product) return null

  const unitPrice = product.price + (variant === "integral" ? INTEGRAL_EXTRA : 0)

  return (
    <div className="flex gap-3 py-3">
      <div className="relative size-16 shrink-0 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground truncate">
              {product.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {variant === "blanca" ? "Harina blanca" : "Integral (+$300)"}
            </p>
          </div>
          <button
            onClick={() => removeItem(productId, variant)}
            className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
            aria-label={`Eliminar ${product.name}`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full border border-border">
            <button
              onClick={() => updateQuantity(productId, variant, quantity - 1)}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary transition-colors"
              aria-label="Quitar una"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium text-foreground">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(productId, variant, quantity + 1)}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary transition-colors"
              aria-label="Agregar una"
            >
              <Plus className="size-3" />
            </button>
          </div>
          <p className="text-sm font-bold text-primary">
            ${(unitPrice * quantity).toLocaleString("es-AR")}
          </p>
        </div>
      </div>
    </div>
  )
}

function SuggestionChip({ productId }: { productId: string }) {
  const { getProduct, addItem } = useCart()
  const product = getProduct(productId)
  if (!product) return null

  return (
    <button
      onClick={() => addItem(product.id, "blanca")}
      className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary hover:shadow-sm"
    >
      <Plus className="size-3 text-primary" />
      {product.name}
      <span className="text-muted-foreground">
        ${product.price.toLocaleString("es-AR")}
      </span>
    </button>
  )
}

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    totalProductPrice,
    isOpen,
    setIsOpen,
    getSuggestions,
    getProduct,
    clearCart,
  } = useCart()

  const suggestions = getSuggestions()

  const buildWhatsAppMessage = () => {
    let msg = "Hola! Quiero hacer el siguiente pedido:\n\n"
    items.forEach((item) => {
      const product = getProduct(item.productId)
      if (product) {
        const variantLabel = item.variant === "blanca" ? "Harina blanca" : "Integral"
        const unitPrice = product.price + (item.variant === "integral" ? INTEGRAL_EXTRA : 0)
        msg += `- ${item.quantity}x ${product.name} (${variantLabel}) - $${(unitPrice * item.quantity).toLocaleString("es-AR")}\n`
      }
    })
    msg += `\nSubtotal: $${totalProductPrice.toLocaleString("es-AR")}`
    msg += `\n*Total: $${totalPrice.toLocaleString("es-AR")}*`
    return encodeURIComponent(msg)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300"
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-5 text-primary" />
            <h2 className="font-serif text-lg font-bold text-foreground">
              Tu carrito
            </h2>
            {totalItems > 0 && (
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <ShoppingCart className="size-12 text-border" />
              <p className="text-muted-foreground text-center">
                Tu carrito esta vacio. Agrega tartas para armar tu pedido.
              </p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <a href="#pedido-rapido">Armar pedido</a>
              </Button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <CartItemRow
                    key={`${item.productId}-${item.variant}`}
                    productId={item.productId}
                    variant={item.variant}
                    quantity={item.quantity}
                  />
                ))}
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-4 pb-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Tambien te puede gustar
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <SuggestionChip key={s.id} productId={s.id} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer - Order summary */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            {/* Price breakdown */}
            <div className="space-y-1.5 mb-3">
              {items.map((item) => {
                const product = getProduct(item.productId)
                if (!product) return null
                const unitPrice = product.price + (item.variant === "integral" ? INTEGRAL_EXTRA : 0)
                return (
                  <div
                    key={`${item.productId}-${item.variant}`}
                    className="flex items-center justify-between text-xs text-muted-foreground"
                  >
                    <span>
                      {item.quantity}x {product.name}{" "}
                      <span className="text-muted-foreground/60">
                        ({item.variant === "blanca" ? "Blanca" : "Integral"})
                      </span>
                    </span>
                    <span>
                      ${(unitPrice * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                )
              })}
            </div>

            <Separator className="mb-3" />

            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm text-foreground mb-1.5">
              <span>Subtotal</span>
              <span className="font-medium">
                ${totalProductPrice.toLocaleString("es-AR")}
              </span>
            </div>

            <Separator className="mb-3" />

            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-bold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full rounded-full text-base gap-2 transition-transform duration-200 hover:scale-[1.02]"
            >
              <a
                href={`https://wa.me/5492314486166?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  clearCart()
                  setIsOpen(false)
                }}
              >
                <MessageCircle className="size-5" />
                Enviar pedido por WhatsApp
              </a>
            </Button>

            <button
              onClick={clearCart}
              className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
