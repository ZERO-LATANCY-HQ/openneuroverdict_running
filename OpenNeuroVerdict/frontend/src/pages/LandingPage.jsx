import Reveal from "../components/Reveal";

const AGENTS = [
  { name: "Fact Analyzer", icon: "🔬", color: "#00d4ff", role: "Extracts structured data" },
  { name: "HR Expert", icon: "🧠", color: "#a78bfa", role: "Evaluates candidate fit" },
  { name: "Ethics Auditor", icon: "⚖️", color: "#34d399", role: "Detects bias & fairness" },
  { name: "Devil's Advocate", icon: "😈", color: "#f97316", role: "Challenges assumptions" },
];

export default function LandingPage({ onStart }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 32px", position: "relative" }}>
      {/* Parallax background orbs */}
      <div style={{ position: "absolute", top: 100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #00d4ff11, transparent)", filter: "blur(60px)", animation: "float 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: 100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #a78bfa11, transparent)", filter: "blur(80px)", animation: "float 10s ease-in-out infinite reverse" }} />

      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#00d4ff", marginBottom: 14, animation: "fadeIn 0.8s ease" }}>
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
          <button onClick={onStart} style={{
            background: "linear-gradient(135deg, #00d4ff22, #a78bfa22)",
            border: "1px solid #00d4ff66", color: "#00d4ff",
            padding: "14px 48px", borderRadius: 8, cursor: "pointer",
            fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
            letterSpacing: 2, position: "relative", overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            animation: "fadeIn 1s ease 0.4s backwards"
          }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-2px) scale(1.02)";
            e.target.style.boxShadow = "0 8px 30px #00d4ff33";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "none";
            e.target.style.boxShadow = "none";
          }}
          >▶ START ANALYSIS</button>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 48 }}>
          {AGENTS.map((a, i) => (
            <div key={a.name} style={{
              padding: "18px 20px", background: `${a.color}08`,
              border: `1px solid ${a.color}33`, borderRadius: 10,
              display: "flex", alignItems: "center", gap: 14,
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              cursor: "pointer", position: "relative", overflow: "hidden"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
              e.currentTarget.style.borderColor = a.color;
              e.currentTarget.style.boxShadow = `0 8px 24px ${a.color}33`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.borderColor = `${a.color}33`;
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                background: `${a.color}18`, border: `1.5px solid ${a.color}55`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "rotate(360deg) scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >{a.icon}</div>
              <div>
                <div style={{ color: a.color, fontWeight: 700, fontSize: 13, fontFamily: "monospace" }}>{a.name}</div>
                <div style={{ color: "#8b949e", fontSize: 12, marginTop: 2 }}>{a.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { icon: "🔍", label: "Transparent Reasoning", desc: "Every step visible" },
            { icon: "⚖️", label: "Bias Detection", desc: "Gender, college, experience" },
            { icon: "📊", label: "Fairness Score", desc: "0–100 audit score" },
          ].map(f => (
            <div key={f.label} style={{
              padding: "16px", background: "#0d1117",
              border: "1px solid #1a2030", borderRadius: 8, textAlign: "center",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "#00d4ff44";
              e.currentTarget.style.background = "#0d111722";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.borderColor = "#1a2030";
              e.currentTarget.style.background = "#0d1117";
            }}
            >
              <div style={{ fontSize: 24, marginBottom: 8, transition: "transform 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2) rotate(10deg)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
              >{f.icon}</div>
              <div style={{ color: "#e6edf3", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
              <div style={{ color: "#484f58", fontSize: 11 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
