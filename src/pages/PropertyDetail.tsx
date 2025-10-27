import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Phone,
  Mail,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  area: string;
  dimensions?: string;
  bedrooms: number;
  bathrooms: number;
  photos: string[];
  category: { _id: string; name: string };
  featured: boolean;
  status: string;
}

const PropertyDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  // Fetch property data
  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ["property", id],
    queryFn: async () => {
      const result = await api.getProperty(id!);
      if (!result.success) throw new Error(result.error?.message);
      return result.data as Property;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await api.createEnquiry({
        ...formData,
        property: id,
      });

      if (result.success) {
        toast({
          title: "Enquiry Sent!",
          description: "We'll contact you shortly via WhatsApp and email.",
        });

        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description:
            result.error?.message ||
            "Failed to send enquiry. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send enquiry. Please try again.",
        variant: "destructive",
      });
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            to="/properties"
            className="inline-flex items-center mb-6 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in">
                {isLoading ? (
                  <div className="col-span-2 flex justify-center items-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    <div className="col-span-2">
                      <img
                        src={
                          property?.photos?.[0] || "/placeholder-property.jpg"
                        }
                        alt={property?.title}
                        className="w-full h-96 object-cover rounded-xl shadow-strong"
                      />
                    </div>
                    {property?.photos?.slice(1).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${property?.title} ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg shadow-medium"
                        loading="lazy"
                      />
                    ))}
                  </>
                )}
              </div>

              {/* Property Info */}
              <div className="animate-slide-up">
                <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="text-3xl font-bold text-primary mb-6">
                  ${property.price.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">
                        Bedrooms
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">
                        Bathrooms
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Maximize className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.area}</div>
                      <div className="text-sm text-muted-foreground">Area</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Maximize className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.dimensions}</div>
                      <div className="text-sm text-muted-foreground">
                        Dimensions
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold text-xs">
                        {property.location}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Location
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-strong animate-scale-in">
                <CardHeader>
                  <CardTitle>Interested in this property?</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (234) 567-890"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Your current address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-hero group"
                    >
                      Send Enquiry
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                    </Button>

                    <div className="text-xs text-muted-foreground text-center pt-2">
                      You'll receive confirmation via WhatsApp and email
                    </div>
                  </form>

                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>+1 (234) 567-890</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>info@eliteestates.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
