import { Heart, User, Clock, Truck } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Heart,
    title: "Creadas por nutricionistas",
    description:
      "Cada receta esta pensada para que disfrutes sin culpa. Ingredientes de calidad y balance nutricional.",
  },
  {
    icon: User,
    title: "Sabor artesanal",
    description:
      "Elaboradas de forma artesanal con recetas propias. Cada tarta tiene el sabor de lo hecho en casa.",
  },
  {
    icon: Clock,
    title: "Listas en minutos",
    description:
      "Solo 15 a 20 minutos al horno y tenes tu comida lista. Sin descongelar, directo del freezer.",
  },
  {
    icon: Truck,
    title: "Delivery en La Plata",
    description:
      "Hacemos entregas en el casco urbano de La Plata. Encarga por WhatsApp y te lo llevamos.",
  },
]

export function About() {
  return (
    <section className="relative bg-[#f8f3ed] py-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#c9a66b] font-medium tracking-wider text-sm uppercase mb-4 block">
            Sobre Nosotros
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3d2c1e] leading-tight text-balance">
            Somos nutricionistas que amamos cocinar
          </h2>
        </div>

        {/* Main content - Imagen y texto lado a lado */}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Imagen de fundadores */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-sm">
              <Image
                src="/images/aboutme.jpeg"
                alt="Fundadores de Tartisima cocinando juntos"
                width={400}
                height={530}
                className="w-full h-auto object-cover"
                loading="eager"
                priority
              />
            </div>
            {/* Elemento decorativo */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#c9a66b]/10 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#c9a66b]/10 rounded-full -z-10" />
          </div>

          {/* Texto */}
          <div className="lg:pl-4">
            <p className="text-[#5a4636] leading-relaxed text-lg mb-6">
              <span className="font-semibold text-[#3d2c1e]">TARTISIMA</span> nacio de la necesidad real de resolver comidas rapidas y ricas.
              Como nutricionistas, sabiamos que comer bien no tiene que ser complicado
              ni aburrido.
            </p>

            <p className="text-[#5a4636] leading-relaxed mb-6">
              Diseñamos cada receta para lograr un equilibrio entre sabor y nutricion.
              Usamos ingredientes frescos y de calidad, y las preparamos de forma
              artesanal en La Plata.
            </p>

            <p className="text-[#5a4636] leading-relaxed">
              Nuestras tartas estan pensadas para vos: la persona que trabaja, estudia, y
              necesita solucionar la comida del dia sin resignar lo rico. Freezalas y tene
              siempre una comida casera a mano.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#fef9f3] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#fdf5eb] flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#c9a66b]" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-[#3d2c1e] text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-[#7a6b5a] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

