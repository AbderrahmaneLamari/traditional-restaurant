import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCompositeMonthlyGrowth } from '@/lib/growth-calculator';

export const dynamic = 'force-dynamic'

export async function GET() {

    // const today = new Date();
    // const prev30Days = subDays(today, 30);
    try {
        //     const thirtyDaysAgo = subDays(new Date(), 30)
        const [numberMenuItems, result] = await Promise.all([
            prisma.menuItem.count(),
            getCompositeMonthlyGrowth()
        ]);

        //     const ordersToday = orders.filter(order => isToday(order.createdAt)).length
        //     const ordersLastMonth = orders.filter(order => isEqual(order.createdAt, thirtyDaysAgo)).length
        //     const dailyOrderRatio = ((ordersToday - ordersLastMonth) / ordersLastMonth) * 100

        //     // calculate revenue this month, and the last month
        //     const theMonthsOrders = orders.filter(order => isAfter(startOfMonth(today), order.createdAt) && isBefore(order.createdAt, endOfMonth(today)));
        //     const revenueThisMonth = theMonthsOrders.reduce(
        //         (sum, order) => sum + order.items.reduce((s, i) => s + i.price, 0),
        //         0
        //     )

        //     const lastMonthOrders = orders.filter(order => isAfter(startOfMonth(prev30Days), order.createdAt) && isBefore(order.createdAt, endOfMonth(prev30Days)));

        //     const revenueLastMonth = lastMonthOrders.reduce((sum, order) => sum + order.items.reduce((s, i) => s + i.price, 0), 0);

        //     const revenueRatio = ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;
        //     return NextResponse.json({
        //         revenueThisMonth,
        //         revenueRatio,
        //         ordersToday,
        //         dailyOrderRatio,
        //         numberMenuItems,
        //     });

        return NextResponse.json(
            {
                revenueThisMonth: result.currentRevenue,
                revenueRatio: result.revenueGrowth,
                ordersToday: result.currentCount,
                ordersRatio: result.countGrowth,
                growth: result.compositeGrowth,
                numberMenuItems
            }
        )

    } catch (error) {
        console.error('Error computing summary:', error);
        return NextResponse.json({ error: 'Failed to compute summary' }, { status: 500 });
    }
}
