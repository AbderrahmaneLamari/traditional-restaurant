"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, Clock, ChefHat, Truck, MapPin, Phone } from "lucide-react"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import Link from "next/link"

interface OrderStatus {
  id: string
  customerName: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "preparing" | "ready" | "out-for-delivery" | "delivered"
  type: "delivery" | "pickup"
  address?: string
  orderTime: string
  estimatedDeliveryTime?: string
}

// Mock data for demonstration
const mockOrders: Record<string, OrderStatus> = {
  "ORD-1234": {
    id: "ORD-1234",
    customerName: "Ahmed Hassan",
    customerPhone: "+1 (555) 123-4567",
    items: [
      { name: "Couscous Royale", quantity: 2, price: 18.99 },
      { name: "Mint Tea", quantity: 2, price: 3.99 },
    ],
    total: 45.96,
    status: "preparing",
    type: "delivery",
    address: "123 Main St, City, State 12345",
    orderTime: "2024-01-15 12:30",
    estimatedDeliveryTime: "2024-01-15 13:15",
  },
  "ORD-5678": {
    id: "ORD-5678",
    customerName: "Fatima Benali",
    customerPhone: "+1 (555) 987-6543",
    items: [
      { name: "Tagine Djaj", quantity: 1, price: 16.99 },
      { name: "Baklava", quantity: 3, price: 6.99 },
    ],
    total: 37.96,
    status: "ready",
    type: "pickup",
    orderTime: "2024-01-15 13:15",
    estimatedDeliveryTime: "2024-01-15 13:45",
  },
  "ORD-9012": {
    id: "ORD-9012",
    customerName: "Omar Khelifi",
    customerPhone: "+1 (555) 456-7890",
    items: [
      { name: "Chorba", quantity: 1, price: 8.99 },
      { name: "Mechoui", quantity: 1, price: 22.99 },
    ],
    total: 31.98,
    status: "out-for-delivery",
    type: "delivery",
    address: "456 Oak Ave, City, State 12345",
    orderTime: "2024-01-15 13:45",
    estimatedDeliveryTime: "2024-01-15 14:30",
  },
}

export function OrderTracker() {
  const [orderNumber, setOrderNumber] = useState("")
  const [order, setOrder] = useState<OrderStatus | null>(null)
  const [error, setError] = useState("")

  const handleSearch = () => {
    setError("")

    if (!orderNumber.trim()) {
      setError("Please enter an order number")
      return
    }

    const foundOrder = mockOrders[orderNumber.trim()]

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      setError("Order not found. Please check your order number and try again.")
      setOrder(null)
    }
  }

  const getStatusStep = (status: string) => {
    switch (status) {
      case "pending":
        return 1
      case "preparing":
        return 2
      case "ready":
        return 3
      case "out-for-delivery":
        return 4
      case "delivered":
        return 5
      default:
        return 1
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "out-for-delivery":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Order Received"
      case "preparing":
        return "Preparing Your Order"
      case "ready":
        return "Ready for Pickup/Delivery"
      case "out-for-delivery":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      default:
        return "Unknown Status"
    }
  }

  const getStatusIcon = (status: string, active: boolean) => {
    const className = `h-6 w-6 ${active ? "text-amber-600" : "text-gray-400"}`

    switch (status) {
      case "pending":
        return <Clock className={className} />
      case "preparing":
        return <ChefHat className={className} />
      case "ready":
        return <CheckCircle2 className={className} />
      case "out-for-delivery":
        return <Truck className={className} />
      case "delivered":
        return <CheckCircle2 className={className} />
      default:
        return <Clock className={className} />
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
            Order Status
            <span className="block text-amber-600 text-xl font-normal mt-2">حالة الطلب</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Track the status of your order in real-time. Enter your order number to get started.
          </p>

          <Link href="/">
            <Button variant="outline" className="mb-8">
              ← Back to Home
            </Button>
          </Link>
        </div>

        {/* Order Search */}
        <Card className="max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>Track Your Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter your order number (e.g., ORD-1234)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} className="bg-amber-600 hover:bg-amber-700">
                Track Order
              </Button>
            </div>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>For testing, try these order numbers: ORD-1234, ORD-5678, ORD-9012</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <Card className="max-w-4xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <GeometricPattern className="text-amber-600" />
            </div>

            <CardHeader className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                  <p className="text-muted-foreground">Placed on {order.orderTime}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              {/* Status Timeline */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Order Progress</h3>
                <div className="relative">
                  {/* Progress bar */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
                  <div
                    className="absolute top-1/2 left-0 h-1 bg-amber-600 transform -translate-y-1/2"
                    style={{ width: `${(getStatusStep(order.status) / 5) * 100}%` }}
                  ></div>

                  {/* Status steps */}
                  <div className="relative flex justify-between">
                    {["pending", "preparing", "ready", "out-for-delivery", "delivered"].map((status, index) => {
                      const isActive = getStatusStep(order.status) >= index + 1
                      return (
                        <div key={status} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                              isActive ? "bg-amber-600" : "bg-gray-200"
                            }`}
                          >
                            {getStatusIcon(status, isActive)}
                          </div>
                          <span
                            className={`text-xs mt-2 text-center max-w-[80px] ${
                              isActive ? "text-foreground font-medium" : "text-muted-foreground"
                            }`}
                          >
                            {getStatusText(status)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Estimated Time */}
              {order.estimatedDeliveryTime && (
                <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    {order.type === "delivery" ? "Estimated Delivery" : "Ready for Pickup"}
                  </h3>
                  <p className="text-lg font-medium">{order.estimatedDeliveryTime}</p>
                </div>
              )}

              {/* Customer Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Customer Details</h3>
                  <p>{order.customerName}</p>
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-4 w-4" /> {order.customerPhone}
                  </p>
                </div>

                {order.type === "delivery" && order.address && (
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Address</h3>
                    <p className="flex items-start gap-1">
                      <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>{order.address}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground"> × {item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Help */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about your order, please contact us.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Restaurant
                  </Button>
                  <Button variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
