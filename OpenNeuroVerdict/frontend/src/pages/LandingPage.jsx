import { useRef, useState, useEffect } from "react";
import Reveal from "../components/Reveal";

const AGENTS = [
  { name: "Fact Analyzer", icon: "🔬", color: "#06b6d4", role: "Extracts structured data from resume", x: "3%", y: "15%" },
  { name: "HR Expert", icon: "🧠", color: "#6366f1", role: "Evaluates candidate-job fit", x: "79%", y: "10%" },
  { name: "Ethics Auditor", icon: "⚖️", color: "#10b981", role: "Detects bias & fairness issues", x: "1%", y: "62%" },
  { name: "Devil's Advocate", icon: "😈", color: "#f59e0b", role: "Challenges the HR decision", x: "77%", y: "65%" },
];

const FEATURES = [
  { icon: "🔍", label: "Transparent Reasoning", desc: "Every agent step is visible and logged" },
  { icon: "⚖️", label: "Bias Detection", desc: "Gender, college prestige, experience bias" },
  { icon: "📊", label: "Fairness Score", desc: "0–100 audit score with detailed flags" },
  { icon: "🗳️", label: "Confidence Voting", desc: "Weighted multi-agent decision system" },
];

function FloatingAgent({ agent, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      position: "absolute", left: agent.x, top: agent.y,
      animation: `floatX ${7 + delay}s ease-in-out ${delay}s infinite`,
      zIndex: 2, userSelect: "none"
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: `linear-gradient(135deg, ${agent.color}18, ${agent.color}08)`,
        border: `1px solid ${hovered ? agent.color + "88" : agent.color + "33"}`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        transition: "all 0.3s", backdropFilter: "blur(8px)",
        boxShadow: hovered ? `0 0 24px ${agent.color}44, 0 0 48px ${agent.color}22` : `0 0 12px ${agent.color}11`
      }}>{agent.icon}</div>
      {hovered && (
        <div style={{
          position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)",
          background: "#0f172a", border: `1px solid ${agent.color}44`,
          borderRadius: 8, padding: "8px 14px", whiteSpace: "nowrap",
          animation: "fadeIn 0.15s ease", zIndex: 10,
          boxShadow: `0 8px 32px #00000088, 0 0 0 1px ${agent.color}22`
        }}>
          <div style={{ color: agent.color, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{agent.name}</div>
          <div style={{ color: "#475569", fontSize: 11, marginTop: 3, fontFamily: "'Inter', sans-serif" }}>{agent.role}</div>
        </div>
      )}
    </div>
  );
}

function RippleButton({ onClick, children }) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
    onClick();
  };
  return (
    <button ref={btnRef} onClick={handleClick} style={{
      background: "linear-gradient(135deg, #6366f1, #06b6d4)",
      border: "none", color: "#fff",
      padding: "15px 52px", borderRadius: 10, cursor: "pointer",
      fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700,
      letterSpacing: 0.5, position: "relative", overflow: "hidden",
      transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 4px 32px #6366f144, 0 0 0 1px #6366f133"
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px #6366f166, 0 0 0 1px #6366f155"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 32px #6366f144, 0 0 0 1px #6366f133"; }}
    >
      {ripples.map(r => (
        <span key={r.id} style={{
          position: "absolute", left: r.x, top: r.y, width: 8, height: 8,
          borderRadius: "50%", background: "#ffffff55",
          transform: "translate(-50%,-50%) scale(0)",
          animation: "ripple 0.7s ease-out forwards", pointerEvents: "none"
        }} />
      ))}
      {children}
    </button>
  );
}

export default function LandingPage({ onStart }) {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* Animated grid background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
        animation: "gridMove 8s linear infinite"
      }} />

      {/* Large glow orbs */}
      <div style={{ position: "absolute", top: "-10%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #6366f10a, transparent 70%)", pointerEvents: "none", animation: "glowPulse 4s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "0%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #06b6d408, transparent 70%)", pointerEvents: "none", animation: "glowPulse 5s ease-in-out 1s infinite" }} />
      <div style={{ position: "absolute", top: "40%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #10b98106, transparent 70%)", pointerEvents: "none" }} />

      {/* Floating agents */}
      {AGENTS.map((a, i) => <FloatingAgent key={a.name} agent={a} delay={i * 1.4} />)}

      {/* Hero section */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "100px 48px 80px", position: "relative", zIndex: 3, textAlign: "center" }}>
        <Reveal>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#0f172a", border: "1px solid #1e293b",
            borderRadius: 24, padding: "6px 18px", marginBottom: 32
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b98188" }} />
            <span style={{ fontSize: 12, color: "#64748b", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2 }}>MULTI-AGENT AI HIRING SYSTEM</span>
          </div>

          <h1 style={{
            fontFamily: "'Inter', sans-serif", fontSize: 58, fontWeight: 800,
            color: "#f1f5f9", margin: "0 0 10px", lineHeight: 1.1, letterSpacing: -2
          }}>
            Hiring Decisions That
          </h1>
          <h1 style={{
            fontFamily: "'Inter', sans-serif", fontSize: 58, fontWeight: 800,
            margin: "0 0 24px", lineHeight: 1.1, letterSpacing: -2,
            background: "linear-gradient(135deg, #6366f1, #06b6d4, #10b981)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite"
          }}>
            Explain Themselves
          </h1>

          <p style={{ color: "#64748b", fontSize: 18, maxWidth: 560, margin: "0 auto 44px", lineHeight: 1.8, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
            Four specialized AI agents debate every resume in real-time — delivering transparent, bias-audited hiring decisions with complete reasoning trails.
          </p>

          <RippleButton onClick={onStart}>Start Analysis →</RippleButton>
        </Reveal>

        {/* Stats */}
        <Reveal delay={200}>
          <div style={{
            display: "flex", justifyContent: "center", marginTop: 72,
            border: "1px solid #1e293b", borderRadius: 16, overflow: "hidden",
            background: "linear-gradient(135deg, #0f172a, #0a0f1e)"
          }}>
            {[
              { value: "4", label: "AI Agents", color: "#6366f1" },
              { value: "100%", label: "Explainable", color: "#06b6d4" },
              { value: "3x", label: "Model Fallback", color: "#10b981" },
              { value: "0", label: "Black Boxes", color: "#f59e0b" },
            ].map((s, i) => (
              <div key={s.label} style={{
                flex: 1, padding: "28px 20px", textAlign: "center",
                borderRight: i < 3 ? "1px solid #1e293b" : "none"
              }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 6, letterSpacing: -1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#475569", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Feature cards */}
        <Reveal delay={400}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={f.label} style={{
                padding: "22px 20px", textAlign: "left",
                background: "linear-gradient(135deg, #0f172a, #0a0f1e)",
                border: "1px solid #1e293b", borderRadius: 12,
                animation: `borderFlow 6s ease-in-out ${i * 1.5}s infinite`
              }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>{f.label}</div>
                <div style={{ color: "#475569", fontSize: 13, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
