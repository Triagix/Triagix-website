import React, { useState } from "react";

export default function App() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submit failed");

      setStatus("Thank you. We received your request.");
      e.currentTarget.reset();
    } catch {
      setStatus("Something went wrong. Please email david@triagix.ai.");
    }
  }

  return (
    <main className="page">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #f7f9fc;
          color: #081B4D;
        }

        .page {
          min-height: 100vh;
          background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
        }

        .nav {
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 72px;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #e8edf5;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
          font-weight: 850;
          font-size: 30px;
          letter-spacing: -1.3px;
        }

        .mark {
          width: 48px;
          height: 48px;
          border: 2px solid #13B5D1;
          border-radius: 14px;
          background: #f3f8fc;
          position: relative;
          display: grid;
          place-items: center;
        }

        .mark:before {
          content: "";
          width: 30px;
          height: 10px;
          background: #081B4D;
          border-radius: 999px;
          position: absolute;
        }

        .mark:after {
          content: "";
          width: 10px;
          height: 30px;
          background: #081B4D;
          border-radius: 999px;
          position: absolute;
        }

        .pulse {
          position: absolute;
          width: 34px;
          height: 18px;
          border-left: 4px solid #13B5D1;
          border-bottom: 4px solid #13B5D1;
          transform: skewX(-22deg);
          bottom: 15px;
        }

        .dot { color: #13B5D1; }

        .links {
          display: flex;
          gap: 34px;
          font-size: 14px;
          font-weight: 650;
        }

        .links a {
          color: #53617a;
          text-decoration: none;
        }

        .links a:hover {
          color: #081B4D;
        }

        .btn {
          border: 0;
          border-radius: 14px;
          padding: 15px 24px;
          font-weight: 750;
          cursor: pointer;
          text-decoration: none;
        }

        .btn.dark {
          background: #081B4D;
          color: white;
          box-shadow: 0 12px 30px rgba(8,27,77,.18);
        }

        .btn.light {
          background: white;
          color: #081B4D;
          border: 1px solid #dce4ef;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.02fr .98fr;
          gap: 70px;
          align-items: center;
          padding: 82px 72px 70px;
          max-width: 1440px;
          margin: 0 auto;
        }

        .eyebrow {
          display: inline-flex;
          padding: 10px 16px;
          border-radius: 999px;
          background: #e8fbff;
          color: #0aa8c2;
          font-size: 12px;
          letter-spacing: 1.4px;
          font-weight: 850;
          margin-bottom: 26px;
          text-transform: uppercase;
        }

        h1 {
          font-size: clamp(48px, 6vw, 78px);
          line-height: .98;
          letter-spacing: -4px;
          margin: 0;
        }

        h2 {
          font-size: clamp(34px, 4vw, 54px);
          line-height: 1.05;
          letter-spacing: -2px;
          margin: 0 0 20px;
        }

        .accent { color: #13B5D1; }

        .sub {
          margin: 28px 0 0;
          color: #526079;
          font-size: 20px;
          line-height: 1.75;
          max-width: 630px;
        }

        .actions {
          display: flex;
          gap: 18px;
          margin-top: 38px;
          flex-wrap: wrap;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 44px;
          color: #53617a;
          font-size: 13px;
          font-weight: 750;
        }

        .visual {
          position: relative;
          min-height: 540px;
          border-radius: 34px;
          overflow: hidden;
          box-shadow: 0 34px 80px rgba(8,27,77,.14);
          background: #eaf4f8;
        }

        .visual img {
          width: 100%;
          height: 100%;
          min-height: 540px;
          object-fit: cover;
          display: block;
        }

        .visualShade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8,27,77,0), rgba(8,27,77,.42));
        }

        .flowCard {
          position: absolute;
          left: 28px;
          top: 32px;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,.7);
          border-radius: 20px;
          padding: 18px 20px;
          width: 250px;
          box-shadow: 0 18px 42px rgba(8,27,77,.16);
        }

        .flowCard.two { top: 152px; left: 74px; }
        .flowCard.three { top: 272px; left: 34px; }

        .label {
          color: #7c8799;
          font-size: 11px;
          letter-spacing: .9px;
          font-weight: 850;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .value {
          font-weight: 850;
          font-size: 17px;
        }

        .section {
          padding: 70px 72px;
          max-width: 1440px;
          margin: 0 auto;
        }

        .center { text-align: center; }

        .grid5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
          margin-top: 42px;
        }

        .card {
          background: white;
          border: 1px solid #e7edf5;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 14px 40px rgba(8,27,77,.04);
        }

        .card h3 {
          margin: 0 0 12px;
          font-size: 18px;
        }

        .card p {
          margin: 0;
          color: #5d6b83;
          line-height: 1.65;
          font-size: 14px;
        }

        .platform {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 48px;
          align-items: center;
        }

        .dashboard {
          background: white;
          border: 1px solid #e7edf5;
          border-radius: 30px;
          padding: 28px;
          box-shadow: 0 24px 70px rgba(8,27,77,.08);
        }

        .metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .metric {
          background: #f8fbff;
          border: 1px solid #e7edf5;
          border-radius: 18px;
          padding: 18px;
          color: #5d6b83;
          font-size: 13px;
        }

        .metric strong {
          display: block;
          font-size: 24px;
          margin-top: 6px;
          color: #081B4D;
        }

        .chart {
          height: 260px;
          border-radius: 22px;
          background: linear-gradient(135deg, #f7fbff, #edf6ff);
          border: 1px solid #e7edf5;
          display: grid;
          place-items: center;
          color: #13B5D1;
          font-weight: 850;
          font-size: 22px;
        }

        .contact {
          background: #081B4D;
          color: white;
          border-radius: 32px;
          padding: 52px;
          display: grid;
          grid-template-columns: 1fr .9fr;
          gap: 40px;
          align-items: center;
        }

        .contact p {
          color: #c8d3e4;
          line-height: 1.7;
        }

        form {
          display: grid;
          gap: 14px;
        }

        input, textarea {
          width: 100%;
          padding: 16px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.1);
          color: white;
          font: inherit;
        }

        input::placeholder,
        textarea::placeholder {
          color: #b8c5d9;
        }

        .footer {
          padding: 30px 72px 60px;
          color: #66738a;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .nav { padding: 0 22px; }
          .links { display: none; }
          .hero, .platform, .contact {
            grid-template-columns: 1fr;
            padding-left: 22px;
            padding-right: 22px;
          }
          .section {
            padding-left: 22px;
            padding-right: 22px;
          }
          .grid5, .metrics {
            grid-template-columns: 1fr;
          }
          h1 { letter-spacing: -2px; }
          .visual { min-height: 440px; }
          .visual img { min-height: 440px; }
        }
      `}</style>

      <nav className="nav">
        <div className="brand">
          <div className="mark">
            <div className="pulse" />
          </div>
          <div>
            TRIAGIX<span className="dot">.</span>
          </div>
        </div>

        <div className="links">
          <a href="#platform">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#security">Security</a>
          <a href="#about">About</a>
        </div>

        <a href="#contact">
          <button className="btn dark">Request Demo</button>
        </a>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">AI-Powered Care Routing Platform</div>

          <h1>
            Intelligent care routing for{" "}
            <span className="accent">better patient outcomes.</span>
          </h1>

          <p className="sub">
            Triagix orchestrates patient interactions across voice, chat, and
            digital channels — connecting people to the right care team at the
            right time.
          </p>

          <div className="actions">
            <a href="#contact">
              <button className="btn dark">Request a Demo</button>
            </a>
            <a href="#platform">
              <button className="btn light">Explore Platform</button>
            </a>
          </div>

          <div id="security" className="badges">
            <span>HIPAA Ready</span>
            <span>SOC 2 Ready</span>
            <span>Enterprise Security</span>
            <span>EHR Integration Ready</span>
          </div>
        </div>

        <div className="visual">
          <img
            src="https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?q=80&w=1600&auto=format&fit=crop"
            alt="Clinician speaking with patient in a modern healthcare setting"
          />
          <div className="visualShade" />

          <div className="flowCard">
            <div className="label">Patient Interaction</div>
            <div className="value">Incoming care request</div>
          </div>

          <div className="flowCard two">
            <div className="label">Intent Detected</div>
            <div className="value">Medication refill</div>
          </div>

          <div className="flowCard three">
            <div className="label">Routing</div>
            <div className="value">Pharmacy team · active</div>
          </div>
        </div>
      </section>

      <section id="platform" className="section platform">
        <div>
          <div className="eyebrow">Operational Visibility</div>
          <h2>Real-time routing intelligence for healthcare teams.</h2>
          <p className="sub">
            Gain visibility into patient routing, queue management, escalation
            trends, intake accuracy, and operational performance across every
            interaction channel.
          </p>
        </div>

        <div className="dashboard">
          <div className="metrics">
            <div className="metric">
              Interactions<strong>18,529</strong>
            </div>
            <div className="metric">
              Auto-Routed<strong>13,742</strong>
            </div>
            <div className="metric">
              Resolved<strong>15,621</strong>
            </div>
            <div className="metric">
              Avg. Time<strong>4:28</strong>
            </div>
          </div>

          <div className="chart">Live Routing Analytics Dashboard</div>
        </div>
      </section>

      <section id="solutions" className="section center">
        <h2>Built for modern healthcare operations</h2>

        <div className="grid5">
          {[
            [
              "Better Patient Experience",
              "Faster answers, less frustration, and more confidence.",
            ],
            [
              "Empowered Clinicians",
              "Reduce manual routing and repetitive intake work.",
            ],
            [
              "Smarter Routing",
              "Understand intent, urgency, and context in real time.",
            ],
            [
              "Operational Visibility",
              "Clear insight into queues, escalations, and performance.",
            ],
            ["Enterprise Ready", "Secure architecture designed for scale."],
          ].map(([title, text]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section">
        <div className="contact">
          <div>
            <h2>Let’s build better healthcare experiences together.</h2>
            <p>
              Share your contact center challenge and we’ll follow up with a
              practical walkthrough of how Triagix can help.
            </p>
          </div>

          <form id="contact" onSubmit={handleSubmit}>
            <input name="name" placeholder="Your name" required />
            <input
              name="email"
              type="email"
              placeholder="Work email address"
              required
            />
            <input name="organization" placeholder="Organization name" />
            <textarea
              name="message"
              placeholder="What are you trying to solve?"
              rows="4"
            />
            <button className="btn dark" type="submit">
              Request Demo
            </button>
            <p>{status}</p>
          </form>
        </div>
      </section>

      <footer className="footer">
        © 2026 Triagix. Intelligent care routing for modern healthcare
        operations.
      </footer>
    </main>
  );
}
