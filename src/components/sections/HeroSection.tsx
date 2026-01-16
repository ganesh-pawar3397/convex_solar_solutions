import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Award, BadgePercent } from "lucide-react";
import heroImage from "@/assets/hero-solar.jpg";

const highlights = [
  { icon: Zap, text: "3kW / 5kW Systems" },
  { icon: Award, text: "20-Year Warranty" },
  { icon: BadgePercent, text: "Govt. Subsidy" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />

      {/* Content */}
      <div className="relative z-10 container-custom px-4 py-20 text-center lg:text-left">
        <div className="max-w-3xl mx-auto lg:mx-0">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in">
            Power Your Home with{" "}
            <span className="text-accent">Solar Energy</span>
          </h1>

          {/* Subheading - Shortened */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Save up to 90% on electricity bills with premium rooftop solar systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#products">View Plans</a>
            </Button>
          </div>

          {/* Highlights - Reduced to 3 */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5"
              >
                <item.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-primary-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
