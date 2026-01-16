// Email service - calls Supabase Edge Function to send emails
import { supabase } from "@/integrations/supabase/client";

interface InquiryEmailData {
    name: string;
    email?: string | null;
    phone: string;
    location: string;
    address?: string | null;
    energy_needs?: string | null;
    message?: string | null;
}

interface ErrorEmailData {
    severity: string;
    title: string;
    message: string;
    stack?: string;
    timestamp: string;
    url?: string;
}

/**
 * Send inquiry notification email via Supabase Edge Function
 */
export const sendInquiryEmail = async (data: InquiryEmailData): Promise<boolean> => {
    try {
        const { error } = await supabase.functions.invoke("send-email", {
            body: { type: "inquiry", data },
        });

        if (error) {
            console.error("Failed to send inquiry email:", error);
            return false;
        }

        console.log("✅ Inquiry email sent successfully");
        return true;
    } catch (err) {
        console.error("Error sending inquiry email:", err);
        return false;
    }
};

/**
 * Send error alert email via Supabase Edge Function
 */
export const sendErrorAlertEmail = async (data: ErrorEmailData): Promise<boolean> => {
    try {
        const { error } = await supabase.functions.invoke("send-email", {
            body: { type: "error", data },
        });

        if (error) {
            console.error("Failed to send error alert email:", error);
            return false;
        }

        console.log("✅ Error alert email sent successfully");
        return true;
    } catch (err) {
        console.error("Error sending alert email:", err);
        return false;
    }
};

/**
 * Legacy function - kept for backward compatibility
 */
export const logInquiryForEmail = (inquiry: {
    name: string;
    email: string;
    phone: string;
    location: string;
    energyNeeds?: string;
    message?: string;
    address?: string;
}): void => {
    // Send via Edge Function (fire and forget)
    sendInquiryEmail({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        location: inquiry.location,
        address: inquiry.address,
        energy_needs: inquiry.energyNeeds,
        message: inquiry.message,
    }).catch(console.error);
};
