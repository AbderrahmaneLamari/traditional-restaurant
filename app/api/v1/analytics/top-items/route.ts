import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const items = await prisma.menuItem.findMany({
            include: {
                orders: true
            }
        })

        const itemCounts = items.map(item => ({
            id: item.id,
            name: item.name,
            count: item.orders.length,
            revenue: item.orders.length * item.price
        }))

        const topItems = itemCounts
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)

        return NextResponse.json(topItems)
    } catch {
        return NextResponse.json({ error: 'Could not fetch top items' }, { status: 500 })
    }
}
