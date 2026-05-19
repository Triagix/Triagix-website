// api/submit.js
// Vercel Serverless Function — handles form submissions
// Sends email via Resend API + logs to submissions.json (or Supabase if configured)

export default async function handler(req, res) {
  // ── CORS headers ────────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── Parse body ───────────────────────────────────────────────────────────
  const { name, email, org, honeypot } = req.body || {};

  // ── Honeypot spam check ──────────────────────────────────────────────────
  if (honeypot) {
    // Bot filled the hidden field — silently succeed
    return res.status(200).json({ success: true });
  }

  // ── Basic validation ─────────────────────────────────────────────────────
  const errors = [];
  if (!name || name.trim().length < 2)        errors.push("Name is required (min 2 chars).");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required.");
  if (name && name.trim().length > 120)       errors.push("Name is too long.");
  if (org   && org.trim().length > 200)       errors.push("Organization name is too long.");

  if (errors.length) return res.status(400).json({ error: errors.join(" ") });

  const timestamp  = new Date().toISOString();
  const cleanName  = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanOrg   = (org || "").trim() || "Not provided";

  // ── Send email via Resend ────────────────────────────────────────────────
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO_EMAIL       = process.env.TO_EMAIL || "david@triagix.ai";

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set");
    return res.status(500).json({ error: "Server configuration error. Please try again later." });
  }

  const emailBody = {
    from: "Triagix Waitlist <noreply@triagix.ai>",
    to:   [TO_EMAIL],
    reply_to: cleanEmail,
    subject: `🚀 New Demo Request — ${cleanName} (${cleanOrg})`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Demo Request</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(13,27,62,.12);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0D1B3E,#1A2F5E);padding:36px 40px;">
            <div style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
              Triagix<span style="color:#00B4C8;">.</span>
            </div>
            <div style="font-size:13px;color:rgba(255,255,255,.55);margin-top:4px;letter-spacing:2px;text-transform:uppercase;font-family:monospace;">
              New Demo Request
            </div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="font-size:16px;color:#4A6080;margin:0 0 28px;">
              A new lead has submitted a demo request on <strong style="color:#0D1B3E;">triagix.ai</strong>.
            </p>

            <!-- Detail rows -->
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["👤 Name",         cleanName],
                ["📧 Email",        cleanEmail],
                ["🏥 Organization", cleanOrg],
                ["🕐 Timestamp",    timestamp],
              ].map(([label, value]) => `
              <tr>
                <td style="padding:12px 16px;background:#F8FAFB;border-radius:8px;margin-bottom:8px;display:block;">
                  <div style="font-size:11px;color:#7A92AE;text-transform:uppercase;letter-spacing:1.5px;font-family:monospace;margin-bottom:4px;">${label}</div>
                  <div style="font-size:15px;color:#0D1B3E;font-weight:600;">${value}</div>
                </td>
              </tr>
              <tr><td style="height:8px;"></td></tr>
              `).join("")}
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td>
                  <a href="mailto:${cleanEmail}?subject=Re: Your Triagix Demo Request"
                     style="display:inline-block;padding:12px 28px;background:#00B4C8;color:#ffffff;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">
                    Reply to ${cleanName} →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;background:#F8FAFB;border-top:1px solid #E8EFF6;">
            <p style="font-size:12px;color:#7A92AE;margin:0;">
              Triagix · Exemplaryoutlook LLC · Atlanta, GA · 
              <a href="https://triagix.ai" style="color:#00B4C8;">triagix.ai</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
    text: `
New Demo Request — Triagix

Name:         ${cleanName}
Email:        ${cleanEmail}
Organization: ${cleanOrg}
Timestamp:    ${timestamp}

Reply directly to this email to reach ${cleanName}.
    `.trim(),
  };

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("Resend error:", resendRes.status, errBody);
      return res.status(500).json({ error: "Failed to send email. Please try again." });
    }

    // ── Optional: log to Supabase ──────────────────────────────────────────
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
          method: "POST",
          headers: {
            "apikey":        SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Content-Type":  "application/json",
            "Prefer":        "return=minimal",
          },
          body: JSON.stringify({
            name:      cleanName,
            email:     cleanEmail,
            org:       cleanOrg,
            timestamp: timestamp,
            source:    "triagix.ai",
          }),
        });
      } catch (dbErr) {
        // Non-fatal — email already sent
        console.warn("Supabase log failed:", dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Request received. We'll be in touch within 24 hours.",
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
