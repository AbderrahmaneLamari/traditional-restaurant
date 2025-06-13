"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { GeometricPattern } from "@/components/arabic-patterns"
import Link from "next/link"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import { useCart } from "@/contexts/cart-context"

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
  image?: string
}

// const menuItems: MenuItem[] = [
//   {
//     id: '1',
//     name: "Couscous Royale",
//     arabicName: "كسكس ملكي",
//     description: "Traditional couscous with lamb, chicken, and vegetables served with aromatic broth",
//     price: 18.99,
//     category: "mains",
//     popular: true,
//   },
//   {
//     id: '2',
//     name: "Tagine Djaj",
//     arabicName: "طاجين دجاج",
//     description: "Slow-cooked chicken tagine with olives, preserved lemons, and traditional spices",
//     price: 16.99,
//     category: "mains",
//     popular: true,
//   },
//   {
//     id: '3',
//     name: "Chorba Frik",
//     arabicName: "شوربة فريك",
//     description: "Traditional Algerian soup with lamb, vegetables, and cracked wheat",
//     price: 8.99,
//     category: "starters",
//   },
//   {
//     id: '4',
//     name: "Mechoui",
//     arabicName: "مشوي",
//     description: "Slow-roasted lamb shoulder with traditional Ras el Hanout spice blend",
//     price: 22.99,
//     category: "mains",
//     spicy: true,
//   },
//   {
//     id: '5',
//     name: "Brik à l'Oeuf",
//     arabicName: "بريك بالبيض",
//     description: "Crispy pastry filled with egg, tuna, capers, and fresh herbs",
//     price: 7.99,
//     category: "starters",
//   },
//   {
//     id: '6',
//     name: "Makroudh",
//     arabicName: "مقروض",
//     description: "Traditional semolina pastry filled with dates and honey",
//     price: 5.99,
//     category: "desserts",
//     vegetarian: true,
//   },
//   {
//     id: '7',
//     name: "Baklava",
//     arabicName: "بقلاوة",
//     description: "Layers of phyllo pastry with pistachios, almonds, and honey syrup",
//     price: 6.99,
//     category: "desserts",
//     vegetarian: true,
//   },
//   {
//     id: '8',
//     name: "Atay Bil Na'na",
//     arabicName: "أتاي بالنعناع",
//     description: "Traditional North African mint tea served in authentic glasses",
//     price: 3.99,
//     category: "beverages",
//     vegetarian: true,
//   },
//   {
//     id: '9',
//     name: "Harira",
//     arabicName: "حريرة",
//     description: "Rich tomato-based soup with lentils, chickpeas, and fresh herbs",
//     price: 7.99,
//     category: "starters",
//     vegetarian: true,
//   },
//   {
//     id: '10',
//     name: "Kefta Tagine",
//     arabicName: "طاجين كفتة",
//     description: "Spiced meatballs in tomato sauce with eggs and fresh herbs",
//     price: 15.99,
//     category: "mains",
//     spicy: true,
//   },
// ]

const categories = [
  { id: "all", name: "All Items", arabicName: "جميع الأطباق" },
  { id: "starters", name: "Starters", arabicName: "المقبلات" },
  { id: "mains", name: "Main Courses", arabicName: "الأطباق الرئيسية" },
  { id: "desserts", name: "Desserts", arabicName: "الحلويات" },
  { id: "beverages", name: "Beverages", arabicName: "المشروبات" },
]

export function OnlineMenu({ menuItems }: { menuItems: MenuItem[] }) {
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
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-96 h-10">
            <ArabesqueLineDivider variant="ornate" className="text-amber-600 opacity-50" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground relative">
            Online Menu
            <span className="block text-amber-600 text-xl font-normal mt-2">القائمة الإلكترونية</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Order authentic Algerian cuisine for delivery or pickup. All dishes are prepared fresh with traditional
            recipes.
          </p>

          <Link href="/">
            <Button variant="outline" className="mb-8">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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

        {/* Floating Cart Summary */}
        {state.items.length > 0 && (
          <div className="fixed bottom-4 right-4 z-40">
            <Card className="bg-amber-600 text-white shadow-lg cursor-pointer" onClick={openCart}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">
                      {state.items.reduce((total, item) => total + item.quantity, 0)} items
                    </p>
                    <p className="text-sm">
                      ${state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </p>
                  </div>
                  <Button size="sm" variant="secondary">
                    View Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const quantity = getItemQuantity(item.id)
            return (
              <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                {/* Decorative corner pattern */}
                <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                  <GeometricPattern variant="corner" className="text-amber-600" />
                </div>

                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 flex items-center gap-2">
                        {item.name}
                        <span className="text-amber-600 opacity-60 text-sm">◈</span>
                      </CardTitle>
                      <p className="text-sm text-amber-600 font-medium arabic-text">{item.arabicName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.popular && <Badge variant="secondary">Popular</Badge>}
                    {item.spicy && <Badge variant="destructive">Spicy</Badge>}
                    {item.vegetarian && <Badge variant="outline">Vegetarian</Badge>}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{item.description}</p>

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
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
