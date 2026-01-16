// Input sanitization utility to prevent XSS and clean user input

/**
 * Sanitizes a string by removing/escaping potentially dangerous characters
 */
export const sanitizeString = (input: string | null | undefined): string => {
    if (!input) return "";

    return input
        // Trim whitespace
        .trim()
        // Remove HTML tags
        .replace(/<[^>]*>/g, "")
        // Escape special HTML characters
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        // Remove null bytes
        .replace(/\0/g, "")
        // Limit length to prevent overflow attacks
        .slice(0, 5000);
};

/**
 * Sanitizes a phone number - keeps only digits and + sign
 */
export const sanitizePhone = (input: string | null | undefined): string => {
    if (!input) return "";
    return input.replace(/[^\d+\s-]/g, "").slice(0, 20);
};

/**
 * Sanitizes an email address
 */
export const sanitizeEmail = (input: string | null | undefined): string => {
    if (!input) return "";
    // Basic email sanitization - remove dangerous characters
    return input.toLowerCase().trim().replace(/[<>'"]/g, "").slice(0, 254);
};

/**
 * Sanitizes an object with string values
 */
export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
    const sanitized = { ...obj };

    for (const key in sanitized) {
        const value = sanitized[key];
        if (typeof value === "string") {
            if (key.toLowerCase().includes("email")) {
                (sanitized as Record<string, unknown>)[key] = sanitizeEmail(value);
            } else if (key.toLowerCase().includes("phone")) {
                (sanitized as Record<string, unknown>)[key] = sanitizePhone(value);
            } else {
                (sanitized as Record<string, unknown>)[key] = sanitizeString(value);
            }
        }
    }

    return sanitized;
};
