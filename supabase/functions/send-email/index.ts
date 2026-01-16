// Supabase Edge Function for sending emails via Gmail SMTP
// Deploy with: supabase functions deploy send-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// Polyfill for Deno.writeAll which was removed in recent Deno versions
// The smtp library uses this internally
if (typeof Deno.writeAll !== "function") {
    // @ts-ignore - Monkey patching Deno namespace
    Deno.writeAll = async (writer: Deno.Writer, data: Uint8Array) => {
        let n = 0;
        while (n < data.length) {
            n += await writer.write(data.subarray(n));
        }
    };
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
    type: "inquiry" | "error";
    data: Record<string, unknown>;
}

interface InquiryData {
    name: string;
    email?: string;
    phone: string;
    location: string;
    address?: string;
    energy_needs?: string;
    message?: string;
}

interface ErrorData {
    severity: string;
    title: string;
    message: string;
    stack?: string;
    timestamp: string;
    url?: string;
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const SMTP_EMAIL = Deno.env.get("SMTP_EMAIL");
        const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD");
        const SMTP_TO_EMAIL = Deno.env.get("SMTP_TO_EMAIL");

        if (!SMTP_EMAIL || !SMTP_PASSWORD || !SMTP_TO_EMAIL) {
            throw new Error("Missing SMTP configuration");
        }

        const { type, data }: EmailRequest = await req.json();

        let subject = "";
        let htmlBody = "";

        if (type === "inquiry") {
            const inquiry = data as unknown as InquiryData;
            subject = `🌞 New Solar Inquiry from ${inquiry.name}`;
            htmlBody = generateInquiryEmail(inquiry);
        } else if (type === "error") {
            const error = data as unknown as ErrorData;
            subject = `🚨 [${error.severity.toUpperCase()}] ${error.title}`;
            htmlBody = generateErrorEmail(error);
        } else {
            throw new Error("Invalid email type");
        }

        // Connect to Gmail SMTP
        const client = new SmtpClient();
        await client.connectTLS({
            hostname: "smtp.gmail.com",
            port: 465,
            username: SMTP_EMAIL,
            password: SMTP_PASSWORD,
        });

        // Send email
        await client.send({
            from: SMTP_EMAIL,
            to: SMTP_TO_EMAIL,
            subject: subject,
            content: htmlBody,
            html: htmlBody,
        });

        await client.close();

        return new Response(
            JSON.stringify({ success: true, message: "Email sent successfully" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Email error:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});

function generateInquiryEmail(inquiry: InquiryData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    .label { font-weight: bold; color: #6b7280; width: 120px; }
    .value { color: #111827; }
    .message-box { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin-top: 15px; }
    .btn { display: inline-block; padding: 10px 20px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; margin: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">🔔 New Lead Alert!</h1>
      <p style="margin:5px 0 0 0;">You have received a new inquiry from your website.</p>
    </div>
    <div class="content">
      <h2 style="color:#f97316;margin-top:0;">👤 Customer Details</h2>
      <table>
        <tr><td class="label">Name</td><td class="value">${inquiry.name}</td></tr>
        <tr><td class="label">Phone</td><td class="value"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></td></tr>
        <tr><td class="label">Email</td><td class="value">${inquiry.email || "Not provided"}</td></tr>
        <tr><td class="label">City</td><td class="value">${inquiry.location}</td></tr>
        ${inquiry.address ? `<tr><td class="label">Address</td><td class="value">${inquiry.address}</td></tr>` : ""}
      </table>
      
      <h2 style="color:#f97316;">⚡ Energy Requirements</h2>
      <table>
        <tr><td class="label">Monthly Bill</td><td class="value">${inquiry.energy_needs || "Not specified"}</td></tr>
      </table>
      
      ${inquiry.message ? `
      <h2 style="color:#f97316;">💬 Customer Message</h2>
      <div class="message-box">"${inquiry.message}"</div>
      ` : ""}
      
      <div style="margin-top:20px;text-align:center;">
        <a href="tel:${inquiry.phone}" class="btn">📞 Call Customer</a>
        <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}" class="btn" style="background:#25D366;">💬 WhatsApp</a>
      </div>
    </div>
    <div class="footer">
      This is an automated notification from Convex Solar website.<br>
      Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    </div>
  </div>
</body>
</html>`;
}

function generateErrorEmail(error: ErrorData): string {
    const severityColors: Record<string, string> = {
        low: "#3b82f6",
        medium: "#f59e0b",
        high: "#ef4444",
        critical: "#dc2626",
    };
    const color = severityColors[error.severity] || "#ef4444";

    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; line-height: 1.6; color: #333; background: #1f2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${color}; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #111827; padding: 20px; color: #e5e7eb; }
    .footer { background: #374151; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
    .label { color: #9ca3af; }
    .value { color: #f3f4f6; }
    .stack { background: #0f172a; padding: 15px; border-radius: 4px; overflow-x: auto; font-size: 11px; color: #94a3b8; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;">🚨 ERROR ALERT</h1>
      <p style="margin:5px 0 0 0;">Severity: <strong>${error.severity.toUpperCase()}</strong></p>
    </div>
    <div class="content">
      <p><span class="label">Title:</span> <span class="value">${error.title}</span></p>
      <p><span class="label">Message:</span> <span class="value">${error.message}</span></p>
      <p><span class="label">Timestamp:</span> <span class="value">${new Date(error.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</span></p>
      ${error.url ? `<p><span class="label">URL:</span> <span class="value">${error.url}</span></p>` : ""}
      
      ${error.stack ? `
      <p style="margin-top:20px;"><span class="label">Stack Trace:</span></p>
      <div class="stack">${error.stack}</div>
      ` : ""}
    </div>
    <div class="footer">
      Automated error alert from Convex Solar website.<br>
      Please investigate if severity is HIGH or CRITICAL.
    </div>
  </div>
</body>
</html>`;
}
