"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Phone, Eye } from "lucide-react"

interface Order {
  id: number
  customerName: string
  customerPhone: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
  type: "delivery" | "pickup"
  address?: string
  orderTime: string
  estimatedTime?: string
}

const initialOrders: Order[] = [
  {
    id: 1001,
    customerName: "Sarah Johnson",
    customerPhone: "+1 (555) 123-4567",
    customerEmail: "sarah@example.com",
    items: [
      { name: "Couscous Royale", quantity: 2, price: 18.99 },
      { name: "Mint Tea", quantity: 2, price: 3.99 },
    ],
    total: 45.96,
    status: "preparing",
    type: "delivery",
    address: "123 Main St, City, State 12345",
    orderTime: "2024-01-15 12:30",
    estimatedTime: "45 min",
  },
  {
    id: 1002,
    customerName: "Ahmed Ali",
    customerPhone: "+1 (555) 987-6543",
    customerEmail: "ahmed@example.com",
    items: [
      { name: "Tagine Djaj", quantity: 1, price: 16.99 },
      { name: "Baklava", quantity: 3, price: 6.99 },
    ],
    total: 37.96,
    status: "ready",
    type: "pickup",
    orderTime: "2024-01-15 13:15",
    estimatedTime: "Ready",
  },
  {
    id: 1003,
    customerName: "Maria Garcia",
    customerPhone: "+1 (555) 456-7890",
    customerEmail: "maria@example.com",
    items: [
      { name: "Chorba", quantity: 1, price: 8.99 },
      { name: "Mechoui", quantity: 1, price: 22.99 },
    ],
    total: 31.98,
    status: "pending",
    type: "delivery",
    address: "456 Oak Ave, City, State 12345",
    orderTime: "2024-01-15 13:45",
    estimatedTime: "60 min",
  },
]

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "preparing", label: "Preparing" },
    { value: "ready", label: "Ready" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ]

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "delivery", label: "Delivery" },
    { value: "pickup", label: "Pickup" },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesType = selectedType === "all" || order.type === selectedType
    return matchesStatus && matchesType
  })

  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders((orders) => orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending":
        return "preparing"
      case "preparing":
        return "ready"
      case "ready":
        return "delivered"
      default:
        return currentStatus
    }
  }

  const getNextStatusLabel = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending":
        return "Start Preparing"
      case "preparing":
        return "Mark Ready"
      case "ready":
        return "Mark Delivered"
      default:
        return "Update"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Order Management</h2>
        <p className="text-muted-foreground">Track and manage customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusOptions.slice(1).map((status) => {
          const count = orders.filter((order) => order.status === status.value).length
          return (
            <Card key={status.value}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground">{status.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    <Badge variant="outline">{order.type}</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Customer Details</h4>
                      <p className="text-sm">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {order.customerPhone}
                      </p>
                      {order.address && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {order.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Order Details</h4>
                      <p className="text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Ordered: {order.orderTime}
                      </p>
                      {order.estimatedTime && (
                        <p className="text-sm text-muted-foreground">Estimated: {order.estimatedTime}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Items</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>

                  {order.status !== "delivered" && order.status !== "cancelled" && (
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => updateOrderStatus(order.id, getNextStatus(order.status) as Order["status"])}
                    >
                      {getNextStatusLabel(order.status)}
                    </Button>
                  )}

                  {order.status === "pending" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                    >
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
