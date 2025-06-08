import type React from "react"
import type { Metadata } from "next"
import { Inter, Amiri } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ArabesqueBackground } from "@/components/arabesque-elements"
import { CartProvider } from "@/contexts/cart-context"
import { CartSheet } from "@/components/shopping-cart"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata: Metadata = {
  title: "Restaurant El-Asil - Authentic Algerian Cuisine",
  description:
    "Experience the rich flavors and traditional hospitality of Algeria. Authentic North African cuisine served with passion.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${amiri.variable} font-sans antialiased`}>
        <ArabesqueBackground />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <CartProvider>
            {children}
            <CartSheet />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
