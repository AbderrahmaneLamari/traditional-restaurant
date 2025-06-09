"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

const revenueData = [
  { month: "Jan", revenue: 12400, orders: 89 },
  { month: "Feb", revenue: 13200, orders: 95 },
  { month: "Mar", revenue: 15800, orders: 112 },
  { month: "Apr", revenue: 14600, orders: 103 },
  { month: "May", revenue: 16900, orders: 128 },
  { month: "Jun", revenue: 18200, orders: 142 },
]

const orderTypes = [
  { name: "Delivery", value: 65, color: "#f59e0b" },
  { name: "Pickup", value: 35, color: "#10b981" },
]

const COLORS = ["#f59e0b", "#10b981"]

export function Analytics() {

  const [dashboard, setDashboard] = useState({
    totalRevenue: 0,
    orderCount: 0,
    AOV: 0,
  })
  const [topItems, setTopItems] = useState([])
  const [popularItems, setPopularItems] = useState([])
  const [orderTypes, setOrderTypes] = useState([])



  useEffect(() => {
    const fetchAnalytics = async () => {
      try {

        const res = await fetch("/api/v1/analytics/dashboard", {
          cache: "no-store",
        })

        const topItems = await fetch("/api/v1/analytics/top-items", {
          cache: "no-store",
        })

        if (!topItems.ok) {
          const err = await topItems.json()
          throw new Error(err.error || "Failed to fetch top items")
        }

        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Failed to fetch analytics")
        }

        const data = await res.json()

        setDashboard({
          totalRevenue: data.totalRevenue,
          orderCount: data.orderCount,
          AOV: data.AOV,
        })
        setTopItems(await topItems.json())
      } catch (err) {
        console.error("Analytics fetch error:", err)
      }
    }

    fetchAnalytics()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Analytics & Reports</h2>
        <p className="text-muted-foreground">Track your restaurant's performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DZD{dashboard.totalRevenue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.orderCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DZD {dashboard.AOV}</div>

          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`DZD${value}`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Types */}
        <Card>
          <CardHeader>
            <CardTitle>Order Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Popular Items */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topItems as { name: string, orders: number }[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Popular Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topItems.map((item: { name: string, count: number, revenue: number }, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-amber-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.count} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">DZD{item.revenue.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
