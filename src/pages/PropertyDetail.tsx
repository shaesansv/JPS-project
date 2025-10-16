import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Bed, Bath, Maximize, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

  // Mock property data - replace with API call
  const property = {
    id: 1,
    title: "Modern Luxury Villa",
    price: 1250000,
    location: "Beverly Hills, CA",
    area: "4500 sq ft",
    bedrooms: 5,
    bathrooms: 4,
    description:
      "Experience luxury living at its finest in this stunning modern villa. This architectural masterpiece features floor-to-ceiling windows, an open-concept design, and premium finishes throughout. The spacious interior seamlessly flows to a beautifully landscaped outdoor oasis complete with a infinity pool and entertainment area. Located in the prestigious Beverly Hills neighborhood, this property offers both privacy and convenience.",
    dimensions: "75ft x 60ft",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would make an API call to your backend
    console.log("Enquiry submitted:", { ...formData, propertyId: id });
    
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
          <Link to="/properties" className="inline-flex items-center mb-6 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in">
                <div className="col-span-2">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-xl shadow-strong"
                  />
                </div>
                {property.images.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${property.title} ${index + 2}`}
                    className="w-full h-48 object-cover rounded-lg shadow-medium"
                    loading="lazy"
                  />
                ))}
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
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
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
                      <div className="text-sm text-muted-foreground">Dimensions</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold text-xs">{property.location}</div>
                      <div className="text-sm text-muted-foreground">Location</div>
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

                    <Button type="submit" className="w-full gradient-hero group">
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
