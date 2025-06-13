import { AdminDashboard } from "./AdminDashboard"
const baseUrl = 'http://localhost:3000';

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


export default async function AdminDashboardPage() {

    try {

        const [summaryData, MenuManagementProps, orders, overview_res, top_res, revenue_res] = await Promise.all([

            fetch(`${baseUrl}/api/v1/analytics/summary`, { cache: 'no-store', }),
            fetch(`${baseUrl}/api/v1/menu`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/v1/order`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/v1/analytics/dashboard`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/v1/analytics/top-items`, { cache: 'no-store' }),
            fetch(`${baseUrl}/api/v1/analytics/revenue-trend`, { cache: 'no-store' })
        ])


        if (!MenuManagementProps.ok) {
            console.log('Failed to fetch menu items', MenuManagementProps.statusText);
            throw new Error('Failed to fetch menu items ');
        }
        if (!summaryData.ok) {
            console.log('Failed to fetch summary data', summaryData.statusText);
            throw new Error('Failed to fetch summary data');
        }
        if (!orders.ok) {
            console.log('Failed to fetch orders', orders.statusText);
            throw new Error('Failed to fetch orders');
        }
        if (!overview_res.ok) {
            console.log('Failed to fetch overview data', overview_res.statusText);
            throw new Error('Failed to fetch overview data');
        }
        if (!top_res.ok) {
            console.log('Failed to fetch top items', top_res.statusText);
            throw new Error('Failed to fetch top items');
        }
        if (!revenue_res.ok) {
            console.log('Failed to fetch revenue trend', revenue_res.statusText);
            throw new Error('Failed to fetch revenue trend');
        }
        const [data, menuItems, ordersItems, dashboard, top, revenueTrend] = await Promise.all(
            [summaryData.json(),
            MenuManagementProps.json(),
            orders.json(),
            overview_res.json(),
            top_res.json(),
            revenue_res.json()]
        );

        return <AdminDashboard initialSummary={data} menuItems={menuItems} orderItems={ordersItems} analytics={{ topMenuItems: top, overviewData: dashboard, revenueTrend: revenueTrend }} />


    } catch (error) {
        return <div className="flex items-center justify-center h-screen">

            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p className="text-red-500">Failed to load admin dashboard data.</p>
            </div>
        </div>
    }




}