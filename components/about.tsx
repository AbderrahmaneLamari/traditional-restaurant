import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, Clock, Award } from "lucide-react"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"

export function About() {
  const features = [
    {
      icon: Star,
      title: "Authentic Recipes",
      description: "Traditional family recipes passed down through generations",
    },
    {
      icon: Users,
      title: "Family Owned",
      description: "A family business serving the community for over 30 years",
    },
    {
      icon: Clock,
      title: "Fresh Daily",
      description: "All dishes prepared fresh daily with the finest ingredients",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in traditional North African cuisine",
    },
  ]

  return (
    <section id="about" className="py-20 px-10 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground relative">
              {/* Decorative top border */}
              <div className="absolute -top-8 left-0 right-0 h-8">
                <ArabesqueLineDivider variant="ornate" className="text-amber-600 opacity-60" />
              </div>
              Our Story
              <span className="block text-amber-600 text-lg font-normal mt-2 relative">
                قصتنا
                {/* Decorative flourishes */}
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60">◆</span>
                <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-amber-600 opacity-60">
                  ◆
                </span>
              </span>
              {/* Decorative bottom border */}
              <div className="absolute -bottom-6 left-0 w-48 h-6">
                <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-50" />
              </div>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded in 1990, Restaurant El-Asil has been bringing the authentic flavors of Algeria to our community.
              Our journey began with a simple mission: to share the rich culinary heritage of North Africa through
              traditional recipes and warm hospitality.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every dish tells a story of our homeland, from the aromatic spices of our tagines to the delicate pastries
              that grace our dessert menu. We take pride in using only the finest ingredients and time-honored cooking
              techniques.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 relative">
              {/* Background geometric pattern */}
              <div className="absolute inset-0 -z-10">
                <GeometricPattern className="text-amber-600 opacity-5" />
              </div>

              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-sm relative overflow-hidden">
                  {/* Corner decoration for each card */}
                  <div className="absolute top-2 right-2 w-8 h-8">
                    <GeometricPattern variant="corner" className="text-amber-600 opacity-20" />
                  </div>
                  <CardContent className="p-4">
                    <feature.icon className="h-8 w-8 text-amber-600 mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/traditional-pottery.jpg"
                    alt="Traditional Algerian pottery and tagines"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image src="/images/restaurant-gate.jpg" alt="Restaurant entrance" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image src="/images/menu-cover.jpg" alt="Traditional menu design" fill className="object-cover" />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/restaurant-interior.jpg"
                    alt="Restaurant interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
