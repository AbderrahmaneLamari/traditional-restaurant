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

export interface MenuItem {
  id: string
  name: string
  arabicName: string
  description: string
  price: number
  category: string
  spicy: boolean
  vegan: boolean
  popular: boolean
  available: boolean
}

interface MenuManagementProps {
  initialMenuItems?: MenuItem[]
  onMenuItemsChange?: (items: MenuItem[]) => void
}

interface MenuItemPayload {
  id: string
  name: string
  arabicName: string
  description: string
  price: string
  category: string
  spicy: boolean
  vegan: boolean
  popular: boolean
  available: boolean
}


const defaultMenuItems: MenuItem[] = [
  {
    id: '1',
    name: "Couscous Royale",
    arabicName: "كسكس ملكي",
    description: "Traditional couscous with lamb, chicken, and vegetables",
    price: 18.99,
    category: "mains",
    spicy: false,
    vegan: false,
    popular: true,
    available: true,
  },
  {
    id: '2',
    name: "Tagine Djaj",
    arabicName: "طاجين دجاج",
    description: "Slow-cooked chicken tagine with olives and preserved lemons",
    price: 16.99,
    category: "mains",
    spicy: false,
    vegan: false,
    popular: true,
    available: true,
  },
]

export function MenuManagement({
  initialMenuItems = [],
  onMenuItemsChange
}: MenuManagementProps) {
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
    vegan: false,
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

  const updateMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems)
    onMenuItemsChange?.(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Create specials array based on the enum values
    const specials: string[] = []
    if (formData.spicy) specials.push("SPICY")
    if (formData.vegan) specials.push("VEGAN") // Note: VEGAN not VEGETARIAN
    if (formData.popular) specials.push("POPULAR")

    // Prepare the data to send to API
    const itemData = {
      name: formData.name,
      arabicName: formData.arabicName || null, // Allow null as per model
      description: formData.description || null, // Allow null as per model
      category: formData.category,
      price: Number.parseFloat(formData.price),
      available: formData.available,
      specials // This will be used to create ItemSpecial records
    }

    try {
      // Determine if we're creating or updating
      const isUpdating = editingItem !== null
      const method = isUpdating ? 'PUT' : 'POST'
      const url = isUpdating ? `/api/v1/menu/${editingItem.id}` : '/api/v1/menu'

      const res = await fetch(url, {
        cache: 'no-store',
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      })

      if (!res.ok) {
        throw new Error(`Failed to ${isUpdating ? 'update' : 'create'} menu item`)
      }

      const responseItem = await res.json()

      if (isUpdating) {
        // Update existing item in the list
        const updatedItems = menuItems.map(item =>
          item.id === editingItem.id ? responseItem : item
        )
        updateMenuItems(updatedItems)
      } else {
        // Add new item to the list
        const updatedItems = [...menuItems, responseItem]
        updateMenuItems(updatedItems)
      }

      resetForm()
      setIsAddDialogOpen(false)
      setEditingItem(null)

    } catch (err) {
      console.error(`Error ${editingItem ? 'updating' : 'creating'} menu item:`, err)
      alert(`Failed to ${editingItem ? 'update' : 'create'} menu item`)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      arabicName: "",
      description: "",
      price: "",
      category: "mains",
      spicy: false,
      vegan: false,
      popular: false,
      available: true,
    })
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)

    // Populate form with existing item data using MenuItemPayload structure
    const payload: MenuItemPayload = {
      id: item.id,
      name: item.name,
      arabicName: item.arabicName,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      spicy: item.spicy,
      vegan: item.vegan,
      popular: item.popular,
      available: item.available,
    }

    setFormData(payload)
    setIsAddDialogOpen(true)
  }

  // Optional: Add a separate handler for creating new items
  const handleAddNew = () => {
    setEditingItem(null) // Clear editing state
    resetForm()
    setIsAddDialogOpen(true)
  }



  const toggleAvailability = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/menu/${id}/toggle`, {
        cache: 'no-store',
        method: 'PUT'
      })

      if (!res.ok) {
        throw new Error('Failed to toggle availability')
      } else {
        const updatedItems = menuItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
        updateMenuItems(updatedItems)
      }
    } catch (error) {
      console.error('Error toggling availability:', error)
      alert('Failed to toggle availability')
    }

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
                  <Label htmlFor="price">Price (dzd)</Label>
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
                    id="vegan"
                    checked={formData.vegan}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, vegan: checked }))}
                  />
                  <Label htmlFor="vegan">Vegan</Label>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                    {item.vegan && <Badge variant="outline">Vegan</Badge>}
                    {item.popular && <Badge variant="secondary">Popular</Badge>}
                    <Badge variant={item.available ? "default" : "secondary"}>
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <p className="text-2xl font-bold text-primary">DZD{item.price}</p>
                </div>

                <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
                  <Button variant="outline" size="sm" onClick={() => toggleAvailability(item.id)}>
                    {item.available ? "Disable" : "Enable"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
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