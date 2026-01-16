import { Zap, Wrench, FileText, Shield } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Solar Installation",
    description: "Complete rooftop solar setup with premium panels and inverters.",
  },
  {
    icon: Wrench,
    title: "Repair & Maintenance",
    description: "Regular servicing and quick repairs to keep your system efficient.",
  },
  {
    icon: FileText,
    title: "Subsidy Assistance",
    description: "We handle all paperwork for government subsidies and approvals.",
  },
  {
    icon: Shield,
    title: "20-Year Warranty",
    description: "Industry-leading warranty on panels, inverters, and installation.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-muted-foreground">
            Everything you need for hassle-free solar adoption.
          </p>
        </div>

        {/* Services Grid - 4 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-elevated p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
