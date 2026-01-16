// Supabase service layer for database operations
import { supabase } from "@/integrations/supabase/client";
import { sanitizeObject } from "@/lib/sanitize";
import { logDatabaseError, logStorageError } from "@/lib/errorLogger";

// ============ TYPES ============

export interface WorkedSite {
    id: string;
    title: string;
    location: string;
    system_size: string | null;
    description: string | null;
    image_url: string | null;
    created_at: string;
}

export interface Testimonial {
    id: string;
    customer_name: string;
    location: string;
    rating: number;
    review: string;
    image_url: string | null;
    created_at: string;
}

export interface Inquiry {
    id: string;
    name: string;
    email: string | null;
    phone: string;
    location: string;
    address: string | null;
    energy_needs: string | null;
    message: string | null;
    status: "new" | "contacted" | "converted" | "closed";
    created_at: string;
}

// ============ WORKED SITES ============

export const getWorkedSites = async (): Promise<WorkedSite[]> => {
    const { data, error } = await supabase
        .from("worked_sites")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        logDatabaseError("Fetch worked sites", error);
        return [];
    }
    return data || [];
};

export const addWorkedSite = async (site: Omit<WorkedSite, "id" | "created_at">): Promise<WorkedSite | null> => {
    // Sanitize all string inputs
    const sanitizedSite = sanitizeObject(site);

    const { data, error } = await supabase
        .from("worked_sites")
        .insert([sanitizedSite])
        .select()
        .single();

    if (error) {
        logDatabaseError("Add worked site", error, { site: sanitizedSite });
        return null;
    }
    return data;
};

export const deleteWorkedSite = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from("worked_sites")
        .delete()
        .eq("id", id);

    if (error) {
        logDatabaseError("Delete worked site", error, { id });
        return false;
    }
    return true;
};

// ============ TESTIMONIALS ============

export const getTestimonials = async (): Promise<Testimonial[]> => {
    const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
    return data || [];
};

export const addTestimonial = async (testimonial: Omit<Testimonial, "id" | "created_at">): Promise<Testimonial | null> => {
    // Sanitize all string inputs
    const sanitizedTestimonial = sanitizeObject(testimonial);

    const { data, error } = await supabase
        .from("testimonials")
        .insert([sanitizedTestimonial])
        .select()
        .single();

    if (error) {
        console.error("Error adding testimonial:", error);
        return null;
    }
    return data;
};

export const deleteTestimonial = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting testimonial:", error);
        return false;
    }
    return true;
};

// ============ INQUIRIES ============

export const getInquiries = async (): Promise<Inquiry[]> => {
    const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching inquiries:", error);
        return [];
    }
    return data || [];
};

export const addInquiry = async (inquiry: Omit<Inquiry, "id" | "created_at" | "status">): Promise<Inquiry | null> => {
    // Import email service dynamically to avoid circular dependencies
    const { sendInquiryEmail } = await import("@/lib/emailService");

    // Sanitize all string inputs
    const sanitizedInquiry = sanitizeObject(inquiry);

    const { data, error } = await supabase
        .from("inquiries")
        .insert([{ ...sanitizedInquiry, status: "new" }])
        .select()
        .single();

    if (error) {
        logDatabaseError("Add inquiry", error, { inquiry: sanitizedInquiry });
        return null;
    }

    // Send email notification via Edge Function
    sendInquiryEmail(sanitizedInquiry).catch((err) => {
        console.error("Failed to send inquiry email:", err);
    });

    return data;
};

export const updateInquiryStatus = async (id: string, status: Inquiry["status"]): Promise<boolean> => {
    const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);

    if (error) {
        console.error("Error updating inquiry status:", error);
        return false;
    }
    return true;
};

export const deleteInquiry = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting inquiry:", error);
        return false;
    }
    return true;
};

// ============ PRODUCTS ============

export interface Product {
    id: string;
    name: string;
    subtitle: string | null;
    price: string;
    price_note: string | null;
    original_price: string | null;
    description: string | null;
    features: string[];
    popular: boolean;
    icon: string;
    display_order: number;
    created_at: string;
}

export const getProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true });

    if (error) {
        logDatabaseError("Fetch products", error);
        return [];
    }
    return data || [];
};

export const addProduct = async (product: Omit<Product, "id" | "created_at">): Promise<Product | null> => {
    const sanitizedProduct = sanitizeObject(product);

    const { data, error } = await supabase
        .from("products")
        .insert([sanitizedProduct])
        .select()
        .single();

    if (error) {
        logDatabaseError("Add product", error, { product: sanitizedProduct });
        return null;
    }
    return data;
};

export const updateProduct = async (id: string, updates: Partial<Omit<Product, "id" | "created_at">>): Promise<Product | null> => {
    const sanitizedUpdates = sanitizeObject(updates);

    const { data, error } = await supabase
        .from("products")
        .update(sanitizedUpdates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        logDatabaseError("Update product", error, { id, updates: sanitizedUpdates });
        return null;
    }
    return data;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        logDatabaseError("Delete product", error, { id });
        return false;
    }
    return true;
};

// ============ REAL-TIME SUBSCRIPTIONS ============

export const subscribeToInquiries = (callback: (inquiries: Inquiry[]) => void) => {
    const channel = supabase
        .channel("inquiries-changes")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "inquiries" },
            async () => {
                // Refetch all inquiries when any change happens
                const inquiries = await getInquiries();
                callback(inquiries);
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
};

// ============ IMAGE UPLOAD ============

export const uploadImage = async (file: File, folder: string = "projects"): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
        .from("project-images")
        .upload(fileName, file, { upsert: true });

    if (error) {
        console.error("Error uploading image:", error);
        return null;
    }

    const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

export const deleteImage = async (url: string): Promise<boolean> => {
    // Extract path from URL
    const path = url.split("/project-images/")[1];
    if (!path) return false;

    const { error } = await supabase.storage
        .from("project-images")
        .remove([path]);

    if (error) {
        console.error("Error deleting image:", error);
        return false;
    }
    return true;
};
