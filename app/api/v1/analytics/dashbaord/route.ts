import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET() {
    try {
        const [orders] = await Promise.all([
            prisma.order.findMany({
                include: {
                    items: true
                }
            })
        ]);

        const orderCount = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.items.reduce((s, i) => s + i.price, 0), 0)
        const AOV = totalRevenue / orderCount;
        return NextResponse.json({
            orderCount,
            totalRevenue,
            AOV
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to load dashboard analytics' }, { status: 500 })
    }
}
