"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"
import { useCart } from "@/contexts/cart-context"
import {
  CreditCard,
  MapPin,
  User,
  Truck,
  Store,
  Utensils,
  Clock,
  CalendarDays,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type OrderType = "delivery" | "pickup" | "dine-in"
type PaymentMethod = "credit-card" | "cash" | "paypal"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  orderType: OrderType
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  tableNumber?: string
  paymentMethod: PaymentMethod
  specialInstructions: string
  saveInfo: boolean
  termsAccepted: boolean
  scheduledTime?: string
}

export function CheckoutForm() {
  const router = useRouter()
  const { state, getTotalItems, getTotalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    orderType: "delivery",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    paymentMethod: "credit-card",
    specialInstructions: "",
    saveInfo: false,
    termsAccepted: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address!,
        [name]: value,
      },
    }))
  }

  const handleOrderTypeChange = (value: OrderType) => {
    setFormData((prev) => ({
      ...prev,
      orderType: value,
      // Clear table number if not dine-in
      tableNumber: value !== "dine-in" ? undefined : prev.tableNumber,
      // Clear address if not delivery
      address: value !== "delivery" ? undefined : prev.address,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to process the order
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a random order number
      const orderNumber = `ORD-${Math.floor(Math.random() * 10000)}`

      // Clear the cart
      clearCart()

      // Redirect to confirmation page with order number
      router.push(`/order-confirmation?order=${orderNumber}`)
    } catch (error) {
      console.error("Error processing order:", error)
      alert("There was an error processing your order. Please try again.")
      setIsSubmitting(false)
    }
  }

  const subtotal = getTotalPrice()

  const deliveryFee = formData.orderType === "delivery" ? 3.99 : 0
  const total = subtotal

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = []
    const now = new Date()
    const startHour = now.getHours()
    const startMinute = now.getMinutes() > 30 ? 0 : 30

    // Restaurant hours: 11:00 AM - 10:00 PM
    for (let hour = Math.max(11, startHour); hour < 22; hour++) {
      for (let minute = hour === startHour ? startMinute : 0; minute < 60; minute += 30) {
        const timeString = `${hour % 12 || 12}:${minute === 0 ? "00" : minute} ${hour >= 12 ? "PM" : "AM"}`
        slots.push(timeString)
      }
    }

    return slots
  }

  const timeSlots = generateTimeSlots()

  // Generate table numbers (1-20)
  const tableNumbers = Array.from({ length: 20 }, (_, i) => (i + 1).toString())

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-96 h-10">
            <ArabesqueLineDivider variant="ornate" className="text-amber-600 opacity-50" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Checkout
            <span className="block text-amber-600 text-lg font-normal mt-2">إتمام الطلب</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete your order details below to enjoy our authentic Algerian cuisine
          </p>
        </div>

        {state.items.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Please add some items to your cart before proceeding to checkout.
              </p>
              <Link href="/menu">
                <Button className="bg-amber-600 hover:bg-amber-700">View Menu</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Order Type */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                    <GeometricPattern variant="corner" className="text-amber-600" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-amber-600" />
                      Order Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={formData.orderType}
                      onValueChange={(value) => handleOrderTypeChange(value as OrderType)}
                      className="grid sm:grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" disabled />
                        <Label
                          htmlFor="delivery"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-600 [&:has([data-state=checked])]:border-amber-600"
                        >
                          <Truck className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Delivery</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" disabled/>
                        <Label
                          htmlFor="pickup"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-600 [&:has([data-state=checked])]:border-amber-600"
                        >
                          <Store className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Pickup</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dine-in" id="dine-in" className="peer sr-only" />
                        <Label
                          htmlFor="dine-in"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-600 [&:has([data-state=checked])]:border-amber-600"
                        >
                          <Utensils className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Dine-in</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Conditional fields based on order type */}
                    {formData.orderType === "delivery" && (
                      <div className="space-y-4 border-t pt-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-amber-600" />
                          Delivery Address
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                              id="street"
                              name="street"
                              value={formData.address?.street || ""}
                              onChange={handleAddressChange}
                              required
                            />
                          </div>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                name="city"
                                value={formData.address?.city || ""}
                                onChange={handleAddressChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                name="state"
                                value={formData.address?.state || ""}
                                onChange={handleAddressChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zipCode">ZIP Code</Label>
                              <Input
                                id="zipCode"
                                name="zipCode"
                                value={formData.address?.zipCode || ""}
                                onChange={handleAddressChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.orderType === "dine-in" && (
                      <div className="space-y-4 border-t pt-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-amber-600" />
                          Table Information
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tableNumber">Table Number</Label>
                            <Select
                              value={formData.tableNumber}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, tableNumber: value }))}
                            >
                              <SelectTrigger id="tableNumber">
                                <SelectValue placeholder="Select table number" />
                              </SelectTrigger>
                              <SelectContent>
                                {tableNumbers.map((number) => (
                                  <SelectItem key={number} value={number}>
                                    Table {number}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">
                              Please ask your server for your table number
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Scheduled Time (for pickup and delivery) */}
                    {(formData.orderType === "pickup" || formData.orderType === "delivery") && (
                      <div className="space-y-4 border-t pt-4">
                        <h3 className="font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-600" />
                          Scheduled Time
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="scheduledTime">Preferred Time</Label>
                            <Select
                              value={formData.scheduledTime}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, scheduledTime: value }))}
                            >
                              <SelectTrigger id="scheduledTime">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="asap">As soon as possible</SelectItem>
                                <SelectItem value="scheduled">Schedule for later</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {formData.scheduledTime === "scheduled" && (
                            <div className="space-y-2">
                              <Label htmlFor="timeSlot">Select Time</Label>
                              <Select onValueChange={(value) => console.log("Selected time:", value)}>
                                <SelectTrigger id="timeSlot">
                                  <SelectValue placeholder="Select time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                      {slot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                    <GeometricPattern variant="corner" className="text-amber-600" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-amber-600" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, paymentMethod: value as PaymentMethod }))
                      }
                      className="grid sm:grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" disabled/>
                        <Label
                          htmlFor="credit-card"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-600 [&:has([data-state=checked])]:border-amber-600"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Credit Card</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                        <Label
                          htmlFor="cash"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-amber-600 [&:has([data-state=checked])]:border-amber-600"
                        >
                          <svg
                            className="mb-3 h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                          </svg>
                          <span className="text-sm font-medium">Cash</span>
                        </Label>
                      </div>
                      
                    </RadioGroup>

                    {formData.paymentMethod === "credit-card" && (
                      <div className="space-y-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                          Credit card details will be collected securely at the next step.
                        </p>
                      </div>
                    )}

                    {formData.paymentMethod === "cash" && (
                      <div className="space-y-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                          {formData.orderType === "delivery"
                            ? "Please have exact change ready for the delivery driver."
                            : formData.orderType === "pickup"
                              ? "Please pay at the counter when you pick up your order."
                              : "Please pay at your table after your meal."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                    <GeometricPattern variant="corner" className="text-amber-600" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-amber-600" />
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialInstructions">Special Instructions</Label>
                      <Textarea
                        id="specialInstructions"
                        name="specialInstructions"
                        placeholder="Allergies, special requests, etc."
                        value={formData.specialInstructions}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                    </div>

                    
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-20">
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
                    <GeometricPattern variant="corner" className="text-amber-600" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Order Summary</span>
                      <Badge>{getTotalItems()} items</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div className="flex-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-muted-foreground"> × {item.quantity}</span>
                          </div>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Estimated Time */}
                    

                    {/* Order Details Accordion */}
                    <Accordion type="single" collapsible className="mt-4">
                      <AccordionItem value="payment-security">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-amber-600" />
                            Payment Security
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">
                          All payments are processed securely. We never store your credit card information.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="delivery-info">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-amber-600" />
                            Delivery Information
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">
                          Delivery is available within a 5-mile radius. Orders typically arrive within 30-45 minutes.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="cancellation">
                        <AccordionTrigger className="text-sm">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-amber-600" />
                            Cancellation Policy
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">
                          Orders can be cancelled within 5 minutes of placing them. After that, a 20% fee may apply.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Help */}
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      <p>
                        Need help? Call us at <span className="font-medium">(555) 123-4567</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
