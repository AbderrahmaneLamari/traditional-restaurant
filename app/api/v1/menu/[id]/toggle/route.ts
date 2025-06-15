import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export const dynamic = 'force-dynamic'

export async function PUT(_: NextRequest, { params }: { params: { id: string } }) {
    const item = await prisma.menuItem.findUnique({ where: { id: params.id } })
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 })

    const updated = await prisma.menuItem.update({
        where: { id: params.id },
        data: { available: !item.available }
    })

    return NextResponse.json({ message: 'Toggled', updated })
}
