"use client"

import { Star } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

const reviews = [
  {
    name: "Camila R.",
    text: "Las tartas de TARTISIMA me salvaron las cenas de la semana. Son riquisimas y super practicas. La de pollo al verdeo es mi favorita!",
    rating: 5,
  },
  {
    name: "Martin L.",
    text: "Pedi las 6 variedades y todas son espectaculares. Se nota que estan hechas con amor y buenos ingredientes. Las recomiendo totalmente.",
    rating: 5,
  },
  {
    name: "Florencia G.",
    text: "Soy vegetariana y las de espinaca y humita son increibles. Me encanta que tengan opcion integral. Compro todas las semanas.",
    rating: 5,
  },
  {
    name: "Santiago M.",
    text: "Vivo solo y siempre me costaba cocinar. Ahora tengo el freezer lleno de tartas TARTISIMA. En 15 minutos como como un rey.",
    rating: 5,
  },
  {
    name: "Lucia T.",
    text: "La masa integral es riquisima, no tiene nada que envidiarle a la comun. El delivery fue rapido y las tartas llegaron perfectas.",
    rating: 5,
  },
  {
    name: "Pablo D.",
    text: "Las compre para la oficina y fueron un exito. Todos preguntaron de donde eran. La de cebolla y hongos es otro nivel.",
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < count ? "fill-primary text-primary" : "text-border"}`}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  const { ref: headRef, isVisible: headVisible } = useInView()
  const { ref: gridRef, isVisible: gridVisible } = useInView()

  return (
    <section id="opiniones" className="py-16 md:py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={headRef}
          className={`text-center mb-12 animate-on-scroll ${headVisible ? "is-visible" : ""}`}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary">
            Opiniones
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <article
              key={review.name}
              className={`flex flex-col gap-4 rounded-2xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-on-scroll-scale stagger-${i + 1} ${gridVisible ? "is-visible" : ""}`}
            >
              <Stars count={review.rating} />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">
                {`"${review.text}"`}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {review.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
