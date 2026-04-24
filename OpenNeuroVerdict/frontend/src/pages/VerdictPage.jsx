import Reveal from "../components/Reveal";

const AGENTS = {
  fact: { name: "Fact Analyzer", icon: "🔬", color: "#06b6d4" },
  hr: { name: "HR Expert", icon: "🧠", color: "#6366f1" },
  ethics: { name: "Ethics Auditor", icon: "⚖️", color: "#10b981" },
  devil: { name: "Devil's Advocate", icon: "😈", color: "#f59e0b" },
};

const CARD = { background: "linear-gradient(135deg, #0f172a, #0a0f1e)", border: "1px solid #1e293b", borderRadius: 12 };
const LABEL = { fontSize: 11, color: "#475569", letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace", marginBottom: 16, textTransform: "uppercase" };

export default function VerdictPage({ verdict, fairness, messages, onReplay, onNew }) {
  const isHire = verdict.decision === "Hire";
  const dc = isHire ? "#10b981" : "#ef4444";

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "40px 48px", animation: "fadeIn 0.4s ease" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #1e293b" }}>
        <div style={{ width: 4, height: 20, background: "linear-gradient(180deg, #6366f1, #06b6d4)", borderRadius: 2 }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: "#f1f5f9", fontWeight: 700, letterSpacing: -0.5 }}>Analysis Report</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button onClick={onReplay} style={{
            background: "none", border: "1px solid #1e293b", color: "#64748b",
            padding: "8px 20px", borderRadius: 8, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
            transition: "all 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f155"; e.currentTarget.style.color = "#a5b4fc"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
          >Replay Debate</button>
          <button onClick={onNew} style={{
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            border: "none", color: "#fff", padding: "8px 20px", borderRadius: 8, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
            transition: "all 0.2s", boxShadow: "0 4px 20px #6366f133"
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
          >New Analysis</button>
        </div>
      </div>

      {/* Decision + Fairness */}
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ ...CARD, padding: "28px 32px" }}>
            <div style={LABEL}>Final Decision</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 14,
                background: `${dc}12`, border: `1.5px solid ${dc}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, boxShadow: `0 0 24px ${dc}22`
              }}>{isHire ? "✓" : "✕"}</div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, fontWeight: 800, color: dc, letterSpacing: -1 }}>
                  {verdict.decision.toUpperCase()}
                </div>
                <div style={{ fontSize: 13, color: "#475569", fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>
                  {Math.round(verdict.confidence * 100)}% weighted confidence
                </div>
              </div>
            </div>
            <div style={{ height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${verdict.confidence * 100}%`, background: `linear-gradient(90deg, ${dc}66, ${dc})`, borderRadius: 3, transition: "width 1.5s ease" }} />
            </div>
          </div>

          <div style={{ ...CARD, padding: "28px 32px" }}>
            <div style={LABEL}>Fairness Audit</div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 14,
                background: "#10b98112", border: "1.5px solid #10b98144",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 800,
                color: fairness.score >= 70 ? "#10b981" : fairness.score >= 50 ? "#f59e0b" : "#ef4444",
                boxShadow: "0 0 24px #10b98122"
              }}>{fairness.score}</div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, color: "#f1f5f9", letterSpacing: -0.5 }}>
                  {fairness.score >= 70 ? "Low Bias" : fairness.score >= 50 ? "Moderate Bias" : "High Bias"}
                </div>
                <div style={{ fontSize: 13, color: "#475569", fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>
                  {fairness.flags?.length || 0} flag{fairness.flags?.length !== 1 ? "s" : ""} detected
                </div>
              </div>
            </div>
            <div style={{ height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${fairness.score}%`,
                background: fairness.score >= 70 ? "linear-gradient(90deg, #10b98166, #10b981)" : "linear-gradient(90deg, #f59e0b66, #f59e0b)",
                borderRadius: 3, transition: "width 1.5s ease"
              }} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Agent votes */}
      <Reveal delay={100}>
        <div style={{ ...CARD, padding: "24px 28px", marginBottom: 16 }}>
          <div style={LABEL}>Agent Votes</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {messages.map((m, i) => {
              const agent = AGENTS[m.agent] || AGENTS.fact;
              const pos = ["Hire","Agree","Analyzed"].includes(m.decision);
              return (
                <div key={i} style={{ background: "#080d18", border: "1px solid #1e293b", borderRadius: 10, padding: "16px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>{agent.icon}</span>
                    <span style={{ fontSize: 12, color: "#64748b", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{agent.name}</span>
                  </div>
                  <div style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: pos ? "#10b981" : "#ef4444", marginBottom: 8 }}>
                    {m.decision.toUpperCase()}
                  </div>
                  <div style={{ height: 3, background: "#1e293b", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
                    <div style={{ height: "100%", width: `${m.confidence * 100}%`, background: agent.color, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 12, color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>{Math.round(m.confidence * 100)}% conf.</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Reasons + Counter */}
      <Reveal delay={200}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ ...CARD, padding: "24px 28px" }}>
            <div style={LABEL}>Key Reasons</div>
            {(Array.isArray(verdict.reasons) ? verdict.reasons : [verdict.reasons]).map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, fontSize: 15, color: "#94a3b8", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
                <span style={{ color: "#10b981", flexShrink: 0, marginTop: 2, fontWeight: 700 }}>→</span> {r}
              </div>
            ))}
          </div>
          <div style={{ ...CARD, padding: "24px 28px" }}>
            <div style={LABEL}>Counter Argument</div>
            <div style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>{verdict.why_not}</div>
          </div>
        </div>
      </Reveal>

      {/* Bias flags */}
      {fairness.flags?.length > 0 && (
        <Reveal delay={300}>
          <div style={{ ...CARD, padding: "20px 28px", borderColor: "#ef444422" }}>
            <div style={{ ...LABEL, color: "#ef4444" }}>Bias Flags</div>
            {fairness.flags.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 14, color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>
                <span style={{ color: "#ef4444", fontSize: 16 }}>⚠</span> {f}
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
