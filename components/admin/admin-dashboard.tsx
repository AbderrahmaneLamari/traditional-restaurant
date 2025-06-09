"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LayoutDashboard,
  Menu,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Package,
  X,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { MenuManagement } from "./menu-management"
import { UserManagement } from "./user-management"
import { OrderManagement } from "./order-management"
import { Analytics } from "./analytics"
import { SettingsPanel } from "./settings-panel"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessagesManagement } from "./messages-management"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Orders Today",
      value: "23",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Menu Items",
      value: "45",
      change: "+2",
      icon: Package,
      color: "text-amber-600",
    },
    {
      title: "Growth",
      value: "18.3%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary text-sm lg:text-lg xl:text-xl">
                <span className="text-amber-600">Admin</span> Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-6">
        <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-4 grid-rows-2 gap-2 h-12 sm:h-12 md:h-15 sm:grid-cols-5 sm:grid-rows-1 sm:gap-2">

            <TabsTrigger value="overview" className="flex items-center gap-2 max-sm:text-xs max-md:text-sm max-lg:text-md">
              <LayoutDashboard className="max-sm:h-2 max-sm:w-2 max-md:h-3 max-md:w-3 max-lg:h-4 max-lg:w-4" />
              Overview
            </TabsTrigger>  
            <TabsTrigger value="menu" className="flex items-center gap-2 max-sm:text-xs max-md:text-sm max-lg:text-md">
              <Menu className="max-sm:h-2 max-sm:w-2 max-md:h-3 max-md:w-3 max-lg:h-4 max-lg:w-4" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2 max-sm:text-xs max-md:text-sm max-lg:text-md">
              <ShoppingCart className="max-sm:h-2 max-sm:w-2 max-md:h-3 max-md:w-3 max-lg:h-4 max-lg:w-4" />
              Orders
            </TabsTrigger>
            
            <TabsTrigger value="messages" className="flex items-center gap-2 max-sm:text-xs max-md:text-sm max-lg:text-md">
              <MessageSquare className="max-sm:h-2 max-sm:w-2 max-md:h-3 max-md:w-3 max-lg:h-4 max-lg:w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 max-sm:text-xs max-md:text-sm max-lg:text-md">
              <BarChart3 className="max-sm:h-2 max-sm:w-2 max-md:h-3 max-md:w-3 max-lg:h-4 max-lg:w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
                    <GeometricPattern variant="corner" className="text-amber-600" />
                  </div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => setActiveTab("menu")} className="h-20 flex-col gap-2">
                    <Menu className="h-6 w-6" />
                    Add Menu Item
                  </Button>
                  <Button onClick={() => setActiveTab("orders")} variant="outline" className="h-20 flex-col gap-2">
                    <ShoppingCart className="h-6 w-6" />
                    View Orders
                  </Button>
                  <Button onClick={() => setActiveTab("users")} variant="outline" className="h-20 flex-col gap-2">
                    <Users className="h-6 w-6" />
                    Manage Users
                  </Button>
                  <Button onClick={() => setActiveTab("messages")} variant="outline" className="h-20 flex-col gap-2">
                    <MessageSquare className="h-6 w-6" />
                    View Messages
                  </Button>
                  <Button onClick={() => setActiveTab("analytics")} variant="outline" className="h-20 flex-col gap-2">
                    <BarChart3 className="h-6 w-6" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management Tab */}
          <TabsContent value="menu">
            <MenuManagement />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <MessagesManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Settings</span>
              <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <SettingsPanel />
        </DialogContent>
      </Dialog>
    </div>
  )
}
