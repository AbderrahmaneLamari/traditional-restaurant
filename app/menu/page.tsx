import { OnlineMenu } from "@/components/online-menu"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <OnlineMenu />
      </main>
      <Footer />
    </div>
  )
}
