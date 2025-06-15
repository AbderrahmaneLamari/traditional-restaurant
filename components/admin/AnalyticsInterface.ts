export interface AnalyticsProps {
    topMenuItems: { name: string, count: number, revenue: number }[]
    // overviewData: {
    //     totalRevenue: number
    //     orderCount: number
    //     AOV: number
    // }
    revenueTrend: { month: string, revenue: number }[]
}