import Reveal from "../components/Reveal";

const AGENTS = {
  fact: { name: "Fact Analyzer", icon: "🔬", color: "#00d4ff" },
  hr: { name: "HR Expert", icon: "🧠", color: "#a78bfa" },
  ethics: { name: "Ethics Auditor", icon: "⚖️", color: "#34d399" },
  devil: { name: "Devil's Advocate", icon: "😈", color: "#f97316" },
};

export default function VerdictPage({ verdict, fairness, messages, onReplay, onNew }) {
  const isHire = verdict.decision === "Hire";
  const decisionColor = isHire ? "#34d399" : "#f87171";

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 40px", animation: "fadeIn 0.4s ease" }}>

      {/* Page title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #1e2433" }}>
        <div style={{ width: 3, height: 16, background: "linear-gradient(180deg, #00d4ff, #a78bfa)", borderRadius: 2 }} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "#e6edf3", fontWeight: 700 }}>Analysis Report</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={onReplay} style={{
            background: "none", border: "1px solid #1e2433", color: "#8b949e",
            padding: "6px 16px", borderRadius: 5, cursor: "pointer",
            fontFamily: "monospace", fontSize: 12, letterSpacing: 1,
            transition: "border-color 0.2s, color 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#a78bfa44"; e.currentTarget.style.color = "#a78bfa"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2433"; e.currentTarget.style.color = "#8b949e"; }}
          >REPLAY</button>
          <button onClick={onNew} style={{
            background: "linear-gradient(135deg, #00d4ff, #a78bfa)",
            border: "none", color: "#080c14",
            padding: "6px 16px", borderRadius: 5, cursor: "pointer",
            fontFamily: "monospace", fontSize: 12, fontWeight: 700, letterSpacing: 1,
            transition: "opacity 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >NEW ANALYSIS</button>
        </div>
      </div>

      {/* Top row: Decision + Fairness */}
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* Decision card */}
          <div style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 8, padding: "24px 28px" }}>
            <div style={{ fontSize: 11, color: "#484f58", letterSpacing: 2, fontFamily: "monospace", marginBottom: 16, textTransform: "uppercase" }}>Final Decision</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 10,
                background: `${decisionColor}12`, border: `1px solid ${decisionColor}33`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
              }}>{isHire ? "✓" : "✕"}</div>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, color: decisionColor, letterSpacing: 2 }}>
                  {verdict.decision.toUpperCase()}
                </div>
                <div style={{ fontSize: 13, color: "#484f58", fontFamily: "monospace", marginTop: 2 }}>
                  {Math.round(verdict.confidence * 100)}% weighted confidence
                </div>
              </div>
            </div>
            <div style={{ height: 4, background: "#1e2433", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${verdict.confidence * 100}%`,
                background: `linear-gradient(90deg, ${decisionColor}66, ${decisionColor})`,
                borderRadius: 2, transition: "width 1.5s ease"
              }} />
            </div>
          </div>

          {/* Fairness card */}
          <div style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 8, padding: "24px 28px" }}>
            <div style={{ fontSize: 11, color: "#484f58", letterSpacing: 2, fontFamily: "monospace", marginBottom: 16, textTransform: "uppercase" }}>Fairness Audit</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 10,
                background: "#34d39912", border: "1px solid #34d39933",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700,
                color: fairness.score >= 70 ? "#34d399" : fairness.score >= 50 ? "#fbbf24" : "#f87171"
              }}>{fairness.score}</div>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: "#e6edf3" }}>
                  {fairness.score >= 70 ? "Low Bias" : fairness.score >= 50 ? "Moderate Bias" : "High Bias"}
                </div>
                <div style={{ fontSize: 13, color: "#484f58", fontFamily: "monospace", marginTop: 2 }}>
                  {fairness.flags?.length || 0} flag{fairness.flags?.length !== 1 ? "s" : ""} detected
                </div>
              </div>
            </div>
            <div style={{ height: 4, background: "#1e2433", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${fairness.score}%`,
                background: fairness.score >= 70 ? "linear-gradient(90deg, #34d39966, #34d399)" : "linear-gradient(90deg, #fbbf2466, #fbbf24)",
                borderRadius: 2, transition: "width 1.5s ease"
              }} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Agent votes */}
      <Reveal delay={100}>
        <div style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 8, padding: "20px 24px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: "#484f58", letterSpacing: 2, fontFamily: "monospace", marginBottom: 16, textTransform: "uppercase" }}>Agent Votes</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {messages.map((m, i) => {
              const agent = AGENTS[m.agent] || AGENTS.fact;
              const vote = m.decision === "Hire" || m.decision === "Agree" || m.decision === "Analyzed";
              return (
                <div key={i} style={{ background: "#080c14", border: "1px solid #1e2433", borderRadius: 6, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ fontSize: 14 }}>{agent.icon}</span>
                    <span style={{ fontSize: 11, color: "#8b949e", fontFamily: "monospace", letterSpacing: 0.5 }}>{agent.name}</span>
                  </div>
                  <div style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: vote ? "#34d399" : "#f87171", marginBottom: 6 }}>
                    {m.decision.toUpperCase()}
                  </div>
                  <div style={{ height: 2, background: "#1e2433", borderRadius: 1, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${m.confidence * 100}%`, background: agent.color, borderRadius: 1 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#484f58", fontFamily: "monospace", marginTop: 4 }}>{Math.round(m.confidence * 100)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Reasons + Why not */}
      <Reveal delay={200}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 8, padding: "20px 24px" }}>
            <div style={{ fontSize: 11, color: "#484f58", letterSpacing: 2, fontFamily: "monospace", marginBottom: 14, textTransform: "uppercase" }}>Key Reasons</div>
            {(Array.isArray(verdict.reasons) ? verdict.reasons : [verdict.reasons]).map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 14, color: "#9ca3af", lineHeight: 1.7, fontFamily: "system-ui, sans-serif" }}>
                <span style={{ color: "#34d399", flexShrink: 0, marginTop: 1 }}>→</span> {r}
              </div>
            ))}
          </div>
          <div style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 8, padding: "20px 24px" }}>
            <div style={{ fontSize: 11, color: "#484f58", letterSpacing: 2, fontFamily: "monospace", marginBottom: 14, textTransform: "uppercase" }}>Counter Argument</div>
            <div style={{ fontSize: 14, color: "#9ca3af", lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}>{verdict.why_not}</div>
          </div>
        </div>
      </Reveal>

      {/* Bias flags */}
      {fairness.flags?.length > 0 && (
        <Reveal delay={300}>
          <div style={{ background: "#0d1117", border: "1px solid #f8717122", borderRadius: 8, padding: "16px 24px" }}>
            <div style={{ fontSize: 11, color: "#f87171", letterSpacing: 2, fontFamily: "monospace", marginBottom: 12, textTransform: "uppercase" }}>Bias Flags</div>
            {fairness.flags.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13, color: "#9ca3af", fontFamily: "monospace" }}>
                <span style={{ color: "#f87171" }}>⚠</span> {f}
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
