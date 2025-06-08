import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Settings, Clock } from "lucide-react"
import Link from "next/link"
import { GeometricPattern } from "@/components/arabic-patterns"

export function NavigationCards() {
  const cards = [
    {
      title: "Online Menu",
      arabicTitle: "القائمة الإلكترونية",
      description: "Browse our full menu and place orders online",
      icon: ShoppingCart,
      href: "/menu",
      color: "bg-amber-600 hover:bg-amber-700",
    },
    {
      title: "Track Order",
      arabicTitle: "تتبع الطلب",
      description: "Check the status of your current order",
      icon: Clock,
      href: "/order-status",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Admin Dashboard",
      arabicTitle: "لوحة الإدارة",
      description: "Manage menu items, orders, and restaurant operations",
      icon: Settings,
      href: "/admin",
      color: "bg-emerald-600 hover:bg-emerald-700",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Quick Access
            <span className="block text-amber-600 text-lg font-normal mt-2">الوصول السريع</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access our online services and management tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <GeometricPattern className="text-amber-600" />
              </div>

              <CardHeader className="text-center relative z-10">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                <p className="text-amber-600 font-medium arabic-text">{card.arabicTitle}</p>
              </CardHeader>

              <CardContent className="text-center relative z-10">
                <p className="text-muted-foreground mb-6">{card.description}</p>
                <Link href={card.href}>
                  <Button className={`w-full ${card.color} text-white`}>Access {card.title}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
