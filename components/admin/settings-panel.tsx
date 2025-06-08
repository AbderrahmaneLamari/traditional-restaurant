"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Globe, Lock, Moon, Palette, Save, Sun, User } from "lucide-react"
import { GeometricPattern } from "@/components/arabic-patterns"
import { ArabesqueLineDivider } from "@/components/arabesque-elements"

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    general: {
      restaurantName: "Restaurant El-Asil",
      arabicName: "الذوق الأصيل",
      email: "info@restaurantelasil.com",
      phone: "+1 (555) 123-4567",
      language: "english",
      theme: "system",
    },
    notifications: {
      newOrders: true,
      orderUpdates: true,
      lowInventory: true,
      dailyReports: false,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
    },
    appearance: {
      primaryColor: "amber",
      darkMode: "auto",
      compactMode: false,
      showArabicText: true,
    },
  })

  const handleGeneralChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [field]: value,
      },
    })
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [field]: value,
      },
    })
  }

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [field]: value,
      },
    })
  }

  const handleAppearanceChange = (field: string, value: string | boolean) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [field]: value,
      },
    })
  }

  const handleSave = () => {
    // In a real app, this would save to a database or API
    console.log("Saving settings:", settings)
    // Show success message
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Manage your restaurant settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="mb-6">
        <ArabesqueLineDivider variant="simple" className="text-amber-600 opacity-30" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
              <GeometricPattern variant="corner" className="text-amber-600" />
            </div>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Restaurant Name (English)</Label>
                  <Input
                    id="restaurantName"
                    value={settings.general.restaurantName}
                    onChange={(e) => handleGeneralChange("restaurantName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arabicName">Restaurant Name (Arabic)</Label>
                  <Input
                    id="arabicName"
                    value={settings.general.arabicName}
                    onChange={(e) => handleGeneralChange("arabicName", e.target.value)}
                    className="arabic-text"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.general.email}
                    onChange={(e) => handleGeneralChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    value={settings.general.phone}
                    onChange={(e) => handleGeneralChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => handleGeneralChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">System Theme</Label>
                  <Select value={settings.general.theme} onValueChange={(value) => handleGeneralChange("theme", value)}>
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
              <GeometricPattern variant="corner" className="text-amber-600" />
            </div>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New Order Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications when new orders are placed</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newOrders}
                    onCheckedChange={(checked) => handleNotificationChange("newOrders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Order Status Updates</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications when order statuses change</p>
                  </div>
                  <Switch
                    checked={settings.notifications.orderUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Low Inventory Alerts</h3>
                    <p className="text-sm text-muted-foreground">Get notified when inventory items are running low</p>
                  </div>
                  <Switch
                    checked={settings.notifications.lowInventory}
                    onCheckedChange={(checked) => handleNotificationChange("lowInventory", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Daily Reports</h3>
                    <p className="text-sm text-muted-foreground">Receive daily summary reports of sales and activity</p>
                  </div>
                  <Switch
                    checked={settings.notifications.dailyReports}
                    onCheckedChange={(checked) => handleNotificationChange("dailyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
              <GeometricPattern variant="corner" className="text-amber-600" />
            </div>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select
                    value={settings.security.sessionTimeout}
                    onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                  >
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Select
                    value={settings.security.passwordExpiry}
                    onValueChange={(value) => handleSecurityChange("passwordExpiry", value)}
                  >
                    <SelectTrigger id="passwordExpiry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 opacity-10">
              <GeometricPattern variant="corner" className="text-amber-600" />
            </div>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Select
                  value={settings.appearance.primaryColor}
                  onValueChange={(value) => handleAppearanceChange("primaryColor", value)}
                >
                  <SelectTrigger id="primaryColor">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amber">Amber (Default)</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <Select
                  value={settings.appearance.darkMode}
                  onValueChange={(value) => handleAppearanceChange("darkMode", value)}
                >
                  <SelectTrigger id="darkMode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="auto">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Compact Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Use a more compact layout to fit more content on screen
                  </p>
                </div>
                <Switch
                  checked={settings.appearance.compactMode}
                  onCheckedChange={(checked) => handleAppearanceChange("compactMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Show Arabic Text</h3>
                  <p className="text-sm text-muted-foreground">Display Arabic translations alongside English text</p>
                </div>
                <Switch
                  checked={settings.appearance.showArabicText}
                  onCheckedChange={(checked) => handleAppearanceChange("showArabicText", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
