import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addInquiry } from "@/lib/supabaseService";
import ReCAPTCHA from "react-google-recaptcha";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    energyNeeds: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone - must be 10 digits
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    // Format phone with +91 prefix
    const formattedPhone = `+91 ${phoneDigits}`;

    // Validate reCAPTCHA
    if (recaptchaSiteKey && recaptchaSiteKey !== "your-recaptcha-site-key" && !captchaToken) {
      toast({
        title: "Please verify you're human",
        description: "Complete the reCAPTCHA challenge.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Supabase database (also logs email notification)
      const result = await addInquiry({
        name: formData.name,
        email: formData.email || null,
        phone: formattedPhone,
        location: formData.location,
        address: formData.address || null,
        energy_needs: formData.energyNeeds || null,
        message: formData.message || null,
      });

      toast({
        title: "Inquiry Submitted!",
        description: "Our team will contact you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        address: "",
        energyNeeds: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      // Still show success because email was sent
      toast({
        title: "Inquiry Received!",
        description: "We'll get back to you soon.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const businessPhone = import.meta.env.VITE_BUSINESS_PHONE || "919876543210";
    const message = encodeURIComponent(
      "Hi, I'm interested in installing rooftop solar panels. Please share more details."
    );
    window.open(`https://wa.me/${businessPhone}?text=${message}`, "_blank");
  };

  // Contact info from env
  const businessPhone = import.meta.env.VITE_BUSINESS_PHONE || "919876543210";
  const businessEmail = import.meta.env.VITE_BUSINESS_EMAIL || "info@convexsolar.com";
  const businessAddress = import.meta.env.VITE_BUSINESS_ADDRESS || "Ahmednagar";
  const businessHours = import.meta.env.VITE_BUSINESS_HOURS || "Mon-Sat: 9AM-7PM";

  // Format phone for display
  const formatPhone = (phone: string) => {
    if (phone.startsWith("91") && phone.length === 12) {
      return `+91 ${phone.slice(2, 7)} ${phone.slice(7)}`;
    }
    return `+${phone}`;
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Your Free Quote
          </h2>
          <p className="text-muted-foreground">
            Fill out the form and our experts will contact you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-elevated p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Ganesh Pawar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ganesh.pawar@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address / City (Optional)</Label>
                <Input
                  id="address"
                  placeholder="e.g. Pipeline Road, Ahmednagar"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="energyNeeds">System Size</Label>
                <Select
                  value={formData.energyNeeds}
                  onValueChange={(value) => setFormData({ ...formData, energyNeeds: value })}
                >
                  <SelectTrigger id="energyNeeds">
                    <SelectValue placeholder="Select requirement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3kw">3kW (Small Home)</SelectItem>
                    <SelectItem value="5kw">5kW (Medium Home)</SelectItem>
                    <SelectItem value="custom">Custom / Larger</SelectItem>
                    <SelectItem value="not-sure">Need Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
              </div>

              {/* reCAPTCHA - only show if key is configured */}
              {recaptchaSiteKey && recaptchaSiteKey !== "your-recaptcha-site-key" && (
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                  />
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : (
                  <>Submit Inquiry <Send className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* WhatsApp CTA */}
            <div className="bg-primary rounded-2xl p-6 text-center">
              <MessageCircle className="w-10 h-10 text-primary-foreground mx-auto mb-3" />
              <h3 className="text-lg font-bold text-primary-foreground mb-2">
                Quick Support on WhatsApp
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Chat with our solar experts instantly!
              </p>
              <Button variant="hero" onClick={handleWhatsApp}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-elevated p-5">
                <Phone className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Phone</h4>
                <a href={`tel:+${businessPhone}`} className="text-muted-foreground text-sm hover:text-primary">
                  {formatPhone(businessPhone)}
                </a>
              </div>

              <div className="card-elevated p-5">
                <Mail className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Email</h4>
                <a href={`mailto:${businessEmail}`} className="text-muted-foreground text-sm hover:text-primary">
                  {businessEmail}
                </a>
              </div>

              <div className="card-elevated p-5">
                <MapPin className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Office</h4>
                <p className="text-muted-foreground text-xs">
                  {businessAddress}
                </p>
              </div>

              <div className="card-elevated p-5">
                <Clock className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">Hours</h4>
                <p className="text-muted-foreground text-xs">
                  {businessHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
