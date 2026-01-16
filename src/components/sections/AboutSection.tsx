import { CheckCircle } from "lucide-react";

const stats = [
  { value: "1500+", label: "Installations" },
  { value: "500+", label: "Happy Clients" },
  { value: "20", label: "Year Warranty" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Clean Energy for Every Home
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Since 2015, Convex Solar has helped over 1,500 families switch to solar. We handle everything from installation to government subsidies.
            </p>

            {/* Key Points - Simple list */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Certified engineers & technicians</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">End-to-end installation service</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Subsidy documentation support</span>
              </li>
            </ul>
          </div>

          {/* Stats - Simplified */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="card-elevated p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
