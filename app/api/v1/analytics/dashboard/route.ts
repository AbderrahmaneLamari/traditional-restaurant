import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET() {
    try {

        const [orders, orderCount] = await Promise.all([
            prisma.order.findMany({
                where: {
                    status: {
                        in: ['COMPLETED', 'DELIVERED'], // Only consider completed or delivered orders
                    },
                },
                include: {
                    OrderItem: {
                        include: {
                            menuItem: true,
                        },
                    },
                },
            }),
            prisma.order.count({
                where: {
                    status: {
                        in: ['COMPLETED', 'DELIVERED'], // Only consider completed or delivered orders
                    },
                },
            }),
        ]);

        const totalRevenue = orders.reduce((sum, order) => {
            const orderTotal = order.OrderItem.reduce((s, item) => {
                return s + item.quantity * item.menuItem.price
            }, 0)
            return sum + orderTotal
        }, 0)

        const AOV = orderCount > 0 ? totalRevenue / orderCount : 0

        return NextResponse.json({
            orderCount,
            totalRevenue: Number(totalRevenue.toFixed(2)),
            AOV: Number(AOV.toFixed(2)),
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to load dashboard analytics' },
            { status: 500 }
        )
    }
}

