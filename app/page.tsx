"use client"

import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Catalogo } from "@/components/catalogo"
import { QuickOrder } from "@/components/quick-order"
import { About } from "@/components/about"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <Catalogo />
        <QuickOrder />
        <About />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </CartProvider>
  )
}
