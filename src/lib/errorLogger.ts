// Error logging and alerting service
// Logs critical errors and prepares severity email alerts

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface ErrorAlert {
    severity: ErrorSeverity;
    title: string;
    message: string;
    errorCode?: string;
    stack?: string;
    context?: Record<string, unknown>;
    timestamp: string;
    userAgent?: string;
    url?: string;
}

/**
 * Logs an error and sends severity alert email
 */
export const logError = (
    severity: ErrorSeverity,
    title: string,
    error: Error | string,
    context?: Record<string, unknown>
): void => {
    const errorAlert: ErrorAlert = {
        severity,
        title,
        message: typeof error === "string" ? error : error.message,
        errorCode: typeof error === "object" && "code" in error ? String(error.code) : undefined,
        stack: typeof error === "object" ? error.stack : undefined,
        context,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        url: typeof window !== "undefined" ? window.location.href : undefined,
    };

    // Console log for development
    console.error(`[${severity.toUpperCase()}] ${title}:`, errorAlert);

    // Send severity email alert (logged to console - would be sent via Edge Function in production)
    if (severity === "high" || severity === "critical") {
        sendErrorAlert(errorAlert);
    }

    // Store in localStorage for debugging (optional)
    storeErrorLog(errorAlert);
};

/**
 * Sends error alert email (currently logs to console)
 */
const sendErrorAlert = (alert: ErrorAlert): void => {
    const severityEmoji = {
        low: "ℹ️",
        medium: "⚠️",
        high: "🔴",
        critical: "🚨",
    };

    console.log("=".repeat(60));
    console.log(`${severityEmoji[alert.severity]} ERROR ALERT EMAIL`);
    console.log("=".repeat(60));
    console.log(`To: ${import.meta.env.VITE_SMTP_TO_EMAIL || "admin@convexsolar.com"}`);
    console.log(`Subject: ${severityEmoji[alert.severity]} [${alert.severity.toUpperCase()}] ${alert.title}`);
    console.log("-".repeat(60));
    console.log(`
🚨 SEVERITY: ${alert.severity.toUpperCase()}

📋 ERROR DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Title: ${alert.title}
Message: ${alert.message}
${alert.errorCode ? `Error Code: ${alert.errorCode}` : ""}

📅 TIMESTAMP
${new Date(alert.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST

🌐 CONTEXT
${alert.url ? `URL: ${alert.url}` : ""}
${alert.userAgent ? `Browser: ${alert.userAgent.slice(0, 100)}...` : ""}
${alert.context ? `Additional Context: ${JSON.stringify(alert.context, null, 2)}` : ""}

📜 STACK TRACE
${alert.stack || "No stack trace available"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated error alert from Convex Solar website.
Please investigate immediately if severity is HIGH or CRITICAL.
  `);
    console.log("=".repeat(60));
};

/**
 * Stores error in localStorage for debugging
 */
const storeErrorLog = (alert: ErrorAlert): void => {
    try {
        const existingLogs = JSON.parse(localStorage.getItem("error_logs") || "[]");
        existingLogs.unshift(alert);
        // Keep only last 50 errors
        const trimmedLogs = existingLogs.slice(0, 50);
        localStorage.setItem("error_logs", JSON.stringify(trimmedLogs));
    } catch (e) {
        // Silently fail if localStorage is not available
    }
};

/**
 * Get stored error logs (for debugging)
 */
export const getErrorLogs = (): ErrorAlert[] => {
    try {
        return JSON.parse(localStorage.getItem("error_logs") || "[]");
    } catch {
        return [];
    }
};

/**
 * Clear stored error logs
 */
export const clearErrorLogs = (): void => {
    localStorage.removeItem("error_logs");
};

// Specialized error loggers
export const logDatabaseError = (operation: string, error: Error | unknown, context?: Record<string, unknown>): void => {
    logError("high", `Database Error: ${operation}`, error as Error, context);
};

export const logAuthError = (operation: string, error: Error | unknown): void => {
    logError("medium", `Auth Error: ${operation}`, error as Error);
};

export const logStorageError = (operation: string, error: Error | unknown): void => {
    logError("medium", `Storage Error: ${operation}`, error as Error);
};

export const logCriticalError = (title: string, error: Error | unknown, context?: Record<string, unknown>): void => {
    logError("critical", title, error as Error, context);
};
