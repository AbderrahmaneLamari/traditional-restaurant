import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderTracker } from "@/components/order-tracker"

export default function OrderStatusPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <OrderTracker />
      </main>
      <Footer />
    </div>
  )
}
