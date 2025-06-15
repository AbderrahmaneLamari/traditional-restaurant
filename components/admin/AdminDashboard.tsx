// AdminDashboard.tsx (Client Component)
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GeometricPattern } from "@/components/arabic-patterns"
import { use, useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    DollarSign,
    Package,
    TrendingUp,
    LayoutDashboard,
    Menu,
    ShoppingCart,
    BarChart3,
    Users,
    Settings,
    ArrowLeft,
    X,
} from "lucide-react"
import Link from "next/link"
import { MenuManagement, MenuItem } from "./menu-management"
import { OrderManagement, Order } from "./order-management"
import { Analytics } from "./analytics"
import { SettingsPanel } from "./settings-panel"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import { AnalyticsProps } from "./AnalyticsInterface"


interface SummaryData {
    revenueThisMonth: number
    revenueRatio: number
    ordersToday: number
    ordersRatio: number
    aovThisMonth: number
    aovRatio: number
    growth: number
    numberMenuItems: number
}

interface AdminDashboardProps {
    initialSummary: SummaryData
}

export function AdminDashboard({ initialSummary, menuItems, orderItems, analytics }: { initialSummary: SummaryData, menuItems: MenuItem[], orderItems: Order[], analytics: AnalyticsProps }) {
    const [activeTab, setActiveTab] = useState("overview")
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <DashboardHeader onOpenSettings={() => setIsSettingsOpen(true)} />

            <div className="mb-6">
                <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-30" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    {/* Navigation Tabs */}
                    <DashboardTabs />

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <DashboardOverview
                            summary={initialSummary}
                            onTabChange={setActiveTab}
                        />
                    </TabsContent>

                    {/* Menu Management Tab */}
                    <TabsContent value="menu">
                        <MenuManagement initialMenuItems={menuItems} />
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        <OrderManagement orders={orderItems} />
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics">
                        {/* <Analytics topMenuItems={analytics.topMenuItems} overviewData={analytics.overviewData} revenueTrend={analytics.revenueTrend} /> */}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Settings Dialog */}
            <SettingsDialog
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    )
}



interface DashboardHeaderProps {
    onOpenSettings: () => void
}

export function DashboardHeader({ onOpenSettings }: DashboardHeaderProps) {
    return (
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
                        <h1 className="text-2xl font-bold text-primary lg:text-lg xl:text-xl">
                            <span className="text-amber-600">Admin</span> Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={onOpenSettings}>
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}



export function DashboardTabs() {
    return (
        <TabsList className="grid w-full grid-cols-4 grid-rows-1 gap-2 h-12 sm:h-12 md:h-15 sm:gap-2">
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
            <TabsTrigger value="analytics" className="flex items-center gap-2 max-sm:text-xs max-md:text-sm max-lg:text-md">
                <BarChart3 className="max-sm:h-2 max-sm:w-2 max-md:h-3 max-md:w-3 max-lg:h-4 max-lg:w-4" />
                Analytics
            </TabsTrigger>
        </TabsList>
    )
}


interface SummaryData {
    revenueThisMonth: number
    revenueRatio: number
    ordersToday: number
    ordersRatio: number
    aovThisMonth: number
    aovRatio: number
    growth: number
    numberMenuItems: number
}

interface DashboardOverviewProps {
    summary: SummaryData
    onTabChange: (tab: string) => void
}

export function DashboardOverview({ summary, onTabChange }: DashboardOverviewProps) {
    return (
        <>
            {/* Stats Cards */}
            <StatsCards summary={summary} />

            {/* Quick Actions */}
            <QuickActions onTabChange={onTabChange} />
        </>
    )
}




interface SummaryData {
    revenueThisMonth: number
    revenueRatio: number
    ordersToday: number
    ordersRatio: number
    aovThisMonth: number
    aovRatio: number
    growth: number
    numberMenuItems: number
}

interface StatsCardsProps {
    summary: SummaryData
}

export function StatsCards({ summary }: StatsCardsProps) {
    
    const [refreshData, setRefreshData] = useState(summary);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/v1/analytics/summary', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Failed to fetch summary data');
                }
                const data = await response.json();
                setRefreshData(data);
            } catch (error) {
                console.error('Error fetching summary data:', error);
            }
        };

        fetchData();
    }, []);

    const stats = [
        {
            title: "Total Revenue",
            value: `DZD ${refreshData.revenueThisMonth}`,
            change: summary.revenueRatio,
            changeText: "from last month",
            icon: DollarSign,
            iconColor: "text-green-600"
        },
        {
            title: "Orders Today",
            value: refreshData.ordersToday.toString(),
            change: summary.ordersRatio,
            changeText: "from last month",
            icon: ShoppingCart,
            iconColor: "text-blue-600"
        },
        {
            title: "Menu Items",
            value: refreshData.numberMenuItems.toString(),
            change: null,
            changeText: null,
            icon: Package,
            iconColor: "text-amber-600"
        },
        {
            title: "Growth",
            value: refreshData.growth.toString(),
            change: null,
            changeText: "from last month",
            icon: TrendingUp,
            iconColor: "text-purple-600"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card key={stat.title} className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
                        <GeometricPattern variant="corner" className="text-amber-600" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        {stat.change !== null && (
                            <p className="text-xs text-muted-foreground">
                                <span className={stat.change < 0 ? "text-red-600" : "text-green-600"}>
                                    {stat.change > 0 ? `+${stat.change.toFixed(1)}%` : `${stat.change.toFixed(1)}%`}
                                </span>{" "}
                                {stat.changeText}
                            </p>
                        )}
                        {stat.change === null && stat.changeText && (
                            <p className="text-xs text-muted-foreground">{stat.changeText}</p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}



interface QuickActionsProps {
    onTabChange: (tab: string) => void
}

export function QuickActions({ onTabChange }: QuickActionsProps) {
    const actions = [
        {
            title: "Add Menu Item",
            icon: Menu,
            onClick: () => onTabChange("menu"),
            variant: "default" as const
        },
        {
            title: "View Orders",
            icon: ShoppingCart,
            onClick: () => onTabChange("orders"),
            variant: "outline" as const
        },
        {
            title: "Manage Users",
            icon: Users,
            onClick: () => onTabChange("users"),
            variant: "outline" as const
        },
        {
            title: "View Analytics",
            icon: BarChart3,
            onClick: () => onTabChange("analytics"),
            variant: "outline" as const
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {actions.map((action) => (
                        <Button
                            key={action.title}
                            onClick={action.onClick}
                            variant={action.variant}
                            className="h-20 flex-col gap-2"
                        >
                            <action.icon className="h-6 w-6" />
                            {action.title}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// SettingsDialog.tsx (Client Component)



interface SettingsDialogProps {
    isOpen: boolean
    onClose: () => void
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Settings</span>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>
                <SettingsPanel />
            </DialogContent>
        </Dialog>
    )
}