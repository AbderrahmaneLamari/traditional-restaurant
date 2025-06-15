import { OnlineMenu } from "@/components/online-menu"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { prisma } from "@/lib/prisma"
import { MenuItem } from "@/components/admin/menu-management" // this is your interface

export const dynamic = "force-dynamic"; // Force dynamic rendering for this page
export default async function MenuPage() {
  try {
    // Fetch all menu items including specials from the database
    const items = await prisma.menuItem.findMany({
      include: { specials: true },
    });

    // Map the raw Prisma data to match the MenuItem interface
    const transformedItems: MenuItem[] = items.map(item => ({
      id: item.id,
      name: item.name,
      arabicName: item.arabicName ?? "",
      description: item.description ?? "",
      price: item.price,
      category: item.category,
      available: item.available,
      spicy: item.specials.some(special => special.type === "SPICY"),
      popular: item.specials.some(special => special.type === "POPULAR"),
      vegan: item.specials.some(special => special.type === "VEGAN"),
    }));

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <OnlineMenu menuItems={transformedItems} />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching menu:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">Failed to load menu. Please try again later.</p>
      </div>
    );
  }
}
