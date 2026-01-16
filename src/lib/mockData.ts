// Mock data store using localStorage
// Replace with Prisma/Supabase later

export interface WorkedSite {
    id: string;
    title: string;
    location: string;
    systemSize: string;
    description: string;
    imageUrl: string;
    createdAt: string;
}

export interface Testimonial {
    id: string;
    customerName: string;
    location: string;
    rating: number;
    review: string;
    imageUrl: string;
    createdAt: string;
}

const WORKED_SITES_KEY = "convex_worked_sites";
const TESTIMONIALS_KEY = "convex_testimonials";

// Initialize with sample data if empty
const initializeData = () => {
    if (!localStorage.getItem(WORKED_SITES_KEY)) {
        const sampleSites: WorkedSite[] = [
            {
                id: "1",
                title: "3kW Rooftop Installation",
                location: "Andheri, Mumbai",
                systemSize: "3 kW",
                description: "Complete rooftop solar installation for a 2BHK apartment with net metering.",
                imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
                createdAt: new Date().toISOString(),
            },
            {
                id: "2",
                title: "5kW Commercial Setup",
                location: "Thane, Maharashtra",
                systemSize: "5 kW",
                description: "Solar solution for a small office building with battery backup.",
                imageUrl: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800",
                createdAt: new Date().toISOString(),
            },
            {
                id: "3",
                title: "10kW Industrial Plant",
                location: "Pune, Maharashtra",
                systemSize: "10 kW",
                description: "Large scale installation for a manufacturing unit.",
                imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800",
                createdAt: new Date().toISOString(),
            },
        ];
        localStorage.setItem(WORKED_SITES_KEY, JSON.stringify(sampleSites));
    }

    if (!localStorage.getItem(TESTIMONIALS_KEY)) {
        const sampleTestimonials: Testimonial[] = [
            {
                id: "1",
                customerName: "Rajesh Sharma",
                location: "Andheri, Mumbai",
                rating: 5,
                review: "Excellent service! My electricity bill dropped by 80%. The team was professional and completed installation in just 2 days.",
                imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                createdAt: new Date().toISOString(),
            },
            {
                id: "2",
                customerName: "Priya Patel",
                location: "Thane, Maharashtra",
                rating: 5,
                review: "Very happy with my 5kW system. The subsidy process was handled smoothly. Highly recommend Convex Solar!",
                imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
                createdAt: new Date().toISOString(),
            },
            {
                id: "3",
                customerName: "Amit Desai",
                location: "Pune, Maharashtra",
                rating: 4,
                review: "Good quality panels and inverter. Support team is responsive. Would recommend to others.",
                imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
                createdAt: new Date().toISOString(),
            },
        ];
        localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(sampleTestimonials));
    }
};

// Worked Sites CRUD
export const getWorkedSites = (): WorkedSite[] => {
    initializeData();
    const data = localStorage.getItem(WORKED_SITES_KEY);
    return data ? JSON.parse(data) : [];
};

export const addWorkedSite = (site: Omit<WorkedSite, "id" | "createdAt">): WorkedSite => {
    const sites = getWorkedSites();
    const newSite: WorkedSite = {
        ...site,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    };
    sites.unshift(newSite);
    localStorage.setItem(WORKED_SITES_KEY, JSON.stringify(sites));
    return newSite;
};

export const deleteWorkedSite = (id: string): void => {
    const sites = getWorkedSites().filter((s) => s.id !== id);
    localStorage.setItem(WORKED_SITES_KEY, JSON.stringify(sites));
};

// Testimonials CRUD
export const getTestimonials = (): Testimonial[] => {
    initializeData();
    const data = localStorage.getItem(TESTIMONIALS_KEY);
    return data ? JSON.parse(data) : [];
};

export const addTestimonial = (testimonial: Omit<Testimonial, "id" | "createdAt">): Testimonial => {
    const testimonials = getTestimonials();
    const newTestimonial: Testimonial = {
        ...testimonial,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    };
    testimonials.unshift(newTestimonial);
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
    return newTestimonial;
};

export const deleteTestimonial = (id: string): void => {
    const testimonials = getTestimonials().filter((t) => t.id !== id);
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
};

// Inquiries
export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    address: string;
    energyNeeds: string;
    message: string;
    status: "new" | "contacted" | "converted" | "closed";
    createdAt: string;
}

const INQUIRIES_KEY = "convex_inquiries";

export const getInquiries = (): Inquiry[] => {
    const data = localStorage.getItem(INQUIRIES_KEY);
    return data ? JSON.parse(data) : [];
};

export const addInquiry = (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">): Inquiry => {
    const inquiries = getInquiries();
    const newInquiry: Inquiry = {
        ...inquiry,
        id: Date.now().toString(),
        status: "new",
        createdAt: new Date().toISOString(),
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    return newInquiry;
};

export const updateInquiryStatus = (id: string, status: Inquiry["status"]): void => {
    const inquiries = getInquiries().map((i) =>
        i.id === id ? { ...i, status } : i
    );
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
};

export const deleteInquiry = (id: string): void => {
    const inquiries = getInquiries().filter((i) => i.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
};
