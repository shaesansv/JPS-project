import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  photos: string[];
  featured: boolean;
  status: string;
}

const Properties = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await api.getCategories();
      if (!result.success) throw new Error(result.error?.message);
      return result.data;
    },
  });

  const categories = [
    { _id: "all", name: "All Properties", slug: "all" },
    ...((categoriesData as Array<{
      _id: string;
      name: string;
      slug: string;
    }>) || []),
  ];

  // Fetch properties with category filter
  const { data: propertiesData, isLoading } = useQuery<Property[]>({
    queryKey: ["properties", selectedCategory],
    queryFn: async () => {
      const result = await api.getProperties({
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      });
      if (!result.success) throw new Error(result.error?.message);
      const data = result.data as any;
      return data.properties || data;
    },
  });

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
              Browse through our carefully curated selection of premium
              properties
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
            {categories.map((cat) => (
              <Button
                key={cat._id}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.slug)}
                className={selectedCategory === cat.slug ? "gradient-hero" : ""}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Properties Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertiesData?.map((property, index) => (
                <Card
                  key={property._id}
                  className="card-pleasant overflow-hidden hover-lift transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={property.photos?.[0] || "/placeholder-property.jpg"}
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
                    <h3 className="text-xl font-semibold mb-2">
                      {property.title}
                    </h3>
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
                    <Link to={`/properties/${property._id}`} className="w-full">
                      <Button className="w-full group">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
