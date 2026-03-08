"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sabores", href: "#catalogo" },
  { label: "Pedido", href: "#pedido-rapido" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const [badgePulse, setBadgePulse] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    if (totalItems > 0) {
      setBadgePulse(true)
      const t = setTimeout(() => setBadgePulse(false), 300)
      return () => clearTimeout(t)
    }
  }, [totalItems])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center px-6 py-3 md:py-4">
        {/* Logo - fixed width left */}
        <a
          href="#inicio"
          className="font-serif text-2xl font-bold tracking-tight text-primary transition-transform duration-200 hover:scale-105 shrink-0"
        >
          TARTISIMA
        </a>

        {/* Desktop nav links - centered */}
        <ul className="hidden lg:flex items-center justify-center gap-6 flex-1 mx-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary whitespace-nowrap after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side actions - fixed width right */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 ml-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center size-10 rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={`Carrito con ${totalItems} productos`}
          >
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span
                className={`absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ${badgePulse ? "cart-badge-pulse" : ""}`}
              >
                {totalItems}
              </span>
            )}
          </button>

          <Button asChild className="rounded-full" size="sm">
            <a href="#pedido-rapido">Armar pedido</a>
          </Button>
        </div>

        {/* Mobile right */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center size-10 rounded-full bg-secondary text-foreground"
            aria-label={`Carrito con ${totalItems} productos`}
          >
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span
                className={`absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ${badgePulse ? "cart-badge-pulse" : ""}`}
              >
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background border-t border-border px-6 pb-6">
          <ul className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild className="w-full rounded-full" size="lg">
            <a href="#pedido-rapido" onClick={() => setOpen(false)}>
              Armar pedido
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
