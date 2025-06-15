import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export async function GET() {
    try {
        const items = await prisma.menuItem.findMany({
            include: {
                OrderItem: true, // ✅ correct relation name from your schema
            },
        })

        const itemCounts = items.map((item) => {
            const totalQuantity = item.OrderItem.reduce(
                (sum, orderItem) => sum + orderItem.quantity,
                0
            )

            return {
                id: item.id,
                name: item.name,
                count: totalQuantity,
                revenue: Number((totalQuantity * item.price).toFixed(2)),
            }
        })

        const topItems = itemCounts
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)

        return NextResponse.json(topItems)
    } catch (error) {
        return NextResponse.json(
            { error: 'Could not fetch top items' },
            { status: 500 }
        )
    }
}
