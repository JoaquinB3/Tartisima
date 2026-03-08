"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { useInView } from "@/hooks/use-in-view"

const faqs = [
  {
    q: "Como se preparan las tartas?",
    a: "Son super faciles! Salen directo del freezer al horno. Precalenta a 180C y cocinalas de 15 a 20 minutos hasta que esten doradas. No necesitas descongelar.",
  },
  {
    q: "Cuanto duran en el freezer?",
    a: "Nuestras tartas se conservan hasta 3 meses en el freezer sin perder sabor ni textura. Asi podes tener siempre comida lista cuando la necesites.",
  },
  {
    q: "Cual es la diferencia entre masa blanca e integral?",
    a: "La masa de harina blanca es la clasica, crocante y dorada. La integral tiene mas fibra y un sabor ligeramente mas rustico. Ambas son deliciosas, vos elegis!",
  },
  {
    q: "Hacen delivery en La Plata?",
    a: "Si! Hacemos delivery en el casco urbano de la plata. El envio se coordina por WhatsApp al momento de tu pedido.",
  },
  {
    q: "Cual es el pedido minimo?",
    a: "No hay pedido minimo. Podes combinar sabores y tipos de masa como quieras. A partir de 15 tartas tenes precio especial!",
  },
  {
    q: "Son aptas para celiacos?",
    a: "Por el momento nuestras tartas contienen gluten (harina de trigo). Estamos trabajando en una version sin TACC. Seguinos en redes para enterarte cuando la lancemos!",
  },
  {
    q: "Como hago para encargar?",
    a: "Arma tu pedido desde nuestra web, agrega las tartas al carrito y cuando estes listo le das al boton 'Enviar pedido por whatsApp' y se nos enviara un mensaje a nosotros donde coordinaremos el envio/retiro y pago.",
  },
]

export function FAQ() {
  const { ref, isVisible } = useInView()

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div
          ref={ref}
          className={`text-center mb-12 animate-on-scroll ${isVisible ? "is-visible" : ""}`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            Resolvemos tus dudas
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-base font-medium text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
