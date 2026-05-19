import React from "react";

export default function App() {
  return (
    <div
      style={{
        background: "#F7F9FC",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#081B4D",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 80px",
          background: "white",
          borderBottom: "1px solid #E5EAF2",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <img
            src="https://i.imgur.com/5vQzYkD.png"
            alt="Triagix"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
            }}
          />

          <div
            style={{
              fontSize: "34px",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            TRIAGIX
            <span style={{ color: "#13B5D1" }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "40px",
            color: "#5B6478",
            fontWeight: 500,
          }}
        >
          <span>Platform</span>
          <span>Solutions</span>
          <span>Security</span>
          <span>About</span>
        </div>

        <button
          style={{
            background: "#081B4D",
            color: "white",
            border: "none",
            padding: "14px 28px",
            borderRadius: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Request Demo
        </button>
      </nav>

      {/* HERO */}
      <section
        style={{
          padding: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "80px",
        }}
      >
        {/* LEFT */}
        <div style={{ maxWidth: "620px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: "999px",
              background: "#E8FBFF",
              color: "#13B5D1",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1px",
              marginBottom: "28px",
            }}
          >
            AI-POWERED CARE ROUTING PLATFORM
          </div>

          <h1
            style={{
              fontSize: "72px",
              lineHeight: "78px",
              margin: 0,
              letterSpacing: "-3px",
            }}
          >
            Intelligent care routing for{" "}
            <span style={{ color: "#13B5D1" }}>
              better patient outcomes.
            </span>
          </h1>

          <p
            style={{
              marginTop: "30px",
              color: "#5B6478",
              fontSize: "22px",
              lineHeight: "38px",
            }}
          >
            Triagix orchestrates patient interactions across voice,
            chat, and digital channels — connecting people to the
            right care team at the right time.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <button
              style={{
                background: "#081B4D",
                color: "white",
                border: "none",
                padding: "18px 34px",
                borderRadius: "16px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Request a Demo
            </button>

            <button
              style={{
                background: "white",
                color: "#081B4D",
                border: "1px solid #D7DFEA",
                padding: "18px 34px",
                borderRadius: "16px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Explore Platform
            </button>
          </div>

          {/* FEATURE TAGS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
              marginTop: "50px",
              color: "#5B6478",
              fontWeight: 600,
            }}
          >
            <span>HIPAA Ready</span>
            <span>SOC 2 Ready</span>
            <span>Enterprise Security</span>
            <span>EHR Integrations</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
            alt="Healthcare team"
            style={{
              width: "100%",
              borderRadius: "28px",
              objectFit: "cover",
              boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
            }}
          />

          {/* FLOATING CARD */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "-40px",
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              width: "240px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#8B96A8",
                marginBottom: "10px",
                fontWeight: 700,
              }}
            >
              AI ROUTING STATUS
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#081B4D",
              }}
            >
              96.3%
            </div>

            <div
              style={{
                marginTop: "8px",
                color: "#13B5D1",
                fontWeight: 600,
              }}
            >
              Routing Accuracy Active
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
