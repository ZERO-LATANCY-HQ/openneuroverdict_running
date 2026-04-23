import { useRef, useState } from "react";
import Reveal from "../components/Reveal";

const AGENTS = [
  { name: "Fact Analyzer", icon: "🔬", color: "#00d4ff", role: "Extracts structured data from resume", x: "8%", y: "22%" },
  { name: "HR Expert", icon: "🧠", color: "#a78bfa", role: "Evaluates candidate-job fit", x: "78%", y: "15%" },
  { name: "Ethics Auditor", icon: "⚖️", color: "#34d399", role: "Detects bias & fairness issues", x: "5%", y: "68%" },
  { name: "Devil's Advocate", icon: "😈", color: "#f97316", role: "Challenges the HR decision", x: "75%", y: "72%" },
];

function FloatingAgent({ agent, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      position: "absolute", left: agent.x, top: agent.y,
      animation: `float ${5 + delay}s ease-in-out ${delay}s infinite`,
      zIndex: 2, cursor: "default"
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      {/* Icon bubble */}
      <div style={{
        width: 46, height: 46, borderRadius: "50%",
        background: `${agent.color}18`, border: `1.5px solid ${agent.color}${hovered ? "99" : "44"}`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        boxShadow: hovered ? `0 0 20px ${agent.color}55` : `0 0 8px ${agent.color}22`,
        transition: "all 0.3s ease",
        transform: hovered ? "scale(1.15)" : "scale(1)"
      }}>{agent.icon}</div>

      {/* Info tooltip on hover */}
      {hovered && (
        <div style={{
          position: "absolute", top: 54, left: "50%", transform: "translateX(-50%)",
          background: "#0d1117", border: `1px solid ${agent.color}55`,
          borderRadius: 8, padding: "8px 12px", whiteSpace: "nowrap",
          animation: "fadeIn 0.2s ease", zIndex: 10,
          boxShadow: `0 4px 20px ${agent.color}22`
        }}>
          <div style={{ color: agent.color, fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>{agent.name}</div>
          <div style={{ color: "#8b949e", fontSize: 10, marginTop: 2 }}>{agent.role}</div>
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 600);
    onClick();
  };

  return (
    <button ref={btnRef} onClick={handleClick} style={{
      background: "linear-gradient(135deg, #00d4ff22, #a78bfa22)",
      border: "1px solid #00d4ff66", color: "#00d4ff",
      padding: "14px 48px", borderRadius: 8, cursor: "pointer",
      fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
      letterSpacing: 2, position: "relative", overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      animation: "fadeIn 1s ease 0.4s backwards"
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 30px #00d4ff33"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {ripples.map(r => (
        <span key={r.id} style={{
          position: "absolute", left: r.x, top: r.y,
          width: 8, height: 8, borderRadius: "50%",
          background: "#00d4ff88", transform: "translate(-50%,-50%) scale(0)",
          animation: "ripple 0.6s ease-out forwards", pointerEvents: "none"
        }} />
      ))}
      {children}
    </button>
  );
}

export default function LandingPage({ onStart }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 32px", position: "relative" }}>
      <style>{`
        @keyframes ripple { to { transform: translate(-50%,-50%) scale(18); opacity: 0; } }
      `}</style>

      {/* Parallax background orbs */}
      <div style={{ position: "absolute", top: 80, left: -120, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, #00d4ff0d, transparent)", filter: "blur(60px)", animation: "float 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 80, right: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #a78bfa0d, transparent)", filter: "blur(80px)", animation: "float 10s ease-in-out infinite reverse", pointerEvents: "none" }} />

      {/* Floating agent info bubbles */}
      {AGENTS.map((a, i) => <FloatingAgent key={a.name} agent={a} delay={i * 1.2} />)}

      {/* Hero content */}
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 52, position: "relative", zIndex: 3 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#00d4ff", marginBottom: 14 }}>
            TRANSPARENT · UNBIASED · EXPLAINABLE
          </div>
          <h1 style={{
            fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700,
            color: "#e6edf3", margin: "0 0 16px", lineHeight: 1.2,
            animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1)"
          }}>
            AI Hiring That{" "}
            <span style={{
              background: "linear-gradient(90deg, #00d4ff, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "shimmer 3s ease-in-out infinite"
            }}>Debates Itself</span>
          </h1>
          <p style={{ color: "#8b949e", fontSize: 15, maxWidth: 520, margin: "0 auto 32px", animation: "fadeIn 1s ease 0.2s backwards" }}>
            4 specialized AI agents analyze, argue, and vote on every hiring decision — fully transparent, fully explainable.
          </p>
          <RippleButton onClick={onStart}>▶ START ANALYSIS</RippleButton>
        </div>
      </Reveal>

      {/* Feature cards */}
      <Reveal delay={300}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, position: "relative", zIndex: 3 }}>
          {[
            { icon: "🔍", label: "Transparent Reasoning", desc: "Every step visible" },
            { icon: "⚖️", label: "Bias Detection", desc: "Gender, college, experience" },
            { icon: "📊", label: "Fairness Score", desc: "0–100 audit score" },
          ].map(f => (
            <div key={f.label} style={{
              padding: "16px", background: "#0d1117",
              border: "1px solid #1a2030", borderRadius: 8, textAlign: "center",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "default"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#00d4ff33"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#1a2030"; }}
            >
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ color: "#e6edf3", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
              <div style={{ color: "#484f58", fontSize: 11 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
