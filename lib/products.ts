export type Variant = "blanca" | "integral"

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  tag: string | null
  variants: Variant[]
}

export const products: Product[] = [
  {
    id: "pollo-al-verdeo",
    name: "Pollo al Verdeo",
    slug: "pollo-al-verdeo",
    description:
      "Pollo desmenuzado con verdeo salteado, un clasico irresistible con el toque justo de cremosidad.",
    price: 5500,
    image: "/images/polloverdeo.jpeg", 
    tag: "Mas vendida",
    variants: ["blanca", "integral"],
  },
  {
    id: "cebolla-y-hongos",
    name: "Cebolla y Hongos",
    slug: "cebolla-y-hongos",
    description:
      "Cebolla caramelizada y hongos frescos en una combinacion intensa y aromatica.",
    price: 5500,
    image: "/images/cebollahongo.jpeg",
    tag: null,
    variants: ["blanca", "integral"],
  },
  {
    id: "jamon-y-queso",
    name: "Jamon y Queso",
    slug: "jamon-y-queso",
    description:
      "El clasico que nunca falla. Jamon y queso en cada bocado. Favorita de grandes y chicos.",
    price: 5000,
    image: "/images/jyq.jpeg",
    tag: "Clasica",
    variants: ["blanca", "integral"],
  },
  {
    id: "atun",
    name: "Atun",
    slug: "atun",
    description:
      "Atun con morron y cebolla en salsa detomate coronada con queso gratinado.",
    price: 5000,
    image: "/images/atun.jpeg",
    tag: null,
    variants: ["blanca", "integral"],
  },
  {
    id: "espinaca",
    name: "Espinaca",
    slug: "espinaca",
    description:
      "Espinaca fresca con queso. Nutritiva, cremosa y deliciosa.",
    price: 4500,
    image: "/images/espinaca.jpeg",
    tag: "Veggie",
    variants: ["blanca", "integral"],
  },
  {
    id: "humita",
    name: "Humita",
    slug: "humita",
    description:
      "Choclo con cebolla morron. Un sabor bien nuestro, reconfortante y casero.",
    price: 4500,
    image: "/images/humita.jpeg",
    tag: "Veggie",
    variants: ["blanca", "integral"],
  },
]
