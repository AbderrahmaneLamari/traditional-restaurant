import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border relative">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-12">
        <ArabesqueLineDivider variant="thick" className="text-amber-600 opacity-40" />
      </div>

      {/* Background geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <GeometricPattern className="text-amber-600" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info with enhanced logo */}
          <div className="relative">
            {/* Corner decoration */}
            <div className="absolute -top-4 -left-4 w-12 h-12 opacity-20">
              <GeometricPattern variant="corner" className="text-amber-600" />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4 relative">
              <span className="text-amber-600 relative">
                الذوق
                {/* Decorative flourishes */}
                <span className="absolute -top-2 -left-3 text-sm opacity-60">✦</span>
              </span>{" "}
              الأصيل
              <span className="absolute -top-2 -right-3 text-sm text-amber-600 opacity-60">✦</span>
            </h3>

            <p className="text-muted-foreground mb-4">
              Authentic Algerian cuisine served with traditional hospitality. Experience the rich flavors of North
              Africa in every dish.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-primary transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Dine-in</li>
              <li>Takeaway</li>
              <li>Online Ordering</li>
              <li>Catering</li>
              <li>Private Events</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span className="text-sm">123 Heritage Street, City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-600" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-600" />
                <span className="text-sm">info@restaurantelasil.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground relative">
          {/* Decorative element above copyright */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-6">
            <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-40" />
          </div>
          <p>&copy; 2024 Restaurant El-Asil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
