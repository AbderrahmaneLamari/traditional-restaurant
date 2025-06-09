import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { subDays } from 'date-fns'

export async function GET(req: NextRequest) {
    try {
        const today = new Date()
        const past30 = subDays(today, 30)

        const orders = await prisma.order.findMany({
            where: { createdAt: { gte: past30 } },
            include: { items: true }
        })

        const trend: Record<string, number> = {}

        for (const order of orders) {
            const date = order.createdAt.toISOString().split('T')[0] // YYYY-MM-DD
            const total = order.items.reduce((sum, item) => sum + item.price, 0)
            trend[date] = (trend[date] || 0) + total
        }

        return NextResponse.json(trend)
    } catch {
        return NextResponse.json({ error: 'Could not compute revenue trend' }, { status: 500 })
    }
}
