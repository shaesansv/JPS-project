import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AdminNav from "@/components/admin/AdminNav";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: "",
    primaryColor: "#3b82f6",
    accentColor: "#f59e0b",
    navbarAnimation: true,
    navbarStyle: "slide",
    footerColor: "#1e293b",
    contactPhone: "",
    contactEmail: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      youtube: "",
    },
    whatsapp: {
      phone: "",
      apiKey: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const result = await api.getSettings();
    if (result.success && result.data) {
      const data = result.data as any;
      setSettings((prev) => ({ ...prev, ...data }));
    }
    setIsFetching(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const result = await api.updateSettings(settings);

    if (result.success) {
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.error?.message || "Failed to update settings",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Site Settings</h1>
          <p className="text-muted-foreground">Configure your website appearance and integrations</p>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Site name and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteTitle">Site Title</Label>
                <Input
                  id="siteTitle"
                  value={settings.siteTitle}
                  onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                  placeholder="Elite Estates"
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Theme & Colors</CardTitle>
              <CardDescription>Customize your site's appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.accentColor}
                      onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="footerColor">Footer Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="footerColor"
                      type="color"
                      value={settings.footerColor}
                      onChange={(e) => setSettings({ ...settings, footerColor: e.target.value })}
                      className="w-20 h-10"
                    />
                    <Input
                      value={settings.footerColor}
                      onChange={(e) => setSettings({ ...settings, footerColor: e.target.value })}
                      placeholder="#1e293b"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navbar Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Navbar Settings</CardTitle>
              <CardDescription>Navigation bar animation and style</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="navbarAnimation">Enable Navbar Animation</Label>
                  <p className="text-sm text-muted-foreground">Animated underline on hover</p>
                </div>
                <Switch
                  id="navbarAnimation"
                  checked={settings.navbarAnimation}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, navbarAnimation: checked })
                  }
                />
              </div>
              <div>
                <Label htmlFor="navbarStyle">Animation Style</Label>
                <select
                  id="navbarStyle"
                  value={settings.navbarStyle}
                  onChange={(e) => setSettings({ ...settings, navbarStyle: e.target.value })}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="slide">Slide</option>
                  <option value="fade">Fade</option>
                  <option value="scale">Scale</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Contact Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Phone and email for customer contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  placeholder="contact@eliteestates.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={settings.socialLinks.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={settings.socialLinks.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/yourpage"
                />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube URL</Label>
                <Input
                  id="youtube"
                  value={settings.socialLinks.youtube}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                    })
                  }
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Integration */}
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>Configure WhatsApp notifications for enquiries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="whatsappPhone">WhatsApp Phone Number</Label>
                <Input
                  id="whatsappPhone"
                  value={settings.whatsapp.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, phone: e.target.value },
                    })
                  }
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <Label htmlFor="whatsappApiKey">WhatsApp API Key (optional)</Label>
                <Input
                  id="whatsappApiKey"
                  type="password"
                  value={settings.whatsapp.apiKey}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, apiKey: e.target.value },
                    })
                  }
                  placeholder="Enter API key for automated messages"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty for basic WhatsApp link functionality
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full gradient-hero"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
