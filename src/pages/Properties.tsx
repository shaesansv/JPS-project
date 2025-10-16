import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data - this will be replaced with API calls to your backend
const categories = [
  { id: 1, name: "All Properties", slug: "all" },
  { id: 2, name: "Residential", slug: "residential" },
  { id: 3, name: "Commercial", slug: "commercial" },
  { id: 4, name: "Land", slug: "land" },
];

const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    category: "residential",
    price: 1250000,
    location: "Beverly Hills, CA",
    area: "4500 sq ft",
    bedrooms: 5,
    bathrooms: 4,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: true,
    available: true,
  },
  {
    id: 2,
    title: "Downtown Office Space",
    category: "commercial",
    price: 2500000,
    location: "Manhattan, NY",
    area: "8000 sq ft",
    bedrooms: 0,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    featured: false,
    available: true,
  },
  {
    id: 3,
    title: "Beachfront Paradise",
    category: "residential",
    price: 3200000,
    location: "Malibu, CA",
    area: "6200 sq ft",
    bedrooms: 6,
    bathrooms: 5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    featured: true,
    available: true,
  },
  {
    id: 4,
    title: "Prime Development Land",
    category: "land",
    price: 850000,
    location: "Austin, TX",
    area: "2 acres",
    bedrooms: 0,
    bathrooms: 0,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    featured: false,
    available: true,
  },
  {
    id: 5,
    title: "Cozy Family Home",
    category: "residential",
    price: 675000,
    location: "Portland, OR",
    area: "2800 sq ft",
    bedrooms: 4,
    bathrooms: 3,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    featured: false,
    available: true,
  },
  {
    id: 6,
    title: "Retail Shopping Center",
    category: "commercial",
    price: 4500000,
    location: "Miami, FL",
    area: "15000 sq ft",
    bedrooms: 0,
    bathrooms: 4,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    featured: true,
    available: true,
  },
];

const Properties = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProperties =
    selectedCategory === "all"
      ? properties
      : properties.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Our Properties
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our carefully curated selection of premium properties
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.slug)}
                className={selectedCategory === cat.slug ? "gradient-hero" : ""}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-strong transition-smooth animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 right-4 bg-accent">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <div className="text-2xl font-bold text-white bg-primary/90 px-3 py-1 rounded">
                      ${(property.price / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>

                <CardContent className="pt-4">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link to={`/properties/${property.id}`} className="w-full">
                    <Button className="w-full group">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
