import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderTracker } from "@/components/order-tracker"
export const dynamic = 'force-dynamic'

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

export default async function OrderStatusPage({ searchParams }: { searchParams: { order?: string } }) {

  try {
    const order = searchParams.order;

    if (!order) {
      throw new Error('Order ID is required');
    }

    const res = await fetch(`${baseUrl}/api/v1/order/${order}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch order details');
    }

    const orderData = await res.json();
    if (!orderData.order) {
      throw new Error('Order not found');
    }

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <OrderTracker orderProp={orderData.order} totalSum={orderData.totalSum} menuItems={orderData.menuItems} />
        </main>
        <Footer />
      </div>
    )
  }
  catch (error) {
    console.error('Error fetching order data:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error.message}</h1>
          <p className="text-lg">The order you are looking for does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

}
