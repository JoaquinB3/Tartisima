"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Instagram, Mail, MapPin } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export function Contact() {
  const { ref: leftRef, isVisible: leftVisible } = useInView()
  const { ref: rightRef, isVisible: rightVisible } = useInView()

  return (
    <section id="contacto" className="py-16 md:py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left - CTA */}
          <div
            ref={leftRef}
            className={`flex-1 animate-on-scroll-left ${leftVisible ? "is-visible" : ""}`}
          >
            <span className="text-sm font-medium tracking-widest uppercase text-primary">
              Contacto
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
              Hace tu pedido hoy
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
              Arma tu carrito, revisalo y cuando estes listo te enviamos el
              pedido completo por WhatsApp para coordinar pago y entrega.
            </p>

            <Button asChild size="lg" className="mt-8 rounded-full text-base gap-2 px-8 transition-transform duration-200 hover:scale-105">
              <a
                href="https://wa.me/5492314486166?text=Hola!%20Quiero%20hacer%20un%20pedido%20de%20tartas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-5" />
                Escribinos por WhatsApp
              </a>
            </Button>
          </div>

          {/* Right - Info */}
          <div
            ref={rightRef}
            className={`flex-1 flex flex-col gap-6 animate-on-scroll-right ${rightVisible ? "is-visible" : ""}`}
          >
            <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Ubicacion</h3>
                <p className="text-sm text-muted-foreground">
                  La Plata, Buenos Aires, Argentina
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MessageCircle className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">WhatsApp</h3>
                <a
                  href="https://wa.me/5492314486166"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  +54 9 2314 486166
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Instagram className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Instagram</h3>
                <a
                  href="https://instagram.com/tartisimaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  @tartisimaa
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a
                  href="mailto:tartisima25@gmail.com"
                  className="text-sm text-primary hover:underline"
                >
                  tartisima25@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
