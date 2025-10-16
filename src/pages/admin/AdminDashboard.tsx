import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Building2, MessageSquare, Settings, Plus, Eye, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AdminNav from "@/components/admin/AdminNav";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [shopDescription, setShopDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const stats = {
    totalProperties: 24,
    activeProperties: 18,
    inactiveProperties: 6,
    unreadEnquiries: 5,
  };

  const recentEnquiries = [
    { id: 1, name: "John Doe", property: "Modern Luxury Villa", date: "2 hours ago" },
    { id: 2, name: "Jane Smith", property: "Downtown Office", date: "5 hours ago" },
    { id: 3, name: "Mike Johnson", property: "Beachfront Paradise", date: "1 day ago" },
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const result = await api.getSettings();
    if (result.success && result.data) {
      const data = result.data as any;
      setShopDescription(data.companyDescription || "");
    }
  };

  const handleSaveDescription = async () => {
    setIsLoading(true);
    const result = await api.updateSettings({ companyDescription: shopDescription });
    
    if (result.success) {
      toast({
        title: "Success",
        description: "Shop description updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.error?.message || "Failed to update description",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-muted-foreground mt-1">All listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProperties}</div>
              <p className="text-xs text-muted-foreground mt-1">Available now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inactiveProperties}</div>
              <p className="text-xs text-muted-foreground mt-1">Sold/Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unread Enquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unreadEnquiries}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Shop Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/properties/new">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Property
                </Button>
              </Link>
              <Link to="/admin/enquiries">
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View Enquiries
                </Button>
              </Link>
              <Link to="/" target="_blank">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Public Site
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Site Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Shop Description */}
          <Card>
            <CardHeader>
              <CardTitle>Shop Description</CardTitle>
              <CardDescription>Displayed on homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={shopDescription}
                onChange={(e) => setShopDescription(e.target.value)}
                rows={6}
                placeholder="Enter your company description..."
              />
              <Button 
                className="w-full gradient-hero"
                onClick={handleSaveDescription}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Description"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Enquiries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enquiries</CardTitle>
            <CardDescription>Latest customer enquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">{enquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{enquiry.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{enquiry.date}</p>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to={`/admin/enquiries/${enquiry.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/enquiries">
              <Button variant="outline" className="w-full mt-4">
                View All Enquiries
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
