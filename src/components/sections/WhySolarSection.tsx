import { TrendingDown, Leaf, BadgePercent, Sun } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "90% Lower Bills",
    description: "Cut electricity costs dramatically with free energy from the sun.",
  },
  {
    icon: BadgePercent,
    title: "40% Govt. Subsidy",
    description: "Get up to 40% of installation costs covered by government schemes.",
  },
  {
    icon: Leaf,
    title: "Zero Emissions",
    description: "Go green with clean, renewable energy for your home.",
  },
  {
    icon: Sun,
    title: "25+ Years Power",
    description: "Long-lasting systems with reliable performance for decades.",
  },
];

const WhySolarSection = () => {
  return (
    <section id="why-solar" className="section-padding bg-primary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Why Solar?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Benefits of Going Solar
          </h2>
        </div>

        {/* Benefits Grid - 4 compact cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-primary-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-primary-foreground/70">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySolarSection;
