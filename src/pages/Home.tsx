import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Users,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroLand from "@/assets/hero-land.jpg";
import landBackground from "@/assets/land-background.jpg";
import landPlot1 from "@/assets/land-plot-1.jpg";
import landPlot2 from "@/assets/land-plot-2.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Background */}
      <section
        className="relative pt-32 md:pt-40 pb-24 px-4 overflow-hidden min-h-[90vh] flex items-center"
        style={{
          backgroundImage: `url(${heroLand})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-bounce-in">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Prime Land Investments
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Find Your Perfect Land
              </h1>
              <p className="text-lg md:text-2xl text-foreground/80 mb-10 leading-relaxed">
                JP & Siva Real Estates brings you premium land plots ready for
                development. Whether you're building your dream home or making a
                smart investment, we're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link to="/properties">
                  <Button
                    size="lg"
                    className="gradient-hero group hover-glow transition-smooth hover:scale-105 shadow-strong"
                  >
                    Explore Land Plots
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-smooth" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover-lift bg-background/80 backdrop-blur-sm border-2"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Land Plots */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Land Plots
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our handpicked selection of premium properties
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl shadow-medium hover-lift animate-scale-in">
              <img
                src={landPlot1}
                alt="Premium Land Plot"
                className="w-full h-80 object-cover transition-smooth group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-smooth">
                <h3 className="text-2xl font-bold mb-2">
                  Development Ready Plot
                </h3>
                <p className="text-sm opacity-90 mb-3">
                  Perfect location for residential development
                </p>
                <Link to="/properties">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="hover:scale-105 transition-smooth"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-2xl shadow-medium hover-lift animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <img
                src={landPlot2}
                alt="Scenic Land Plot"
                className="w-full h-80 object-cover transition-smooth group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-smooth">
                <h3 className="text-2xl font-bold mb-2">
                  Scenic Investment Land
                </h3>
                <p className="text-sm opacity-90 mb-3">
                  Stunning views and prime investment opportunity
                </p>
                <Link to="/properties">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="hover:scale-105 transition-smooth"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section
        className="py-20 px-4 relative"
        style={{
          backgroundImage: `url(${landBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-background/90"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                value: "500+",
                label: "Land Plots Sold",
                color: "text-primary",
              },
              {
                icon: Users,
                value: "1000+",
                label: "Happy Investors",
                color: "text-accent",
              },
              {
                icon: Award,
                value: "15+",
                label: "Years Experience",
                color: "text-primary",
              },
              {
                icon: TrendingUp,
                value: "98%",
                label: "Success Rate",
                color: "text-accent",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-card shadow-soft hover:shadow-strong hover-lift animate-bounce-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <Icon
                    className={`h-12 w-12 mx-auto mb-4 ${stat.color} animate-float`}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  />
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About JP & Siva Real Estates
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Welcome to JP & Siva Real Estates, where your land investment
              dreams become reality. With over 15 years of excellence in the
              real estate industry, we specialize in premium land plots perfect
              for residential development, commercial projects, and long-term
              investments. Our team of dedicated professionals is committed to
              helping you find the ideal land that matches your vision and
              investment goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/our-story">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover-lift shadow-soft"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/properties">
                <Button
                  size="lg"
                  className="gradient-hero hover-glow transition-smooth hover:scale-105"
                >
                  Browse All Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
