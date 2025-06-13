import { OnlineMenu } from "@/components/online-menu"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuItem } from "@/components/admin/menu-management";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
export default async function MenuPage() {

  try {
    const menu = await fetch(`${baseUrl}/api/v1/menu`, {
      cache: "no-store",
    });

    if (!menu.ok) {
      throw new Error("Failed to fetch menu");
    }

    const items: MenuItem[] = await menu.json();

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <OnlineMenu menuItems={items} />
        </main>
        <Footer />
      </div>
    )

  } catch (error) {
    console.error("Error fetching menu:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500">Failed to load menu. Please try again later.</p>
      </div>
    )
  }


}
