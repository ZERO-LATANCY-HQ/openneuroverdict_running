import { useRef, useState } from "react";
import Reveal from "../components/Reveal";

const AGENTS = [
  { name: "Fact Analyzer", icon: "🔬", color: "#00d4ff", role: "Extracts structured data", x: "4%", y: "18%" },
  { name: "HR Expert", icon: "🧠", color: "#a78bfa", role: "Evaluates candidate fit", x: "80%", y: "12%" },
  { name: "Ethics Auditor", icon: "⚖️", color: "#34d399", role: "Detects bias & fairness", x: "2%", y: "65%" },
  { name: "Devil's Advocate", icon: "😈", color: "#f97316", role: "Challenges the decision", x: "78%", y: "68%" },
];

function FloatingAgent({ agent, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      position: "absolute", left: agent.x, top: agent.y,
      animation: `float ${6 + delay}s ease-in-out ${delay}s infinite`,
      zIndex: 2, userSelect: "none"
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: "#0d1117", border: `1px solid ${hovered ? agent.color + "66" : "#1e2433"}`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
        transition: "border-color 0.3s",
        boxShadow: hovered ? `0 0 16px ${agent.color}22` : "none"
      }}>{agent.icon}</div>
      {hovered && (
        <div style={{
          position: "absolute", top: 48, left: "50%", transform: "translateX(-50%)",
          background: "#0d1117", border: "1px solid #1e2433",
          borderRadius: 6, padding: "6px 10px", whiteSpace: "nowrap",
          animation: "fadeIn 0.15s ease", zIndex: 10,
          boxShadow: "0 8px 24px #00000066"
        }}>
          <div style={{ color: agent.color, fontSize: 10, fontFamily: "monospace", fontWeight: 700, letterSpacing: 0.5 }}>{agent.name}</div>
          <div style={{ color: "#484f58", fontSize: 9, marginTop: 2, fontFamily: "monospace" }}>{agent.role}</div>
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
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
    onClick();
  };

  return (
    <button ref={btnRef} onClick={handleClick} style={{
      background: "linear-gradient(135deg, #00d4ff, #a78bfa)",
      border: "none", color: "#080c14",
      padding: "13px 44px", borderRadius: 6, cursor: "pointer",
      fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700,
      letterSpacing: 2, position: "relative", overflow: "hidden",
      transition: "opacity 0.2s, transform 0.2s",
      boxShadow: "0 4px 24px #00d4ff22"
    }}
    onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
    >
      <style>{`@keyframes ripple { to { transform: translate(-50%,-50%) scale(20); opacity: 0; } }`}</style>
      {ripples.map(r => (
        <span key={r.id} style={{
          position: "absolute", left: r.x, top: r.y, width: 6, height: 6,
          borderRadius: "50%", background: "#ffffff44",
          transform: "translate(-50%,-50%) scale(0)",
          animation: "ripple 0.6s ease-out forwards", pointerEvents: "none"
        }} />
      ))}
      {children}
    </button>
  );
}

export default function LandingPage({ onStart }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 40px 60px", position: "relative", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Subtle background glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, #00d4ff07, transparent 70%)", pointerEvents: "none" }} />

      {/* Floating agents */}
      {AGENTS.map((a, i) => <FloatingAgent key={a.name} agent={a} delay={i * 1.5} />)}

      {/* Hero */}
      <Reveal>
        <div style={{ textAlign: "center", position: "relative", zIndex: 3 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#0d1117", border: "1px solid #1e2433",
            borderRadius: 20, padding: "5px 14px", marginBottom: 28
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
            <span style={{ fontSize: 11, color: "#8b949e", fontFamily: "monospace", letterSpacing: 2 }}>MULTI-AGENT AI SYSTEM</span>
          </div>

          <h1 style={{
            fontFamily: "'Space Mono', monospace", fontSize: 44, fontWeight: 700,
            color: "#e6edf3", margin: "0 0 8px", lineHeight: 1.15, letterSpacing: -0.5
          }}>
            Hiring Decisions That
          </h1>
          <h1 style={{
            fontFamily: "'Space Mono', monospace", fontSize: 44, fontWeight: 700,
            margin: "0 0 20px", lineHeight: 1.15,
            background: "linear-gradient(90deg, #00d4ff, #a78bfa)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Explain Themselves
          </h1>

          <p style={{ color: "#6b7280", fontSize: 17, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}>
            Four specialized AI agents debate every resume in real-time — delivering transparent, bias-audited hiring decisions with full reasoning.
          </p>

          <RippleButton onClick={onStart}>START ANALYSIS →</RippleButton>
        </div>
      </Reveal>

      {/* Stats row */}
      <Reveal delay={300}>
        <div style={{
          display: "flex", justifyContent: "center", gap: 0,
          marginTop: 64, position: "relative", zIndex: 3,
          border: "1px solid #1e2433", borderRadius: 10, overflow: "hidden",
          background: "#0d1117"
        }}>
          {[
            { value: "4", label: "AI Agents" },
            { value: "100%", label: "Explainable" },
            { value: "0", label: "Black Boxes" },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: 1, padding: "20px 24px", textAlign: "center",
              borderRight: i < 2 ? "1px solid #1e2433" : "none"
            }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, color: "#e6edf3", marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#484f58", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
