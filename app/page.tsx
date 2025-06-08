import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Menu } from "@/components/menu"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NavigationCards } from "@/components/navigation-cards"
import { SectionDivider } from "@/components/arabesque-elements"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <NavigationCards />
        <SectionDivider title="About Our Heritage" arabicTitle="عن تراثنا" />
        <About />
        <SectionDivider title="Moments & Memories" arabicTitle="لحظات وذكريات" />
        <Gallery />
        <SectionDivider title="Connect With Us" arabicTitle="تواصل معنا" />
        <Contact />
        <SectionDivider />
      </main>
      <Footer />
    </div>
  )
}
