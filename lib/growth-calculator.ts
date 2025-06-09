import { startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { prisma } from '@/lib/prisma'

function calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current === 0 ? 0 : 100
    return ((current - previous) / previous) * 100
}

export async function getCompositeMonthlyGrowth() {
    const now = new Date()
    const startCurrent = startOfMonth(now)
    const endCurrent = endOfMonth(now)

    const startPrevious = startOfMonth(subMonths(now, 1))
    const endPrevious = endOfMonth(subMonths(now, 1))

    const [currentOrders, previousOrders] = await Promise.all([
        prisma.order.findMany({
            where: { createdAt: { gte: startCurrent, lte: endCurrent } },
            include: { items: true }
        }),
        prisma.order.findMany({
            where: { createdAt: { gte: startPrevious, lte: endPrevious } },
            include: { items: true }
        })
    ])

    // Revenue
    const getRevenue = (orders: typeof currentOrders) =>
        orders.reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.price, 0), 0)

    const currentRevenue = getRevenue(currentOrders)
    const previousRevenue = getRevenue(previousOrders)

    const revenueGrowth = calculateGrowth(currentRevenue, previousRevenue)

    // Order count
    const currentCount = currentOrders.length
    const previousCount = previousOrders.length
    const countGrowth = calculateGrowth(currentCount, previousCount)

    // AOV
    const currentAOV = currentCount ? currentRevenue / currentCount : 0
    const previousAOV = previousCount ? previousRevenue / previousCount : 0
    const aovGrowth = calculateGrowth(currentAOV, previousAOV)

    // Composite growth
    const compositeGrowth = (revenueGrowth + countGrowth + aovGrowth) / 3

    return {
        currentRevenue,
        currentCount,
        currentAOV: Number(currentAOV.toFixed(2)),
        
        revenueGrowth: Number(revenueGrowth.toFixed(2)),
        countGrowth: Number(countGrowth.toFixed(2)),
        aovGrowth: Number(aovGrowth.toFixed(2)),

        compositeGrowth: Number(compositeGrowth.toFixed(2)),
    }
}
