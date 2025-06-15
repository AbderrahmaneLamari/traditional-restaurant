"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface MenuItem {
  id: string
  name: string
  arabicName: string
  description: string
  price: number
  category: string
  spicy?: boolean
  vegetarian?: boolean
  popular?: boolean
}

// const menuItems: MenuItem[] = [
//   {
//     id: 1,
//     name: "Couscous Royale",
//     arabicName: "كسكس ملكي",
//     description: "Traditional couscous with lamb, chicken, and vegetables",
//     price: 18.99,
//     category: "mains",
//     popular: true,
//   },
//   {
//     id: 2,
//     name: "Tagine Djaj",
//     arabicName: "طاجين دجاج",
//     description: "Slow-cooked chicken tagine with olives and preserved lemons",
//     price: 16.99,
//     category: "mains",
//     popular: true,
//   },
//   {
//     id: 3,
//     name: "Chorba",
//     arabicName: "شوربة",
//     description: "Traditional Algerian soup with lamb and vegetables",
//     price: 8.99,
//     category: "starters",
//   },
//   {
//     id: 4,
//     name: "Mechoui",
//     arabicName: "مشوي",
//     description: "Slow-roasted lamb shoulder with traditional spices",
//     price: 22.99,
//     category: "mains",
//     spicy: true,
//   },
//   {
//     id: 5,
//     name: "Brik",
//     arabicName: "بريك",
//     description: "Crispy pastry filled with egg, tuna, and herbs",
//     price: 7.99,
//     category: "starters",
//   },
//   {
//     id: 6,
//     name: "Makroudh",
//     arabicName: "مقروض",
//     description: "Traditional semolina pastry filled with dates",
//     price: 5.99,
//     category: "desserts",
//     vegetarian: true,
//   },
//   {
//     id: 7,
//     name: "Baklava",
//     arabicName: "بقلاوة",
//     description: "Layers of phyllo pastry with nuts and honey",
//     price: 6.99,
//     category: "desserts",
//     vegetarian: true,
//   },
//   {
//     id: 8,
//     name: "Mint Tea",
//     arabicName: "أتاي بالنعناع",
//     description: "Traditional North African mint tea",
//     price: 3.99,
//     category: "beverages",
//     vegetarian: true,
//   },
// ]

const categories = [
  { id: "all", name: "All Items", arabicName: "جميع الأطباق" },
  { id: "starters", name: "Starters", arabicName: "المقبلات" },
  { id: "mains", name: "Main Courses", arabicName: "الأطباق الرئيسية" },
  { id: "desserts", name: "Desserts", arabicName: "الحلويات" },
  { id: "beverages", name: "Beverages", arabicName: "المشروبات" },
]
interface OnlineMenuProps {
  menuItems: MenuItem[]
}
export function Menu({menuItems}: OnlineMenuProps) {

  const [selectedCategory, setSelectedCategory] = useState("all")
  const { state, addItem, updateQuantity, openCart } = useCart()

  const filteredItems =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const getItemQuantity = (itemId: string) => {
    const cartItem = state.items.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      arabicName: item.arabicName,
      price: item.price,
      category: item.category,
      spicy: item.spicy,
      vegetarian: item.vegetarian,
    })
  }

  const handleIncrement = (itemId: string) => {
    const currentQuantity = getItemQuantity(itemId)
    updateQuantity(itemId, currentQuantity + 1)
  }

  const handleDecrement = (itemId: string) => {
    const currentQuantity = getItemQuantity(itemId)
    if (currentQuantity > 0) {
      updateQuantity(itemId, currentQuantity - 1)
    }
  }

  return (
    <section id="menu" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative">
          {/* Top decorative border */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-96 h-10">
            <ArabesqueLineDivider variant="ornate" className="text-amber-600 opacity-50" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground relative">
            Our Menu
            <span className="block text-amber-600 text-lg font-normal mt-2">
              قائمة الطعام
              {/* Decorative elements around Arabic text */}
              <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60">✦</span>
              <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60">✦</span>
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the authentic flavors of Algeria with our carefully crafted dishes, made from traditional recipes
            and the finest ingredients.
          </p>

          {/* Bottom decorative border */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-64 h-6">
            <ArabesqueLineDivider variant="thick" className="text-amber-600 opacity-40" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="mb-2"
            >
              <span className="block">{category.name}</span>
              <span className="block text-xs opacity-70">{category.arabicName}</span>
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id)
            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                {/* Decorative corner pattern */}
                <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                  <GeometricPattern variant="corner" className="text-amber-600" />
                </div>

                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <GeometricPattern className="text-amber-600" />
                </div>

                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-1 flex items-center gap-2">
                        {item.name}
                        {/* Small decorative element */}
                        <span className="text-amber-600 opacity-60 text-sm">◈</span>
                      </CardTitle>
                      <p className="text-sm text-amber-600 font-medium arabic-text">{item.arabicName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">DZD{item.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.popular && <Badge variant="secondary">Popular</Badge>}
                    {item.spicy && <Badge variant="destructive">Spicy</Badge>}
                    {item.vegetarian && <Badge variant="outline">Vegetarian</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleDecrement(item.id)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => handleIncrement(item.id)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={() => handleAddToCart(item)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View Cart Button */}
        {state.items.length > 0 && (
          <div className="mt-12 text-center space-y-4">
            <Button onClick={openCart} size="lg" className="bg-amber-600 hover:bg-amber-700">
              <ShoppingCart className="h-5 w-5 mr-2" />
              View Cart ({state.items.reduce((total, item) => total + item.quantity, 0)} items)
            </Button>

            <div>
              <Link href="/checkout">
                <Button variant="outline" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
