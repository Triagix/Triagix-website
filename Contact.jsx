// ─── UPDATED CONTACT SECTION ─────────────────────────────────────────────────
// Drop-in replacement for the Contact() function in src/App.jsx
// Wires the form to /api/submit (Vercel serverless function)
//
// HOW TO USE:
//   1. Replace the existing Contact() function in src/App.jsx with this one.
//   2. Add api/submit.js to your repo root (see api/submit.js file).
//   3. Add RESEND_API_KEY to Vercel environment variables.
//   4. Deploy — done.

const Contact = () => {
  const [form, setForm]     = useState({ name: "", email: "", org: "", honeypot: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");

  const T = {
    navy: "#0D1B3E", teal: "#00B4C8", tealDark: "#008A9A",
    pulse: "#00D68F", crimson: "#E8304A", textLight: "#7A92AE",
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Client-side validation
    if (!form.name.trim() || form.name.trim().length < 2) {
      setErrMsg("Please enter your full name.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrMsg("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setErrMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const inp = (name, placeholder, type = "text", required = false) => (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={form[name]}
      onChange={handleChange}
      required={required}
      disabled={status === "loading"}
      style={{
        padding: "14px 16px", borderRadius: 8, border: "none",
        fontSize: 14, fontFamily: "'DM Sans', sans-serif",
        background: "rgba(255,255,255,.12)", color: "#fff",
        width: "100%", opacity: status === "loading" ? .7 : 1,
        transition: "opacity .2s",
      }}
    />
  );

  return (
    <section id="contact" style={{
      padding: "96px 5%",
      background: `linear-gradient(135deg, ${T.navy}, ${T.tealDark})`,
    }}>
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: T.teal, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 3, marginBottom: 12 }}>
          JOIN THE WAITLIST
        </div>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 900, fontFamily: "'Syne',sans-serif", color: "#fff", marginBottom: 12 }}>
          First 10 orgs get 3 months free.
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.7)", marginBottom: 40 }}>
          Direct access to the founding team. Shape the product. Get preferred pricing forever.
        </p>

        {/* ── SUCCESS STATE ── */}
        {status === "success" ? (
          <div style={{
            padding: "32px",
            background: "rgba(0,214,143,.15)",
            border: `1px solid ${T.pulse}50`,
            borderRadius: 14,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.pulse, marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>
              You're on the list!
            </div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,.8)", lineHeight: 1.7 }}>
              We'll reach out to <strong style={{ color: "#fff" }}>{form.email}</strong> within 24 hours.
              Looking forward to the conversation.
            </div>
          </div>
        ) : (
          /* ── FORM STATE ── */
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Honeypot — hidden from real users, bots fill it */}
            <input
              name="honeypot"
              type="text"
              value={form.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            {inp("name",  "Your full name *",                "text",  true)}
            {inp("email", "Work email address *",            "email", true)}
            {inp("org",   "Organization name (optional)")}

            {/* Error message */}
            {status === "error" && errMsg && (
              <div style={{
                padding: "10px 14px", borderRadius: 8,
                background: "rgba(232,48,74,.15)",
                border: "1px solid rgba(232,48,74,.35)",
                color: "#ff8096", fontSize: 13, textAlign: "left",
              }}>
                ⚠️ {errMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: "14px", borderRadius: 8, border: "none",
                background: status === "loading" ? T.tealDark : T.teal,
                color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: status === "loading" ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 4,
                boxShadow: "0 6px 24px rgba(0,180,200,.4)",
                transition: "background .2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {status === "loading" ? (
                <>
                  <span style={{
                    display: "inline-block", width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,.4)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin .7s linear infinite",
                  }}/>
                  Sending...
                </>
              ) : "Request Demo & Join Waitlist"}
            </button>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>
        )}

        <p style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 16 }}>
          No spam. No obligations. Just a real conversation about your contact center challenges.
        </p>
      </div>
    </section>
  );
};
