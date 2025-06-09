"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Plus, Minus, X, ShoppingCart, Trash2, CreditCard } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import Link from "next/link"

export function ShoppingCartSidebar() {
  const { state, removeItem, updateQuantity, clearCart, closeCart, getTotalItems, getTotalPrice } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground text-center mb-6">Add some delicious items from our menu to get started!</p>
        <Button onClick={closeCart} className="bg-amber-600 hover:bg-amber-700">
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b relative">
        <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
          <GeometricPattern variant="corner" className="text-amber-600" />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Order</h2>
          <Badge variant="secondary">{getTotalItems()} items</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Review your items before checkout</p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {state.items.map((item) => (
          <Card key={item.id} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 opacity-5">
              <GeometricPattern variant="corner" className="text-amber-600" />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-amber-600 arabic-text">{item.arabicName}</p>
                  <div className="flex gap-1 mt-1">
                    {item.spicy && (
                      <Badge variant="destructive" className="text-xs">
                        Spicy
                      </Badge>
                    )}
                    {item.vegetarian && (
                      <Badge variant="outline" className="text-xs">
                        Vegetarian
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-6 space-y-4">
        <div className="mb-4">
          <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-30" />
        </div>

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${(getTotalPrice()).toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link href="/checkout" onClick={closeCart} className="w-full">
            <Button className="w-full bg-amber-600 hover:bg-amber-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Checkout
            </Button>
          </Link>
          <Button variant="outline" onClick={clearCart} className="w-full">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>


      </div>
    </div>
  )
}

export function CartSheet() {
  const { state, toggleCart, closeCart } = useCart()

  return (
    <Sheet open={state.isOpen} onOpenChange={toggleCart}>
      <SheetContent side="right" className="w-full sm:w-96 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ShoppingCartSidebar />
      </SheetContent>
    </Sheet>
  )
}
