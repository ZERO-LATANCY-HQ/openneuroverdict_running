import Reveal from "../components/Reveal";

const AGENTS = {
  fact: { name: "Fact Analyzer", icon: "🔬", color: "#00d4ff" },
  hr: { name: "HR Expert", icon: "🧠", color: "#a78bfa" },
  ethics: { name: "Ethics Auditor", icon: "⚖️", color: "#34d399" },
  devil: { name: "Devil's Advocate", icon: "😈", color: "#f97316" },
};

function BiasFlag({ flag }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "5px 10px", background: "#ff6b6b0d",
      border: "1px solid #ff6b6b33", borderRadius: 5, marginBottom: 5
    }}>
      <span style={{ color: "#ff6b6b" }}>⚠</span>
      <span style={{ color: "#ff9999", fontSize: 11, fontFamily: "monospace" }}>{flag}</span>
    </div>
  );
}

export default function VerdictPage({ verdict, fairness, messages, onReplay, onNew }) {
  const isHire = verdict.decision === "Hire";
  const color = isHire ? "#00d4ff" : "#ff6b6b";

  return (
    <div style={{ maxWidth: 1000, margin: "32px auto", padding: "0 32px", animation: "fadeIn 0.5s ease" }}>
      <div style={{ fontSize: 10, color: "#484f58", letterSpacing: 4, marginBottom: 20, textAlign: "center" }}>FINAL VERDICT</div>

      {/* Main verdict card */}
      <div style={{
        background: `${color}08`, border: `1px solid ${color}33`,
        borderRadius: 12, padding: 28, marginBottom: 20, textAlign: "center"
      }}>
        <div style={{ fontSize: 40, filter: `drop-shadow(0 0 18px ${color})` }}>{isHire ? "✅" : "❌"}</div>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 26, fontWeight: 700,
          color, letterSpacing: 4, margin: "8px 0"
        }}>{verdict.decision.toUpperCase()}</div>
        <div style={{ color: "#8b949e", fontSize: 13 }}>
          Confidence: <span style={{ color: "#e6edf3", fontWeight: 700 }}>{Math.round(verdict.confidence * 100)}%</span>
        </div>
        <div style={{ margin: "14px auto 0", maxWidth: 280, height: 5, background: "#1a2030", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${verdict.confidence * 100}%`,
            background: `linear-gradient(90deg, ${color}66, ${color})`,
            borderRadius: 3, transition: "width 1.5s ease"
          }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Agent votes */}
        <div style={{ background: "#0d1117", border: "1px solid #1a2030", borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 10, color: "#484f58", letterSpacing: 3, marginBottom: 14 }}>AGENT VOTES</div>
          {messages.map((m, i) => {
            const agent = AGENTS[m.agent] || AGENTS.fact;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 15 }}>{agent.icon}</span>
                <span style={{ color: "#8b949e", fontSize: 12, flex: 1 }}>{agent.name}</span>
                <span style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 4,
                  background: m.decision === "Hire" ? "#00d4ff1a" : "#ff6b6b1a",
                  color: m.decision === "Hire" ? "#00d4ff" : "#ff6b6b",
                  fontFamily: "monospace"
                }}>{m.decision}</span>
                <span style={{ color: "#484f58", fontSize: 10 }}>{Math.round(m.confidence * 100)}%</span>
              </div>
            );
          })}
        </div>

        {/* Fairness */}
        <div style={{ background: "#0d1117", border: "1px solid #1a2030", borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 10, color: "#484f58", letterSpacing: 3, marginBottom: 14 }}>FAIRNESS SCORE</div>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{
              fontSize: 38, fontFamily: "'Space Mono', monospace", fontWeight: 700,
              color: fairness.score >= 70 ? "#34d399" : fairness.score >= 50 ? "#fbbf24" : "#f87171"
            }}>{fairness.score}</div>
            <div style={{ fontSize: 10, color: "#484f58" }}>/ 100</div>
          </div>
          <div style={{ height: 5, background: "#1a2030", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
            <div style={{
              height: "100%", width: `${fairness.score}%`,
              background: fairness.score >= 70 ? "linear-gradient(90deg, #34d39966, #34d399)" : "linear-gradient(90deg, #fbbf2466, #fbbf24)",
              borderRadius: 3, transition: "width 1.5s ease"
            }} />
          </div>
          {fairness.flags?.length > 0
            ? fairness.flags.map((f, i) => <BiasFlag key={i} flag={f} />)
            : <div style={{ color: "#34d399", fontSize: 12, fontFamily: "monospace" }}>✓ No bias flags detected</div>
          }
        </div>
      </div>

      {/* Reasons */}
      <div style={{ background: "#0d1117", border: "1px solid #1a2030", borderRadius: 10, padding: 18, marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: "#484f58", letterSpacing: 3, marginBottom: 12 }}>KEY REASONS</div>
        {(Array.isArray(verdict.reasons) ? verdict.reasons : [verdict.reasons]).map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, fontSize: 13, color: "#c9d1d9" }}>
            <span style={{ color: "#34d399" }}>✓</span> {r}
          </div>
        ))}
      </div>

      {/* Why not */}
      <div style={{
        background: "#ff6b6b06", border: "1px solid #ff6b6b1a",
        borderRadius: 10, padding: 18, marginBottom: 24
      }}>
        <div style={{ fontSize: 10, color: "#ff6b6b", letterSpacing: 3, marginBottom: 8 }}>WHY NOT THE OPPOSITE?</div>
        <div style={{ fontSize: 13, color: "#8b949e" }}>{verdict.why_not}</div>
      </div>

      <div style={{ textAlign: "center", display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={onReplay} style={{
          background: "none", border: "1px solid #30363d", color: "#8b949e",
          padding: "9px 24px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace", fontSize: 11,
          transition: "all 0.2s ease"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#a78bfa55"; e.currentTarget.style.color = "#a78bfa"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; }}
        >⟳ REPLAY DEBATE</button>
        <button onClick={onNew} style={{
          background: "linear-gradient(135deg, #00d4ff22, #a78bfa22)",
          border: "1px solid #00d4ff44", color: "#00d4ff",
          padding: "9px 24px", borderRadius: 6, cursor: "pointer", fontFamily: "monospace", fontSize: 11,
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)"
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px #00d4ff22"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
        >+ NEW CANDIDATE</button>
      </div>
    </div>
  );
}
