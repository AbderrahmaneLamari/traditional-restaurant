import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MenuItemSpecials } from '@/lib/generated/prisma'
export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    const item = await prisma.menuItem.findUnique({
        where: { id: params.id },
        include: { specials: true }
    })
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    return NextResponse.json(item)
}
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { specials, ...menuItemData } = body

        // First, delete all existing specials for this menu item
        await prisma.itemSpecial.deleteMany({
            where: { menuItemId: params.id }
        })

        // Then update the menu item and create new specials
        const updatedMenuItem = await prisma.menuItem.update({
            where: { id: params.id },
            data: {
                ...menuItemData,
                specials: {
                    create: specials?.map((special: string) => ({
                        type: special as MenuItemSpecials
                    })) || []
                }
            },
            include: {
                specials: true
            }
        })

        // Transform the response to include boolean flags
        const responseData = {
            ...updatedMenuItem,
            spicy: updatedMenuItem.specials.some(special => special.type === 'SPICY'),
            popular: updatedMenuItem.specials.some(special => special.type === 'POPULAR'),
            vegan: updatedMenuItem.specials.some(special => special.type === 'VEGAN'),
            // Remove the specials array from the response
            specials: undefined
        }

        // Clean up undefined specials property
        delete responseData.specials

        return NextResponse.json(responseData)
    } catch (error) {
        console.error('Error updating menu item:', error)
        return NextResponse.json(
            { error: 'Failed to update menu item' },
            { status: 500 }
        )
    }
}

// For consistency, also update the POST handler
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { specials, ...menuItemData } = body

        const newMenuItem = await prisma.menuItem.create({
            data: {
                ...menuItemData,
                specials: {
                    create: specials?.map((special: string) => ({
                        type: special as MenuItemSpecials
                    })) || []
                }
            },
            include: {
                specials: true
            }
        })

        // Transform the response to include boolean flags
        const responseData = {
            ...newMenuItem,
            spicy: newMenuItem.specials.some(special => special.type === 'SPICY'),
            popular: newMenuItem.specials.some(special => special.type === 'POPULAR'),
            vegan: newMenuItem.specials.some(special => special.type === 'VEGAN'),
        }

        return NextResponse.json(responseData)
    } catch (error) {
        console.error('Error creating menu item:', error)
        return NextResponse.json(
            { error: 'Failed to create menu item' },
            { status: 500 }
        )
    }
}


export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        await prisma.menuItem.delete({ where: { id: params.id } })

    } catch (error) {
        console.error('Error deleting menu item:', error)
        return NextResponse.json({ msg: 'Failed to delete item', error }, { status: 500 })
    }
    return NextResponse.json({ message: 'Deleted' })
}
