import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MenuItemSpecials } from '@/lib/generated/prisma'

// GET all items
export async function GET() {
    try {
        // Fetch all menu items with their specials
        const items = await prisma.menuItem.findMany({
            include: { specials: true }
        })


        const reponseItems = items.map(item => {
            return {
                ...item,
                spicy: item.specials.some(special => special.type === 'SPICY'),
                popular: item.specials.some(special => special.type === 'POPULAR'),
                vegan: item.specials.some(special => special.type === 'VEGAN'),
            }

        })


        return NextResponse.json(reponseItems, { status: 200 });
    } catch (error) {
        console.error('Error fetching menu items:'.toUpperCase(), error)
        return NextResponse.json(
            { message: 'Failed to fetch menu items', error },
            { status: 500 }
        )
    }

}


// POST add new item
export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        const { name, arabicName, description, price, category, specials, available } = body as { available?: boolean, name: string, arabicName?: string, category: string, description?: string, price: number, specials?: MenuItemSpecials[] }


        const item = await prisma.menuItem.create({
            data: {
                name,
                price,
                arabicName,
                category,
                description,
                available,
                specials: specials?.length
                    ? {
                        create: specials.map((type: MenuItemSpecials) => ({
                            type, // Make sure this is a valid enum value
                        })),
                    }
                    : undefined,
            },
            include: {
                specials: true, // Optional: include the related specials in the result
            },
        });

        return NextResponse.json(item, { status: 201 })

    } catch (err) {
        console.log('Error creating menu item:', err)
        return NextResponse.json(
            { message: 'Failed to create menu item', error: err },
            { status: 500 }
        )
    }

}
