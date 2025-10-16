import { Award, Users, TrendingUp, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OurStory = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-lg text-muted-foreground">
              Building dreams and creating legacies since 2010
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12 animate-scale-in">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
              alt="Elite Estates Team"
              className="w-full h-96 object-cover rounded-xl shadow-strong"
            />
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none space-y-6 animate-slide-up">
            <p className="text-lg leading-relaxed">
              Elite Estates was founded in 2010 with a simple yet powerful vision: to revolutionize
              the real estate experience by putting people first. What started as a small boutique
              agency has grown into one of the most trusted names in luxury and commercial real estate.
            </p>

            <p className="text-lg leading-relaxed">
              Our journey began when our founder, recognizing the gap between traditional real estate
              services and modern client expectations, decided to create a company that would set new
              standards in the industry. We believe that buying, selling, or investing in property
              should be an exciting and rewarding experience, not a stressful one.
            </p>

            <p className="text-lg leading-relaxed">
              Over the years, we've helped thousands of families find their dream homes, assisted
              investors in building their portfolios, and partnered with developers on landmark
              commercial projects. Our success is measured not just in properties sold, but in the
              lasting relationships we've built with our clients.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-12">
              <div className="p-6 rounded-xl shadow-soft hover:shadow-medium transition-smooth">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence Award 2023</h3>
                <p className="text-muted-foreground">
                  Recognized as the leading real estate agency for customer satisfaction and innovation.
                </p>
              </div>
              <div className="p-6 rounded-xl shadow-soft hover:shadow-medium transition-smooth">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-muted-foreground">
                  Active participants in community development and affordable housing initiatives.
                </p>
              </div>
              <div className="p-6 rounded-xl shadow-soft hover:shadow-medium transition-smooth">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Market Leaders</h3>
                <p className="text-muted-foreground">
                  Consistently ranked among the top real estate firms in premium property sales.
                </p>
              </div>
              <div className="p-6 rounded-xl shadow-soft hover:shadow-medium transition-smooth">
                <Heart className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Client Dedication</h3>
                <p className="text-muted-foreground">
                  98% client satisfaction rate with personalized service for every transaction.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              To provide exceptional real estate services that exceed expectations, while maintaining
              the highest standards of integrity, professionalism, and innovation. We're committed to
              helping our clients make informed decisions and achieve their property goals with
              confidence.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-3 text-lg">
              <li>
                <strong>Integrity:</strong> We conduct business with honesty and transparency in every
                transaction.
              </li>
              <li>
                <strong>Excellence:</strong> We strive for perfection in every aspect of our service
                delivery.
              </li>
              <li>
                <strong>Innovation:</strong> We embrace technology and modern solutions to enhance the
                client experience.
              </li>
              <li>
                <strong>Community:</strong> We believe in giving back and contributing to the communities
                we serve.
              </li>
            </ul>

            <p className="text-lg leading-relaxed mt-8">
              Today, Elite Estates continues to grow, but our core values remain unchanged. We're proud
              of our heritage and excited about the future. Whether you're looking for your first home,
              upgrading to a luxury property, or seeking commercial investment opportunities, we're here
              to guide you every step of the way.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OurStory;
