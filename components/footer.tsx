import { Separator } from "@/components/ui/separator"

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catalogo", href: "#catalogo" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
]

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-7xl px-6">
        <Separator className="mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#inicio" className="font-serif text-xl font-bold text-primary">
            TARTISIMA
          </a>

          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-muted-foreground">
            {`\u00A9 ${new Date().getFullYear()} TARTISIMA. Todos los derechos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
