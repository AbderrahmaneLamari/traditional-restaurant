"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import { GeometricPattern } from "@/components/arabic-patterns"
import { CheckCircle2, Clock, MapPin, CalendarCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order") || "ORD-0000"

  // In a real app, you would fetch the order details from your API
  const orderDetails = {
    status: "confirmed",
    estimatedTime: "30-45 minutes",
    orderDate: new Date().toLocaleString(),
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-96 h-10">
                <ArabesqueLineDivider variant="ornate" className="text-amber-600 opacity-50" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                Order Confirmed
                <span className="block text-amber-600 text-lg font-normal mt-2">تم تأكيد الطلب</span>
              </h1>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                Thank you for your order! We're preparing your delicious Algerian cuisine.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                <GeometricPattern variant="corner" className="text-amber-600" />
              </div>
              <CardHeader className="text-center border-b pb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Order #{orderNumber}</CardTitle>
                <p className="text-muted-foreground">
                  Status: <span className="text-green-600 font-medium">Confirmed</span>
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Estimated Time</h3>
                      <p className="text-muted-foreground">{orderDetails.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <CalendarCheck className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Order Date</h3>
                      <p className="text-muted-foreground">{orderDetails.orderDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Track Your Order</h3>
                      <p className="text-muted-foreground">Follow the status of your order in real-time</p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Link href={`/order-status?order=${orderNumber}`} className="flex-1">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        Track Order
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Return to Home
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center text-sm text-muted-foreground mt-4 pt-4 border-t">
                    <p>
                      Questions about your order? Contact us at <span className="font-medium">(555) 123-4567</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
