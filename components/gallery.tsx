import Image from "next/image"

export function Gallery() {
  const images = [
    {
      src: "/images/traditional-pottery.png",
      alt: "Traditional Algerian pottery and tagines",
      title: "Authentic Cookware",
    },
    {
      src: "/images/restaurant-interior.png",
      alt: "Restaurant interior with traditional decor",
      title: "Warm Atmosphere",
    },
    {
      src: "/images/restaurant-gate.png",
      alt: "Restaurant entrance with ornate gates",
      title: "Welcome Entry",
    },
    {
      src: "/images/menu-cover.png",
      alt: "Traditional menu design",
      title: "Heritage Menu",
    },
  ]

  return (
    <section id="gallery" className="py-20 px-10 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Gallery
            <span className="block text-amber-600 text-lg font-normal mt-2">معرض الصور</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse into our restaurant's authentic atmosphere and traditional craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
