import React from "react";

export default function App() {
  return (
    <div
      style={{
        background: "#F7F9FC",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#0B1B4D",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 80px",
          background: "white",
          borderBottom: "1px solid #EEF2F7",
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
            src="https://i.imgur.com/BvGZpGx.png"
            alt="Triagix"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
            }}
          />

          <div
            style={{
              fontSize: "34px",
              fontWeight: 800,
              letterSpacing: "-2px",
            }}
          >
            TRIAGIX
            <span style={{ color: "#11C5D9" }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "42px",
            color: "#5B6B88",
            fontWeight: 500,
            fontSize: "16px",
          }}
        >
          <span>Platform</span>
          <span>Solutions</span>
          <span>Security</span>
          <span>About</span>
        </div>

        <button
          style={{
            background: "#0B1B4D",
            color: "white",
            border: "none",
            padding: "16px 28px",
            borderRadius: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Request Demo
        </button>
      </nav>

      {/* HERO */}

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "120px 80px",
          gap: "80px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            maxWidth: "700px",
          }}
        >
          <div
            style={{
              color: "#11C5D9",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: 700,
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            Intelligent Healthcare Operations
          </div>

          <h1
            style={{
              fontSize: "78px",
              lineHeight: "0.95",
              letterSpacing: "-4px",
              marginBottom: "34px",
              fontWeight: 800,
            }}
          >
            Route Every Patient
            <br />
            To The Right Care Team.
          </h1>

          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.7",
              color: "#5B6B88",
              marginBottom: "42px",
              maxWidth: "620px",
            }}
          >
            AI-powered intake, triage, and intelligent routing
            designed for modern healthcare contact centers and
            patient access operations.
          </p>

          <div
            style={{
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "#11C5D9",
                color: "white",
                border: "none",
                padding: "18px 34px",
                borderRadius: "16px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Request Demo
            </button>

            <button
              style={{
                background: "white",
                color: "#0B1B4D",
                border: "1px solid #D8E1EE",
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
        </div>

        {/* RIGHT SIDE CARD */}

        <div
          style={{
            width: "460px",
            background: "white",
            borderRadius: "30px",
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              fontWeight: 700,
              marginBottom: "30px",
            }}
          >
            Operational Visibility
          </div>

          {[
            ["Routing Accuracy", "98.2%"],
            ["Avg Queue Time", "2m 14s"],
            ["Escalation Detection", "Live"],
            ["Care Path Matching", "Active"],
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "18px 0",
                borderBottom:
                  index !== 3 ? "1px solid #EEF2F7" : "none",
              }}
            >
              <span
                style={{
                  color: "#5B6B88",
                }}
              >
                {item[0]}
              </span>

              <strong
                style={{
                  color:
                    item[1] === "Live" || item[1] === "Active"
                      ? "#11C5D9"
                      : "#0B1B4D",
                }}
              >
                {item[1]}
              </strong>
            </div>
          ))}

          <div
            style={{
              marginTop: "34px",
              height: "220px",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg,#0B1B4D,#123C8D)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                background: "rgba(17,197,217,0.15)",
                top: "-40px",
                right: "-40px",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "30px",
                color: "white",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  opacity: 0.7,
                  marginBottom: "8px",
                }}
              >
                ACTIVE ROUTING ENGINE
              </div>

              <div
                style={{
                  fontSize: "42px",
                  fontWeight: 800,
                }}
              >
                LIVE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "28px",
          padding: "0 80px 120px",
        }}
      >
        {[
          {
            title: "Intelligent Intake",
            text:
              "AI-assisted workflows streamline patient intake and triage operations.",
          },
          {
            title: "Smart Routing",
            text:
              "Connect patients to the right department and care pathway faster.",
          },
          {
            title: "Operational Visibility",
            text:
              "Real-time insights across queues, escalations, and staffing.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "18px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#5B6B88",
                lineHeight: "1.8",
                fontSize: "17px",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
