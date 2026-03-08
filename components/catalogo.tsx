"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { products, type Product } from "@/lib/products"
import { useInView } from "@/hooks/use-in-view"

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { ref, isVisible } = useInView(0.1)

  return (
    <article
      ref={ref}
      className={`group flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-on-scroll stagger-${index + 1} ${isVisible ? "is-visible" : ""}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={`Tarta de ${product.name}`}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.id === "cebolla-y-hongos" ? "object-[center_80%]" : product.id === "atun" ? "object-[center_60%]" : product.id === "espinaca" ? "object-[center_35%]" : product.id === "humita" ? "object-[center_45%]" : product.id === "jamon-y-queso" ? "object-[center_60%]" : "object-bottom"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.tag && (
          <Badge className="absolute top-3 left-3 rounded-full text-xs bg-primary text-primary-foreground">
            {product.tag}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-xl font-semibold text-card-foreground">
            {product.name}
          </h3>
          <div className="text-right shrink-0">
            <span className="text-lg font-bold text-primary whitespace-nowrap">
              ${product.price.toLocaleString("es-AR")}
            </span>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Integral +$300
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground flex-1">
          {product.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1">
            Harina blanca
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1">
            Integral
          </span>
        </div>
      </div>
    </article>
  )
}

export function Catalogo() {
  const { ref, isVisible } = useInView()

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className={`text-center mb-12 animate-on-scroll ${isVisible ? "is-visible" : ""}`}>
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Nuestros sabores
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            6 sabores para todos los gustos
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tartas individuales de 14 cm de diametro. Todas vienen freezadas y
            cocidas. Disponibles en masa de harina blanca o integral (+$300).
          </p>
        </div>

        <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${isVisible ? "is-visible" : ""}`}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* CTA to quick order */}
        <div className={`text-center mt-12 animate-on-scroll ${isVisible ? "is-visible" : ""}`}>
          <Button asChild size="lg" className="rounded-full text-base px-10 gap-2 transition-transform duration-200 hover:scale-105">
            <a href="#pedido-rapido">
              <ArrowDown className="size-4" />
              Arma tu pedido en segundos
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
