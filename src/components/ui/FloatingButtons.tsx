import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
    const businessPhone = import.meta.env.VITE_BUSINESS_PHONE || "919876543210";

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            "Hi, I'm interested in installing rooftop solar panels. Please share more details."
        );
        window.open(`https://wa.me/${businessPhone}?text=${message}`, "_blank");
    };

    const handleCall = () => {
        window.location.href = `tel:+${businessPhone}`;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {/* WhatsApp Button */}
            <button
                onClick={handleWhatsApp}
                className="group flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="h-6 w-6" />
                <span className="hidden group-hover:inline-block text-sm font-medium pr-2 whitespace-nowrap">
                    Chat Now
                </span>
            </button>

            {/* Call Button - More visible on mobile */}
            <button
                onClick={handleCall}
                className="md:hidden group flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Call Us"
            >
                <Phone className="h-6 w-6" />
                <span className="hidden group-hover:inline-block text-sm font-medium pr-2 whitespace-nowrap">
                    Call Now
                </span>
            </button>
        </div>
    );
};

export default FloatingButtons;
