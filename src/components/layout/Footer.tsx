import { Sun, Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom section-padding pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center p-1 overflow-hidden">
                <img
                  src="/src/assets/logo.png"
                  alt="Convex Solar Solutions"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold block">Convex Solar Solutions</span>
                <span className="text-xs text-background/60 italic">Illuminate your energetic life</span>
              </div>
            </div>
            <p className="text-background/70 mb-6">
              Empowering homes with clean, affordable, and reliable solar energy. Your trusted partner for rooftop solar solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-background/70 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="text-background/70 hover:text-primary transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#products" className="text-background/70 hover:text-primary transition-colors">Products</a>
              </li>
              <li>
                <a href="#subsidies" className="text-background/70 hover:text-primary transition-colors">Government Subsidies</a>
              </li>
              <li>
                <a href="#testimonials" className="text-background/70 hover:text-primary transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="text-background/70 hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-background/70 hover:text-primary transition-colors">Solar Installation</a>
              </li>
              <li>
                <a href="#services" className="text-background/70 hover:text-primary transition-colors">Repair & Maintenance</a>
              </li>
              <li>
                <a href="#subsidies" className="text-background/70 hover:text-primary transition-colors">Subsidy Guidance</a>
              </li>
              <li>
                <a href="#products" className="text-background/70 hover:text-primary transition-colors">3kW Systems</a>
              </li>
              <li>
                <a href="#products" className="text-background/70 hover:text-primary transition-colors">5kW Systems</a>
              </li>
              <li>
                <a href="#products" className="text-background/70 hover:text-primary transition-colors">Custom Solutions</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70 whitespace-pre-line">
                  {import.meta.env.VITE_BUSINESS_ADDRESS || "123 Green Energy Park,\nAndheri East, Mumbai - 400069"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`tel:${import.meta.env.VITE_BUSINESS_PHONE}`} className="text-background/70 hover:text-primary transition-colors">
                  {import.meta.env.VITE_BUSINESS_PHONE || "+91 98765 43210"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${import.meta.env.VITE_BUSINESS_EMAIL}`} className="text-background/70 hover:text-primary transition-colors">
                  {import.meta.env.VITE_BUSINESS_EMAIL || "info@convexsolar.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              © {currentYear} Convex Solar Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">Terms of Service</a>
              <a href="/convex_ad" className="text-background/60 hover:text-primary transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
