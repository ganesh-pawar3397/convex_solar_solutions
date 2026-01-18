import { Button } from "@/components/ui/button";
import { FileCheck, ClipboardList, UserCheck, Banknote, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    icon: ClipboardList,
    title: "Initial Assessment",
    description: "Our team evaluates your roof and electricity consumption to determine subsidy eligibility and optimal system size.",
  },
  {
    icon: FileCheck,
    title: "Documentation",
    description: "We help you gather all required documents including property papers, electricity bills, and ID proofs.",
  },
  {
    icon: UserCheck,
    title: "Application Filing",
    description: "Our experts submit your subsidy application through official government portals and track the progress.",
  },
  {
    icon: Banknote,
    title: "Subsidy Credit",
    description: "Once approved, the subsidy amount is credited directly to your account or adjusted against installation costs.",
  },
];

const faqs = [
  {
    question: "Who is eligible for the government solar subsidy?",
    answer: "All residential homeowners with a valid electricity connection are eligible for the PM Surya Ghar subsidy. The property should have adequate roof space for solar panel installation, and the applicant must be the owner of the property.",
  },
  {
    question: "How much subsidy can I get?",
    answer: "Under the PM Surya Ghar scheme, you can receive up to ₹78,000 for a 3kW system and ₹78,000 for systems above 3kW up to 10kW. The total subsidy is capped at ₹78,000 regardless of system size above 3kW.",
  },
  {
    question: "How long does the subsidy approval take?",
    answer: "The typical approval process takes 2-4 weeks after installation completion. However, this may vary based on your state's processing time. We handle all follow-ups to ensure faster approval.",
  },
  {
    question: "What documents are required for subsidy application?",
    answer: "You'll need: Aadhaar card, recent electricity bill, property ownership proof, bank account details, passport-size photos, and completed application form. We assist with all documentation.",
  },
  {
    question: "Is the subsidy available for all states?",
    answer: "Yes, the PM Surya Ghar Muft Bijli Yojana is a central government scheme available across all states in India. Some states may also offer additional incentives on top of the central subsidy.",
  },
];

const SubsidiesSection = () => {
  return (
    <section id="subsidies" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Government Subsidies
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Save More with <span className="text-primary">PM Surya Ghar</span> Subsidy
          </h2>
          <p className="text-muted-foreground text-lg">
            Take advantage of the government's generous solar subsidy program. We guide you through every step of the application process.
          </p>
        </div>

        {/* Subsidy Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold mb-4">
                PM Surya Ghar Muft Bijli Yojana
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Get Up To ₹78,000 Subsidy
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                The Government of India is offering substantial subsidies to encourage rooftop solar adoption. Don't miss this opportunity to go solar at significantly reduced costs.
              </p>
              <Button variant="hero" size="lg" asChild>
                <a href="#contact">Check Your Eligibility</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">₹30,000</div>
                <div className="text-sm text-primary-foreground/80">Up to 2kW</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">₹60,000</div>
                <div className="text-sm text-primary-foreground/80">2kW to 3kW</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">₹78,000</div>
                <div className="text-sm text-primary-foreground/80">3kW to 10kW</div>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-primary-foreground/80">Application Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">
            How to Apply for Subsidy
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card-elevated p-6 h-full flex flex-col">
                  {/* Number Badge */}
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4">
                    {index + 1}
                  </div>

                  {/* Icon + Title Row */}
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <h4 className="text-lg font-bold text-foreground leading-tight">{step.title}</h4>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-elevated px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default SubsidiesSection;
