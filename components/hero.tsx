"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Leaf, Snowflake } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export function Hero() {
  const { ref: leftRef, isVisible: leftVisible } = useInView()
  const { ref: rightRef, isVisible: rightVisible } = useInView()

  return (
    <section id="inicio" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Copy */}
          <div
            ref={leftRef}
            className={`flex-1 text-center lg:text-left animate-on-scroll-left ${leftVisible ? "is-visible" : ""}`}
          >
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Creadas por nutricionistas
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground text-balance">
              Tartas saladas artesanales,{" "}
              <span className="text-primary">listas en minutos</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Tartas individuales de 14 cm freezadas y cocidas. Solo 15-20
              minutos al horno y tenes una comida casera, rica y nutritiva.
              Ideal para quienes buscan practicidad sin resignar sabor.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="rounded-full text-base px-8 transition-transform duration-200 hover:scale-105">
                <a href="#catalogo">Ver sabores</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8 transition-transform duration-200 hover:scale-105">
                <a href="#pedido-rapido">Armar mi pedido</a>
              </Button>
            </div>

            {/* Feature pills */}
            <div className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Snowflake className="size-5 text-primary" />
                <span>Freezadas y cocidas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-5 text-primary" />
                <span>15-20 min al horno</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="size-5 text-primary" />
                <span>Creadas por nutricionistas</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            ref={rightRef}
            className={`flex-1 w-full max-w-lg lg:max-w-none animate-on-scroll-right ${rightVisible ? "is-visible" : ""}`}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/images/img_portada.jpeg"
                alt="Variedad de tartas artesanales TARTISIMA sobre mesa de madera"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
