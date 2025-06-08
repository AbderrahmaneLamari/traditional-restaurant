"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function CartIcon() {
  const { toggleCart, getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-amber-600 hover:bg-amber-700">
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Button>
  )
}
