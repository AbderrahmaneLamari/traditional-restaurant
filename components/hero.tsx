import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { GeometricPattern, IslamicGeometricOverlay, ArabicCalligraphyBorder } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/restaurant-interior.png"
          alt="Traditional Algerian Restaurant Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </div>

      {/* Intricate Arabic Geometric Overlay */}
      <IslamicGeometricOverlay className="z-10 text-amber-400" />

      {/* Additional decorative border at top */}
      <div className="absolute top-0 left-0 right-0 z-15 h-20">
        <ArabicCalligraphyBorder className="text-amber-400 opacity-30" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 z-15">
        <GeometricPattern variant="corner" className="text-amber-400 opacity-40" />
      </div>
      <div className="absolute top-4 right-4 w-16 h-16 z-15">
        <GeometricPattern variant="corner" className="text-amber-400 opacity-40 transform scale-x-[-1]" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 relative">
          {/* Decorative border above Arabic text */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-64 h-8">
            <ArabesqueLineDivider variant="ornate" className="text-amber-400 opacity-80" />
          </div>

          <span className="block text-amber-400 mb-2 relative">
            مرحباً بكم
            {/* Small decorative elements */}
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-2xl opacity-70">❋</span>
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-2xl opacity-70">❋</span>
          </span>

          <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal">
            Welcome to Authentic Algerian Cuisine
          </span>

          {/* Decorative border below */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-8">
            <ArabesqueLineDivider variant="thick" className="text-amber-400 opacity-80" />
          </div>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Experience the rich flavors and traditional hospitality of Algeria in every dish. From aromatic tagines to
          freshly baked bread, taste the heritage of North Africa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
            View Our Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
          >
            Order Online
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
