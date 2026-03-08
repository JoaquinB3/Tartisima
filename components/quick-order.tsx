"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"
import { useCart, INTEGRAL_EXTRA } from "@/lib/cart-context"
import { useInView } from "@/hooks/use-in-view"

interface QuickRow {
  productId: string
  qtyBlanca: number
  qtyIntegral: number
}

export function QuickOrder() {
  const { addItem, setIsOpen } = useCart()
  const { ref, isVisible } = useInView()
  const [rows, setRows] = useState<QuickRow[]>(
    products.map((p) => ({ productId: p.id, qtyBlanca: 0, qtyIntegral: 0 }))
  )

  const updateQty = (
    productId: string,
    variant: "blanca" | "integral",
    delta: number
  ) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.productId !== productId) return row
        if (variant === "blanca") {
          return { ...row, qtyBlanca: Math.max(0, row.qtyBlanca + delta) }
        }
        return { ...row, qtyIntegral: Math.max(0, row.qtyIntegral + delta) }
      })
    )
  }

  const totalSelected = rows.reduce(
    (sum, r) => sum + r.qtyBlanca + r.qtyIntegral,
    0
  )

  const totalQuickPrice = rows.reduce((sum, r) => {
    const product = products.find((p) => p.id === r.productId)
    if (!product) return sum
    return (
      sum +
      product.price * r.qtyBlanca +
      (product.price + INTEGRAL_EXTRA) * r.qtyIntegral
    )
  }, 0)

  const totalWithShipping =
    totalSelected > 0 ? totalQuickPrice : 0

  const handleAddAll = () => {
    rows.forEach((row) => {
      if (row.qtyBlanca > 0) {
        for (let i = 0; i < row.qtyBlanca; i++) {
          addItem(row.productId, "blanca")
        }
      }
      if (row.qtyIntegral > 0) {
        for (let i = 0; i < row.qtyIntegral; i++) {
          addItem(row.productId, "integral")
        }
      }
    })
    setRows(
      products.map((p) => ({ productId: p.id, qtyBlanca: 0, qtyIntegral: 0 }))
    )
    setIsOpen(true)
  }

  return (
    <section id="pedido-rapido" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div
          ref={ref}
          className={`text-center mb-12 animate-on-scroll ${isVisible ? "is-visible" : ""}`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Pedido rapido
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            Arma tu pedido en segundos
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Elegi la cantidad de cada sabor en masa blanca o integral por
            separado. La masa integral tiene un adicional de $300 por tarta.
          </p>
        </div>

        {/* Quick order grid */}
        <div className="space-y-4">
          {products.map((product, i) => {
            const row = rows.find((r) => r.productId === product.id)!
            const subBlanca = product.price * row.qtyBlanca
            const subIntegral =
              (product.price + INTEGRAL_EXTRA) * row.qtyIntegral
            const rowTotal = subBlanca + subIntegral
            const rowQty = row.qtyBlanca + row.qtyIntegral

            return (
              <div
                key={product.id}
                className={`rounded-2xl border border-border bg-card p-4 md:p-5 transition-all duration-300 hover:shadow-md animate-on-scroll stagger-${i + 1} ${isVisible ? "is-visible" : ""}`}
              >
                {/* Top: image + name + tag + row total */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative size-14 shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover${product.id === "pollo-al-verdeo" ? " object-bottom" : ""}`}
                      sizes="56px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-serif font-semibold text-foreground truncate">
                        {product.name}
                      </p>
                      {product.tag && (
                        <Badge className="shrink-0 rounded-full text-[10px] bg-primary/10 text-primary border-0">
                          {product.tag}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                  {rowQty > 0 && (
                    <span className="shrink-0 text-sm font-bold text-primary">
                      ${rowTotal.toLocaleString("es-AR")}
                    </span>
                  )}
                </div>

                {/* Variant rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Blanca */}
                  <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Blanca
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        ${product.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full border border-border bg-card">
                      <button
                        onClick={() => updateQty(product.id, "blanca", -1)}
                        className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary transition-colors"
                        aria-label={`Quitar ${product.name} blanca`}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-foreground">
                        {row.qtyBlanca}
                      </span>
                      <button
                        onClick={() => updateQty(product.id, "blanca", 1)}
                        className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary transition-colors"
                        aria-label={`Agregar ${product.name} blanca`}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Integral */}
                  <div className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Integral
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        ${(product.price + INTEGRAL_EXTRA).toLocaleString("es-AR")}
                        <span className="text-[10px] font-normal text-muted-foreground ml-1">
                          (+$300)
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full border border-border bg-card">
                      <button
                        onClick={() => updateQty(product.id, "integral", -1)}
                        className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary transition-colors"
                        aria-label={`Quitar ${product.name} integral`}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-foreground">
                        {row.qtyIntegral}
                      </span>
                      <button
                        onClick={() => updateQty(product.id, "integral", 1)}
                        className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary transition-colors"
                        aria-label={`Agregar ${product.name} integral`}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary bar */}
        {totalSelected > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-primary/5 border border-primary/20 px-6 py-5">
            <div>
              <p className="text-sm text-muted-foreground">
                {totalSelected}{" "}
                {totalSelected === 1
                  ? "tarta seleccionada"
                  : "tartas seleccionadas"}
              </p>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-muted-foreground">
                  Subtotal: ${totalQuickPrice.toLocaleString("es-AR")}
                </p>
                <p className="text-xl font-bold text-primary">
                  Total: ${totalWithShipping.toLocaleString("es-AR")}
                </p>
              </div>
            </div>
            <Button
              onClick={handleAddAll}
              size="lg"
              className="rounded-full gap-2 text-base px-8 transition-transform duration-200 hover:scale-105"
            >
              <ShoppingCart className="size-5" />
              Agregar todo al carrito
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
