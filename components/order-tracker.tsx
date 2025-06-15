"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, Clock, ChefHat, Truck, MapPin, Phone, Delete, Cross, Trash, Trash2 } from "lucide-react"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import Link from "next/link"
import { Order, OrderStatus as nigga } from "@/lib/generated/prisma"



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
  status: nigga
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
    status: nigga.PREPARING,
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
    status: nigga.COMPLETED,
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
    status: nigga.PREPARING,
    type: "delivery",
    address: "456 Oak Ave, City, State 12345",
    orderTime: "2024-01-15 13:45",
    estimatedDeliveryTime: "2024-01-15 14:30",
  },
}

interface menuItems {
  name: string
  price: number
  quantity: number
}
const baseUrl = process.env.BASE_URL || `http://localhost:3000${process.env.PORT}` || "http://localhost:3000";
export function OrderTracker({ orderProp, totalSum, menuItems }: { orderProp: Order, totalSum: number, menuItems: menuItems[] }) {

  const getStatusStep = (status: string) => {
    switch (status) {
      case nigga.PENDING:
        return 1
      case nigga.PREPARING:
        return 2
      case nigga.COMPLETED:
        return 3
      case nigga.DELIVERED:
        return 4
      case nigga.CANCELLED:
        return 1
      default:
        return 1
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case nigga.PENDING:
        return "bg-yellow-100 text-yellow-800"
      case nigga.PREPARING:
        return "bg-blue-100 text-blue-800"
      case nigga.COMPLETED:
        return "bg-green-100 text-green-800"
      case nigga.DELIVERED:
        return "bg-gray-100 text-gray-800"
      case nigga.CANCELLED:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case nigga.PENDING:
        return "Order Received"
      case nigga.PREPARING:
        return "Preparing Your Order"
      case nigga.COMPLETED:
        return "Ready for Pickup"
      case nigga.DELIVERED:
        return "Delivered"
      case nigga.CANCELLED:
        return "Cancelled"
      default:
        return "Unknown Status"
    }
  }
   const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {

    try {
      const res = await fetch(`${baseUrl}/api/v1/order/${orderId}`,
        {
          cache: 'no-store',
          method: `PUT`,
          body: JSON.stringify({ status: newStatus.toUpperCase() }),
        }
      )

      if (!res.ok) {
        throw new Error(`Failed to update order status: ${res.statusText}`)
      } 
    }
    catch (error) {
      console.error("Failed to update order status:", error)
      return
    }

   }
  
  const getStatusIcon = (status: string, active: boolean) => {
    const className = `h-6 w-6 ${active ? "text-amber-600" : "text-gray-400"}`

    switch (status) {
      case nigga.PENDING:
        return <Clock className={className} />
      case nigga.PREPARING:
        return <ChefHat className={className} />
      case nigga.COMPLETED:
        return <CheckCircle2 className={className} />
      case nigga.DELIVERED:
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

        {/* Order Details */}
        {(
          <Card className="max-w-4xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <GeometricPattern className="text-amber-600" />
            </div>

            <CardHeader className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">Order #{orderProp.id}</CardTitle>
                  {/* <p className="text-muted-foreground">Placed on {orderProp.createdAt.toISOString()}</p> */}
                </div>
                <Badge className={getStatusColor(orderProp.status)}>{getStatusText(orderProp.status)}</Badge>
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
                    style={{ width: `${(getStatusStep(orderProp.status) / 3) * 100}%` }}
                  ></div>

                  {/* Status steps */}
                  <div className="relative flex justify-between">
                    {[nigga.PENDING, nigga.PREPARING, nigga.COMPLETED].map((status, index) => {
                      const isActive = getStatusStep(orderProp.status) >= index + 1
                      return (
                        <div key={status} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${isActive ? "bg-amber-600" : "bg-gray-200"
                              }`}
                          >
                            {getStatusIcon(status, isActive)}
                          </div>
                          <span
                            className={`text-xs mt-5 text-center max-w-[80px] ${isActive ? "text-foreground font-medium" : "text-muted-foreground"
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


              {/* Customer Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Details</h3>
                  <p>Table No.{orderProp.table_num}</p>
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-4 w-4" /> {orderProp.phone}
                  </p>
                </div>

                <div>
                  
                  
                  <Button className="flex items-center rounded-lg gap-1 bg-red-600 text-white"
                    onClick={() => updateOrderStatus(orderProp.id, nigga.CANCELLED)}
                  >
                    <Trash2 className="h-4 w-4" /> Cancel Order
                  </Button>
                </div>
                {/* {orderProp.type === "delivery" && order.address && (
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Address</h3>
                    <p className="flex items-start gap-1">
                      <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                      <span>{order.address}</span>
                    </p>
                  </div>
                )} */}
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2 mb-4">
                  {menuItems.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground"> × {item.quantity}</span>
                      </div>
                      <span>DZD{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>DZD{totalSum}</span>
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
