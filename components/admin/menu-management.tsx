"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface MenuItem {
  id: number
  name: string
  arabicName: string
  description: string
  price: number
  category: string
  spicy: boolean
  vegetarian: boolean
  popular: boolean
  available: boolean
}

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Couscous Royale",
    arabicName: "كسكس ملكي",
    description: "Traditional couscous with lamb, chicken, and vegetables",
    price: 18.99,
    category: "mains",
    spicy: false,
    vegetarian: false,
    popular: true,
    available: true,
  },
  {
    id: 2,
    name: "Tagine Djaj",
    arabicName: "طاجين دجاج",
    description: "Slow-cooked chicken tagine with olives and preserved lemons",
    price: 16.99,
    category: "mains",
    spicy: false,
    vegetarian: false,
    popular: true,
    available: true,
  },
  // Add more items...
]

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    arabicName: "",
    description: "",
    price: "",
    category: "mains",
    spicy: false,
    vegetarian: false,
    popular: false,
    available: true,
  })

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "starters", label: "Starters" },
    { value: "mains", label: "Main Courses" },
    { value: "desserts", label: "Desserts" },
    { value: "beverages", label: "Beverages" },
  ]

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.arabicName.includes(searchTerm)
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newItem: MenuItem = {
      id: editingItem ? editingItem.id : Date.now(),
      name: formData.name,
      arabicName: formData.arabicName,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      spicy: formData.spicy,
      vegetarian: formData.vegetarian,
      popular: formData.popular,
      available: formData.available,
    }

    if (editingItem) {
      setMenuItems((items) => items.map((item) => (item.id === editingItem.id ? newItem : item)))
    } else {
      setMenuItems((items) => [...items, newItem])
    }

    resetForm()
    setIsAddDialogOpen(false)
    setEditingItem(null)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      arabicName: "",
      description: "",
      price: "",
      category: "mains",
      spicy: false,
      vegetarian: false,
      popular: false,
      available: true,
    })
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      arabicName: item.arabicName,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      spicy: item.spicy,
      vegetarian: item.vegetarian,
      popular: item.popular,
      available: item.available,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setMenuItems((items) => items.filter((item) => item.id !== id))
  }

  const toggleAvailability = (id: number) => {
    setMenuItems((items) => items.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage your restaurant menu items</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (English)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="arabicName">Name (Arabic)</Label>
                  <Input
                    id="arabicName"
                    value={formData.arabicName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, arabicName: e.target.value }))}
                    className="arabic-text"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starters">Starters</SelectItem>
                      <SelectItem value="mains">Main Courses</SelectItem>
                      <SelectItem value="desserts">Desserts</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="spicy"
                    checked={formData.spicy}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, spicy: checked }))}
                  />
                  <Label htmlFor="spicy">Spicy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="vegetarian"
                    checked={formData.vegetarian}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, vegetarian: checked }))}
                  />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, popular: checked }))}
                  />
                  <Label htmlFor="popular">Popular</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, available: checked }))}
                  />
                  <Label htmlFor="available">Available</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update Item" : "Add Item"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`${!item.available ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="text-amber-600 arabic-text">{item.arabicName}</span>
                  </div>

                  <p className="text-muted-foreground mb-3">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{item.category}</Badge>
                    {item.spicy && <Badge variant="destructive">Spicy</Badge>}
                    {item.vegetarian && <Badge variant="outline">Vegetarian</Badge>}
                    {item.popular && <Badge variant="secondary">Popular</Badge>}
                    <Badge variant={item.available ? "default" : "secondary"}>
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <p className="text-2xl font-bold text-primary">${item.price}</p>
                </div>

                <div className="flex items-center gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  <Button variant="outline" size="sm" onClick={() => toggleAvailability(item.id)}>
                    {item.available ? "Disable" : "Enable"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
