import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { subMonths, format } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest) {
    try {
        const today = new Date()
        const past3Months = subMonths(today, 3) // Change to 6, 12, etc. if needed

        const orders = await prisma.order.findMany({
            where: { createdAt: { gte: past3Months } },
            include: {
                OrderItem: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        })

        const trendMap: Record<string, number> = {}

        for (const order of orders) {
            const month = format(order.createdAt, 'MMMM') // e.g. "June"

            const total = order.OrderItem.reduce((sum, item) => {
                return sum + item.quantity * item.menuItem.price
            }, 0)

            trendMap[month] = (trendMap[month] || 0) + total
        }

        const trend = Object.entries(trendMap).map(([month, revenue]) => ({
            month,
            revenue: Number(revenue.toFixed(2)),
        }))

        // Optional: sort months by order of appearance (Jan–Dec)
        const monthOrder = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ]

        trend.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month))

        return NextResponse.json(trend)
    } catch {
        return NextResponse.json(
            { error: 'Could not compute monthly revenue trend' },
            { status: 500 }
        )
    }
}

