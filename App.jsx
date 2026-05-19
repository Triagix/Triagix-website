import { useState, useEffect } from "react";

/* ─── DESIGN TOKENS ──────────────────────────────────────────────────────── */
const T = {
  navy:      "#0D1B3E",
  navyMid:   "#1A2F5E",
  navyLt:    "#EEF2FA",
  teal:      "#00B4C8",
  tealDark:  "#008A9A",
  tealLt:    "#E0F7FA",
  pulse:     "#00D68F",
  pulseDark: "#00A86B",
  pulseLt:   "#E0FBF1",
  crimson:   "#E8304A",
  amber:     "#F59E0B",
  white:     "#FFFFFF",
  offWhite:  "#F8FAFB",
  bg:        "#F0F4F8",
  text:      "#0D1B3E",
  textMid:   "#4A6080",
  textLight: "#7A92AE",
  border:    "#D0DCE8",
  borderLt:  "#E8EFF6",
};

const fH = `'Syne', 'DM Sans', sans-serif`;
const fB = `'DM Sans', sans-serif`;
const fM = `'JetBrains Mono', monospace`;

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: ${T.white};
      color: ${T.text};
      font-family: ${fB};
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #f0f4f8; }
    ::-webkit-scrollbar-thumb { background: #c8d8e8; border-radius: 3px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: .35; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: scale(.8); }
      to   { opacity: 1; transform: scale(1); }
    }

    .fu  { animation: fadeUp  .6s ease both; }
    .fi  { animation: fadeIn  .45s ease both; }
    .cu  { animation: countUp .5s ease both; }

    a { text-decoration: none; color: inherit; }

    /* smooth scroll offset for fixed nav */
    section[id] { scroll-margin-top: 72px; }

    input::placeholder { color: rgba(255,255,255,.45); }
    input:focus { outline: 2px solid ${T.teal}; }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .grid-2 { grid-template-columns: 1fr !important; }
      .grid-3 { grid-template-columns: 1fr !important; }
      .grid-4 { grid-template-columns: 1fr 1fr !important; }
    }
  `}</style>
);

/* ─── LOGO / WORDMARK ────────────────────────────────────────────────────── */
const TriagixMark = ({ size = 48, light = false }) => {
  const bg   = light ? "rgba(255,255,255,.12)" : T.navyLt;
  const ring = light ? "rgba(255,255,255,.7)"  : T.teal;
  const bar  = light ? "#fff"                  : T.navy;
  const line = light ? "rgba(255,255,255,.85)" : T.teal;
  const dot  = light ? "rgba(0,214,143,.9)"    : T.pulse;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-label="Triagix mark">
      <rect x="3" y="3" width="74" height="74" rx="16" fill={bg} stroke={ring} strokeWidth="2.5"/>
      <rect x="12" y="33" width="56" height="14" rx="7" fill={bar}/>
      <rect x="33" y="12" width="14" height="56" rx="7" fill={bar}/>
      <polyline
        points="12,52 22,52 29,28 36,64 42,38 49,52 68,52"
        stroke={line} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
      <circle cx="29" cy="28" r="4" fill={dot}/>
      <circle cx="42" cy="38" r="4" fill={dot}/>
    </svg>
  );
};

const Wordmark = ({ size = 32, light = false }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <TriagixMark size={size} light={light}/>
    <span style={{
      fontSize: size * 0.6,
      fontWeight: 900,
      fontFamily: fH,
      letterSpacing: -0.5,
      color: light ? "#fff" : T.navy,
      lineHeight: 1,
      userSelect: "none",
    }}>
      Triagix<span style={{ color: T.teal }}>.</span>
    </span>
  </div>
);

/* ─── NAV ────────────────────────────────────────────────────────────────── */
const Nav = ({ scrolled }) => (
  <nav style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled ? "rgba(255,255,255,.97)" : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottom: scrolled ? `1px solid ${T.borderLt}` : "none",
    transition: "all .3s ease",
    padding: "0 5%",
    height: 68,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  }}>
    <a href="#top"><Wordmark size={36} light={!scrolled}/></a>

    <div style={{ display:"flex", gap:28, alignItems:"center" }}>
      {[
        ["Platform", "#platform"],
        ["Pricing",  "#pricing"],
        ["About",    "#about"],
      ].map(([label, href]) => (
        <a key={label} href={href} style={{
          fontSize: 14, fontWeight: 600,
          color: scrolled ? T.textMid : "rgba(255,255,255,.82)",
          transition: "color .2s",
        }}
          className="hide-mobile"
        >{label}</a>
      ))}
      <a href="#contact" style={{
        padding: "8px 22px", borderRadius: 8,
        background: T.teal, color: "#fff",
        fontSize: 14, fontWeight: 700,
        boxShadow: "0 4px 14px rgba(0,180,200,.35)",
        transition: "opacity .2s",
      }}>Request Demo</a>
    </div>
  </nav>
);

/* ─── HERO ───────────────────────────────────────────────────────────────── */
const Hero = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setCount(c => (c < 350 ? c + 7 : 350)), 16);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="top" style={{
      background: `linear-gradient(160deg, ${T.navy} 0%, ${T.navyMid} 55%, #0A3870 100%)`,
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "120px 5% 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid lines */}
      <svg style={{ position:"absolute", inset:0, opacity:.04, pointerEvents:"none", width:"100%", height:"100%" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={`${i*9}%`} x2="100%" y2={`${i*9}%`} stroke="white" strokeWidth=".5"/>
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <line key={`v${i}`} x1={`${i*6}%`} y1="0" x2={`${i*6}%`} y2="100%" stroke="white" strokeWidth=".5"/>
        ))}
      </svg>

      {/* Glow orb */}
      <div style={{
        position:"absolute", right:"4%", top:"14%",
        width:520, height:520, borderRadius:"50%",
        background:`radial-gradient(circle, ${T.teal}22, transparent 70%)`,
        pointerEvents:"none",
      }}/>

      {/* Pulse decoration */}
      <svg style={{ position:"absolute", bottom:56, right:"3%", opacity:.11, pointerEvents:"none" }}
        width="380" height="90" viewBox="0 0 380 90">
        <polyline
          points="0,45 55,45 80,12 105,78 130,35 155,45 210,45 235,18 260,72 285,45 380,45"
          stroke={T.pulse} strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>

      <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative" }}>
        {/* Badge */}
        <div className="fu" style={{
          display:"inline-flex", alignItems:"center", gap:8,
          padding:"6px 16px", borderRadius:20, marginBottom:24,
          background:"rgba(0,180,200,.15)", border:`1px solid ${T.teal}40`,
        }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:T.pulse, animation:"pulse 2s infinite" }}/>
          <span style={{ fontSize:11, color:T.teal, fontWeight:700, fontFamily:fM, letterSpacing:1 }}>
            NOW IN BETA · ATLANTA, GA
          </span>
        </div>

        <h1 className="fu" style={{
          fontSize:"clamp(38px, 6vw, 72px)",
          fontWeight:900, fontFamily:fH,
          color:"#fff", lineHeight:1.05,
          marginBottom:20, maxWidth:700,
          animationDelay:".05s",
        }}>
          Route the Right Care.<br/>
          <span style={{ color:T.teal }}>Every Contact.</span><br/>
          <span style={{ color:T.pulse }}>Every Time.</span>
        </h1>

        <p className="fu" style={{
          fontSize:18, color:"rgba(255,255,255,.78)",
          maxWidth:520, lineHeight:1.75, marginBottom:36,
          animationDelay:".1s",
        }}>
          Triagix is the AI triage and routing platform built for telehealth contact centers.
          Overlay on your existing stack. Go live in 30 minutes.
        </p>

        {/* Counter */}
        <div className="fu" style={{
          display:"inline-flex", alignItems:"center", gap:12,
          background:"rgba(255,255,255,.08)", borderRadius:12,
          padding:"12px 22px", marginBottom:32,
          border:"1px solid rgba(255,255,255,.12)",
          animationDelay:".15s",
        }}>
          <span style={{ fontSize:30, fontWeight:900, color:T.teal, fontFamily:fH }}>
            &lt;{count}ms
          </span>
          <span style={{ fontSize:13, color:"rgba(255,255,255,.72)" }}>
            AI triage classification time
          </span>
        </div>

        {/* CTAs */}
        <div className="fu" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:56, animationDelay:".2s" }}>
          <a href="#contact" style={{
            padding:"14px 32px", borderRadius:9,
            background:T.teal, color:"#fff", fontSize:15, fontWeight:700,
            boxShadow:"0 6px 24px rgba(0,180,200,.4)",
          }}>🚀 Request Demo</a>
          <a href="#platform" style={{
            padding:"14px 32px", borderRadius:9,
            border:"1.5px solid rgba(255,255,255,.3)",
            background:"rgba(255,255,255,.08)", color:"#fff",
            fontSize:15, fontWeight:600,
          }}>See How It Works</a>
        </div>

        {/* Stats */}
        <div className="fu" style={{ display:"flex", gap:36, flexWrap:"wrap", animationDelay:".25s" }}>
          {[
            { n:"60%",    l:"Contacts resolved by AI" },
            { n:"<2 min", l:"P1 emergency connect time" },
            { n:"87%",    l:"First contact resolution" },
            { n:"$285B",  l:"Telehealth market by 2028" },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontSize:24, fontWeight:900, color:T.pulse, fontFamily:fH }}>{s.n}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── INTEGRATION BANNER ─────────────────────────────────────────────────── */
const IntegrationBanner = () => (
  <div style={{
    background:T.offWhite, padding:"20px 5%",
    borderBottom:`1px solid ${T.borderLt}`,
  }}>
    <div style={{
      maxWidth:1100, margin:"0 auto",
      display:"flex", alignItems:"center", gap:32, flexWrap:"wrap",
    }}>
      <span style={{ fontSize:10, fontWeight:700, color:T.textLight, letterSpacing:2, fontFamily:fM, flexShrink:0 }}>
        OVERLAYS ON
      </span>
      {["Epic","Cerner","Amazon Connect","Twilio","Zoom Health","athenahealth"].map(l => (
        <span key={l} style={{ fontSize:13, fontWeight:700, color:T.textMid, opacity:.65 }}>{l}</span>
      ))}
    </div>
  </div>
);

/* ─── PROBLEM ─────────────────────────────────────────────────────────────── */
const Problem = () => (
  <section style={{ padding:"96px 5%", background:T.white }}>
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:60 }}>
        <div style={{ fontSize:11, color:T.crimson, fontFamily:fM, letterSpacing:3, marginBottom:12 }}>THE PROBLEM</div>
        <h2 style={{ fontSize:"clamp(26px, 4vw, 46px)", fontWeight:900, fontFamily:fH, color:T.navy, marginBottom:16 }}>
          Telehealth contact centers are broken.
        </h2>
        <p style={{ fontSize:17, color:T.textMid, maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>
          Generic contact center tools weren't built for healthcare. The result is preventable mistakes,
          burned-out clinical staff, and patients who feel like numbers.
        </p>
      </div>

      <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
        {[
          { icon:"🚨", title:"P1 emergencies wait in queue",    color:T.crimson, desc:"A chest pain patient sits on hold behind a prescription refill. No intelligent routing means no clinical prioritization." },
          { icon:"🔄", title:"Patients repeat themselves",       color:T.amber,   desc:"Every transfer forces the patient to repeat symptoms, insurance, and reason for calling. Dignity is optional." },
          { icon:"😰", title:"Reps handle wrong contacts",       color:T.teal,    desc:"Clinical nurses spend 70% of their day on routine admin that AI could handle. Burnout is inevitable." },
          { icon:"📊", title:"Zero triage visibility",           color:T.navy,    desc:"No data on routing accuracy, wait times by priority, or AI vs. human resolution rates. Decisions are made blind." },
        ].map(p => (
          <div key={p.title} style={{
            padding:28, borderRadius:14,
            background:T.offWhite, border:`1px solid ${T.borderLt}`,
            borderTop:`3px solid ${p.color}`,
          }}>
            <div style={{ fontSize:32, marginBottom:12 }}>{p.icon}</div>
            <div style={{ fontSize:15, fontWeight:700, color:T.navy, marginBottom:8 }}>{p.title}</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.7 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── SOLUTION / PLATFORM ────────────────────────────────────────────────── */
const Solution = () => (
  <section id="platform" style={{ padding:"96px 5%", background:T.navy }}>
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:60 }}>
        <div style={{ fontSize:11, color:T.teal, fontFamily:fM, letterSpacing:3, marginBottom:12 }}>THE TRIAGIX SOLUTION</div>
        <h2 style={{ fontSize:"clamp(26px, 4vw, 46px)", fontWeight:900, fontFamily:fH, color:"#fff", marginBottom:16 }}>
          AI that routes with clinical precision.
        </h2>
        <p style={{ fontSize:17, color:"rgba(255,255,255,.7)", maxWidth:540, margin:"0 auto", lineHeight:1.75 }}>
          Six-dimension classification in under 350 milliseconds. Every patient contact reaches the right handler. Every time.
        </p>
      </div>

      {/* 6 Dimensions */}
      <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12, marginBottom:48 }}>
        {[
          { n:"01", d:"Keyword Detection",  c:T.teal },
          { n:"02", d:"Sentiment Analysis", c:"#C47EFF" },
          { n:"03", d:"Medical History",    c:T.pulse },
          { n:"04", d:"Severity Scoring",   c:T.amber },
          { n:"05", d:"Time Sensitivity",   c:T.crimson },
          { n:"06", d:"Risk Composite",     c:T.teal },
        ].map(d => (
          <div key={d.n} style={{
            textAlign:"center", padding:"18px 8px",
            background:"rgba(255,255,255,.05)", borderRadius:12,
            border:`1px solid ${d.c}30`,
          }}>
            <div style={{ fontSize:22, fontWeight:900, color:d.c, fontFamily:fH, marginBottom:6 }}>{d.n}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,.55)", lineHeight:1.4 }}>{d.d}</div>
          </div>
        ))}
      </div>

      {/* Priority levels */}
      <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
        {[
          { level:"P1", label:"CRITICAL", color:T.crimson, bg:"rgba(232,48,74,.12)",  sla:"< 2 min",  handler:"Emergency Protocol",  example:"Chest pain, suicidal ideation" },
          { level:"P2", label:"URGENT",   color:T.amber,   bg:"rgba(245,158,11,.12)", sla:"< 8 min",  handler:"Live Clinical Rep",    example:"Acute mental health, urgent symptoms" },
          { level:"P3", label:"MODERATE", color:T.teal,    bg:"rgba(0,180,200,.12)",  sla:"< 30 min", handler:"AI + Rep Backup",      example:"Complex questions, follow-ups" },
          { level:"P4", label:"ROUTINE",  color:T.pulse,   bg:"rgba(0,214,143,.12)",  sla:"< 4 hrs",  handler:"AI Autonomous",        example:"Refills, scheduling, portal help" },
        ].map(p => (
          <div key={p.level} style={{
            background:p.bg, borderRadius:14, padding:24,
            border:`1px solid ${p.color}30`,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:28, fontWeight:900, color:p.color, fontFamily:fH }}>{p.level}</span>
              <span style={{
                padding:"3px 10px", borderRadius:10,
                fontSize:10, fontWeight:700, fontFamily:fM,
                background:`${p.color}20`, color:p.color,
              }}>{p.label}</span>
            </div>
            <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:4 }}>{p.handler}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", fontFamily:fM, marginBottom:8 }}>SLA: {p.sla}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontStyle:"italic" }}>{p.example}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── HOW IT WORKS ───────────────────────────────────────────────────────── */
const HowItWorks = () => (
  <section style={{ padding:"96px 5%", background:T.white }}>
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:60 }}>
        <div style={{ fontSize:11, color:T.teal, fontFamily:fM, letterSpacing:3, marginBottom:12 }}>HOW IT WORKS</div>
        <h2 style={{ fontSize:"clamp(26px, 4vw, 46px)", fontWeight:900, fontFamily:fH, color:T.navy }}>
          From first contact to right handler in 350ms.
        </h2>
      </div>

      <div className="grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {[
          { step:"1", icon:"📞", title:"Patient contacts",  desc:"Call, chat, or message arrives at the telehealth contact center." },
          { step:"2", icon:"🧠", title:"AI classifies",     desc:"Six-dimension engine scores across clinical, sentiment, and risk in under 350ms." },
          { step:"3", icon:"⚡", title:"Priority assigned", desc:"P1–P4 classification determines routing. Confidence below 85% auto-upgrades." },
          { step:"4", icon:"✅", title:"Right handler",     desc:"AI resolves P4/P3. Live reps receive P2/P1 with pre-loaded clinical brief." },
        ].map((s, i) => (
          <div key={s.step} style={{
            padding:"32px 24px", textAlign:"center",
            borderRight: i < 3 ? `1px solid ${T.borderLt}` : "none",
          }}>
            <div style={{ fontSize:36, marginBottom:12 }}>{s.icon}</div>
            <div style={{
              width:32, height:32, borderRadius:"50%",
              background:T.teal, color:"#fff",
              fontSize:13, fontWeight:900,
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 12px",
            }}>{s.step}</div>
            <div style={{ fontSize:15, fontWeight:700, color:T.navy, marginBottom:8 }}>{s.title}</div>
            <div style={{ fontSize:13, color:T.textMid, lineHeight:1.7 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── PRICING ─────────────────────────────────────────────────────────────── */
const Pricing = () => (
  <section id="pricing" style={{ padding:"96px 5%", background:T.offWhite }}>
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:60 }}>
        <div style={{ fontSize:11, color:T.teal, fontFamily:fM, letterSpacing:3, marginBottom:12 }}>PRICING</div>
        <h2 style={{ fontSize:"clamp(26px, 4vw, 46px)", fontWeight:900, fontFamily:fH, color:T.navy, marginBottom:12 }}>
          Platform fee plus consumption.
        </h2>
        <p style={{ fontSize:16, color:T.textMid }}>Pay for what you use. Scale as your patients grow.</p>
      </div>

      <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {[
          {
            name:"Starter", price:"$800", period:"/mo", featured:false,
            contacts:"500 contacts included", overage:"$0.85 AI · $2.50 Live Rep", color:T.teal,
            features:["AI triage engine","P1–P4 classification","AI handoff brief","Basic analytics","Email support"],
            cta:"Get Started",
          },
          {
            name:"Pro", price:"$2,000", period:"/mo", featured:true,
            contacts:"2,000 contacts included", overage:"$0.65 AI · $1.80 Live Rep", color:T.navy,
            features:["Everything in Starter","Advanced analytics","Custom routing rules","Rep utilization reporting","Priority support","Custom integrations"],
            cta:"Most Popular",
          },
          {
            name:"Enterprise", price:"Custom", period:"", featured:false,
            contacts:"Unlimited contacts", overage:"Volume discounts", color:T.pulse,
            features:["Everything in Pro","Dedicated success manager","SLA guarantees","Custom FHIR integrations","On-site onboarding","Legal & compliance support"],
            cta:"Contact Us",
          },
        ].map(t => (
          <div key={t.name} style={{
            background: t.featured ? T.navy : T.white,
            borderRadius:16, padding:32,
            border: t.featured ? "none" : `1px solid ${T.borderLt}`,
            boxShadow: t.featured ? "0 20px 60px rgba(13,27,62,.28)" : "0 2px 8px rgba(13,27,62,.07)",
            transform: t.featured ? "scale(1.04)" : "scale(1)",
            position:"relative",
          }}>
            {t.featured && (
              <div style={{
                position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)",
                background:T.teal, color:"#fff", padding:"4px 16px", borderRadius:20,
                fontSize:11, fontWeight:700, fontFamily:fM, whiteSpace:"nowrap",
              }}>MOST POPULAR</div>
            )}
            <div style={{ fontSize:13, fontWeight:700, color: t.featured ? T.teal : t.color, marginBottom:12 }}>{t.name}</div>
            <div style={{ marginBottom:8 }}>
              <span style={{ fontSize:42, fontWeight:900, color: t.featured ? "#fff" : T.navy, fontFamily:fH }}>{t.price}</span>
              <span style={{ fontSize:13, color: t.featured ? "rgba(255,255,255,.45)" : T.textLight }}>{t.period}</span>
            </div>
            <div style={{ fontSize:12, color: t.featured ? "rgba(255,255,255,.55)" : T.textMid, marginBottom:4 }}>{t.contacts}</div>
            <div style={{ fontSize:11, color: t.featured ? "rgba(255,255,255,.38)" : T.textLight, fontFamily:fM, marginBottom:24 }}>{t.overage}</div>
            <div style={{ height:1, background: t.featured ? "rgba(255,255,255,.1)" : T.borderLt, marginBottom:20 }}/>
            {t.features.map((f,i) => (
              <div key={i} style={{ display:"flex", gap:8, marginBottom:10 }}>
                <span style={{ color: t.featured ? T.pulse : T.teal, flexShrink:0 }}>✓</span>
                <span style={{ fontSize:13, color: t.featured ? "rgba(255,255,255,.8)" : T.textMid }}>{f}</span>
              </div>
            ))}
            <a href="#contact" style={{
              display:"block", marginTop:24,
              padding:"12px", borderRadius:8, textAlign:"center",
              background: t.featured ? T.teal : "transparent",
              border: t.featured ? "none" : `2px solid ${T.border}`,
              color: t.featured ? "#fff" : T.navy,
              fontSize:14, fontWeight:700,
            }}>{t.cta}</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── ABOUT ──────────────────────────────────────────────────────────────── */
const About = () => (
  <section id="about" style={{ padding:"96px 5%", background:T.white }}>
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
        <div>
          <div style={{ fontSize:11, color:T.teal, fontFamily:fM, letterSpacing:3, marginBottom:12 }}>ABOUT TRIAGIX</div>
          <h2 style={{ fontSize:"clamp(26px, 3vw, 40px)", fontWeight:900, fontFamily:fH, color:T.navy, marginBottom:20, lineHeight:1.2 }}>
            Built in Atlanta.<br/>Built for clinical teams.
          </h2>
          <p style={{ fontSize:15, color:T.textMid, lineHeight:1.8, marginBottom:16 }}>
            Triagix was founded by David Millaud, Founder & CEO of Exemplaryoutlook LLC —
            a 10-year Atlanta-based healthcare operations company. After watching telehealth contact centers
            fail patients in real time, we built the infrastructure layer the industry was missing.
          </p>
          <p style={{ fontSize:15, color:T.textMid, lineHeight:1.8, marginBottom:32 }}>
            We don't replace what you have. We make it intelligent. Our overlay architecture connects to
            your existing EHR, phone system, and video platform — no rip-and-replace required.
          </p>
          <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
            {[
              { n:"HIPAA",  l:"Compliant from day one" },
              { n:"30 min", l:"Average go-live time" },
              { n:"10 yr",  l:"Healthcare ops background" },
            ].map(s => (
              <div key={s.n}>
                <div style={{ fontSize:20, fontWeight:900, color:T.teal, fontFamily:fH }}>{s.n}</div>
                <div style={{ fontSize:11, color:T.textLight, marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background:`linear-gradient(145deg, ${T.navy}, ${T.navyMid})`,
          borderRadius:20, padding:48,
        }}>
          <div style={{ fontSize:11, color:T.teal, fontFamily:fM, letterSpacing:3, marginBottom:20 }}>MISSION</div>
          <p style={{ fontSize:17, lineHeight:1.8, fontStyle:"italic", color:"rgba(255,255,255,.85)" }}>
            "To deliver intelligent, clinically precise care routing for every telehealth organization —
            ensuring every patient reaches the right handler, every contact, every time."
          </p>
          <div style={{ marginTop:24, paddingTop:24, borderTop:"1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>David Millaud</div>
            <div style={{ fontSize:12, color:T.teal }}>Founder & CEO, Triagix</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── CONTACT / WAITLIST ─────────────────────────────────────────────────── */
const Contact = () => {
  const [form, setForm]   = useState({ name:"", email:"", org:"" });
  const [done, setDone]   = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (form.name && form.email) setDone(true);
  };

  const inp = {
    padding:"14px 16px", borderRadius:8, border:"none",
    fontSize:14, fontFamily:fB,
    background:"rgba(255,255,255,.12)", color:"#fff",
    width:"100%",
  };

  return (
    <section id="contact" style={{
      padding:"96px 5%",
      background:`linear-gradient(135deg, ${T.navy}, ${T.tealDark})`,
    }}>
      <div style={{ maxWidth:620, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:11, color:T.teal, fontFamily:fM, letterSpacing:3, marginBottom:12 }}>JOIN THE WAITLIST</div>
        <h2 style={{ fontSize:"clamp(26px, 4vw, 46px)", fontWeight:900, fontFamily:fH, color:"#fff", marginBottom:12 }}>
          First 10 orgs get 3 months free.
        </h2>
        <p style={{ fontSize:16, color:"rgba(255,255,255,.7)", marginBottom:40 }}>
          Direct access to the founding team. Shape the product. Get preferred pricing forever.
        </p>

        {done ? (
          <div style={{
            padding:"24px 32px",
            background:"rgba(0,214,143,.15)",
            border:`1px solid ${T.pulse}40`,
            borderRadius:12, color:T.pulse,
            fontSize:16, fontWeight:700,
          }}>
            ✅ You're on the list. We'll reach out within 24 hours.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <input
              style={inp} type="text" placeholder="Your name" required
              value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
            />
            <input
              style={inp} type="email" placeholder="Work email address" required
              value={form.email} onChange={e => setForm(f => ({ ...f, email:e.target.value }))}
            />
            <input
              style={inp} type="text" placeholder="Organization name (optional)"
              value={form.org} onChange={e => setForm(f => ({ ...f, org:e.target.value }))}
            />
            <button type="submit" style={{
              padding:"14px", borderRadius:8, border:"none",
              background:T.teal, color:"#fff", fontSize:15, fontWeight:700,
              cursor:"pointer", fontFamily:fB, marginTop:4,
              boxShadow:"0 6px 24px rgba(0,180,200,.4)",
            }}>
              Request Demo & Join Waitlist
            </button>
          </form>
        )}

        <p style={{ fontSize:12, color:"rgba(255,255,255,.38)", marginTop:16 }}>
          No spam. No obligations. Just a real conversation about your contact center challenges.
        </p>
      </div>
    </section>
  );
};

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{
    background:T.navy, padding:"48px 5% 32px",
    borderTop:"1px solid rgba(255,255,255,.08)",
  }}>
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:32, marginBottom:40 }}>
        <div style={{ maxWidth:280 }}>
          <Wordmark size={32} light/>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.45)", marginTop:12, lineHeight:1.7 }}>
            AI-powered triage and routing for telehealth contact centers. Built in Atlanta, GA.
          </p>
          <div style={{ display:"flex", gap:16, marginTop:20 }}>
            {[
              ["LinkedIn", "https://linkedin.com/company/triagix"],
              ["X",        "https://x.com/Triagix_AI"],
              ["Instagram","https://instagram.com/triagix_ai"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                fontSize:11, color:"rgba(255,255,255,.4)", fontFamily:fM,
                transition:"color .2s",
              }}>{label}</a>
            ))}
          </div>
        </div>

        <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
          {[
            { heading:"Product",  links:["Platform","Pricing","Integrations","Security","HIPAA"] },
            { heading:"Company",  links:["About","Contact","Blog","Careers"] },
            { heading:"Legal",    links:["Privacy Policy","Terms of Service","HIPAA Compliance","BAA"] },
          ].map(col => (
            <div key={col.heading}>
              <div style={{ fontSize:10, color:T.teal, fontFamily:fM, letterSpacing:2, marginBottom:14 }}>{col.heading}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize:13, color:"rgba(255,255,255,.42)", marginBottom:9, cursor:"pointer" }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ height:1, background:"rgba(255,255,255,.08)", marginBottom:24 }}/>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.28)" }}>
          © 2026 Exemplaryoutlook LLC DBA Triagix. All rights reserved.
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.28)" }}>
          Atlanta, Georgia · david@triagix.com · triagix.ai
        </div>
      </div>
    </div>
  </footer>
);

/* ─── ROOT APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <GlobalStyles/>
      <Nav scrolled={scrolled}/>
      <main>
        <Hero/>
        <IntegrationBanner/>
        <Problem/>
        <Solution/>
        <HowItWorks/>
        <Pricing/>
        <About/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}
