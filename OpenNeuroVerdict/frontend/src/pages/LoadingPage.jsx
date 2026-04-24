import { useEffect, useState } from "react";

const STEPS = [
  "Initializing agents...",
  "Extracting candidate facts...",
  "Running HR evaluation...",
  "Ethics audit in progress...",
  "Devil's advocate challenging...",
  "Computing final verdict...",
];

const AGENTS = [
  { icon: "🔬", name: "Fact Analyzer", color: "#06b6d4" },
  { icon: "🧠", name: "HR Expert", color: "#6366f1" },
  { icon: "⚖️", name: "Ethics Auditor", color: "#10b981" },
  { icon: "😈", name: "Devil's Advocate", color: "#f59e0b" },
];

const THOUGHTS = [
  ["Scanning resume structure...", "Parsing education history...", "Extracting skill keywords...", "Mapping experience timeline..."],
  ["Comparing JD requirements...", "Scoring technical fit...", "Evaluating leadership signals...", "Calculating hire probability..."],
  ["Checking for gender bias...", "Auditing college prestige bias...", "Reviewing language neutrality...", "Generating fairness flags..."],
  ["Challenging HR assumptions...", "Finding weak points...", "Building counter-argument...", "Stress-testing the decision..."],
];

function AgentCard({ agent, thoughts, active, done }) {
  const [thoughtIdx, setThoughtIdx] = useState(0);
  useEffect(() => {
    if (!active || done) return;
    const iv = setInterval(() => setThoughtIdx(i => (i + 1) % thoughts.length), 1400);
    return () => clearInterval(iv);
  }, [active, done]);

  return (
    <div style={{
      padding: "14px 16px",
      background: active ? `${agent.color}0a` : done ? "#0f172a" : "#080d18",
      border: `1px solid ${active ? agent.color + "55" : done ? agent.color + "22" : "#1e293b"}`,
      borderRadius: 10, marginBottom: 10,
      transition: "all 0.4s ease",
      boxShadow: active ? `0 0 24px ${agent.color}22` : "none"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
          background: `${agent.color}15`, border: `1.5px solid ${agent.color}${active ? "88" : "33"}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
          animation: active ? "agentPulse 1.5s ease-in-out infinite" : "none",
          boxShadow: active ? `0 0 16px ${agent.color}55` : "none",
        }}>{agent.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: active ? agent.color : done ? "#64748b" : "#334155", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 600, transition: "color 0.3s" }}>
            {agent.name}
          </div>
          <div style={{
            color: active ? "#94a3b8" : done ? "#10b98177" : "#1e293b",
            fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginTop: 2,
            overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
            transition: "color 0.3s"
          }}>
            {done ? "✓ Complete" : active ? thoughts[thoughtIdx] : "Waiting..."}
          </div>
        </div>
        {active && (
          <div style={{ display: "flex", gap: 3 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: agent.color, animation: `dotBounce 0.9s ease-in-out ${i*0.2}s infinite` }} />
            ))}
          </div>
        )}
        {done && <span style={{ color: "#10b981", fontSize: 16 }}>✓</span>}
      </div>
      {active && (
        <div style={{ marginTop: 10, height: 2, background: "#1e293b", borderRadius: 1, overflow: "hidden" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${agent.color}44, ${agent.color})`, borderRadius: 1, animation: "progressScan 1.5s ease-in-out infinite" }} />
        </div>
      )}
    </div>
  );
}

export default function LoadingPage({ step }) {
  const [particles] = useState(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 4 + 2, delay: Math.random() * 4, duration: Math.random() * 4 + 4
    }))
  );

  const activeAgentIdx = Math.min(Math.floor(step * 0.8), 3);
  const pct = Math.round((step / (STEPS.length - 1)) * 100);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>

      {/* LEFT */}
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#06b6d4", letterSpacing: 3, marginBottom: 6 }}>PROCESSING</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: -0.5 }}>Agents Deliberating</div>
          <div style={{ fontSize: 14, color: "#475569", marginTop: 4, fontFamily: "'Inter', sans-serif" }}>Running multi-agent debate pipeline</div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #0f172a, #0a0f1e)", border: "1px solid #1e293b", borderRadius: 12, padding: "20px 20px", marginBottom: 20 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              marginBottom: i < STEPS.length - 1 ? 14 : 0,
              color: i < step ? "#10b981" : i === step ? "#f1f5f9" : "#1e293b",
              fontSize: 14, fontFamily: "'Inter', sans-serif", fontWeight: i === step ? 600 : 400,
              transition: "color 0.4s"
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, width: 16, flexShrink: 0 }}>
                {i < step ? "✓" : i === step ? "▶" : "·"}
              </span>
              <span>{s}</span>
              {i === step && (
                <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: "#06b6d4", animation: `dotBounce 0.8s ease-in-out ${j*0.15}s infinite` }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: "linear-gradient(90deg, #6366f1, #06b6d4, #10b981)",
            borderRadius: 3, transition: "width 0.6s ease"
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>0%</span>
          <span style={{ fontSize: 12, color: "#06b6d4", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{pct}%</span>
          <span style={{ fontSize: 12, color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>100%</span>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ animation: "fadeIn 0.4s ease 0.2s backwards" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#6366f1", letterSpacing: 3, marginBottom: 6 }}>AGENT STATUS</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: -0.5 }}>Live Activity</div>
        </div>

        {/* Orbit animation */}
        <div style={{ position: "relative", height: 140, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size, borderRadius: "50%",
              background: ["#6366f1","#06b6d4","#10b981","#f59e0b"][p.id % 4],
              animation: `particleFade ${p.duration}s ease-in-out ${p.delay}s infinite`, opacity: 0
            }} />
          ))}
          <div style={{ position: "relative", width: 100, height: 100 }}>
            {[
              { inset: 0, color: "#6366f1", speed: "5s", size: 8 },
              { inset: 12, color: "#06b6d4", speed: "3.5s", size: 7, reverse: true },
              { inset: 24, color: "#10b981", speed: "2.5s", size: 6 },
            ].map((ring, i) => (
              <div key={i} style={{
                position: "absolute", inset: ring.inset, borderRadius: "50%",
                border: `1px solid ${ring.color}33`,
                animation: `orbitSpin ${ring.speed} linear infinite ${ring.reverse ? "reverse" : ""}`
              }}>
                <div style={{ position: "absolute", top: -ring.size/2, left: "50%", transform: "translateX(-50%)", width: ring.size, height: ring.size, borderRadius: "50%", background: ring.color, boxShadow: `0 0 8px ${ring.color}` }} />
              </div>
            ))}
            <div style={{
              position: "absolute", inset: 36, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#0f172a", border: "1px solid #1e293b", fontSize: 22
            }}>⚡</div>
          </div>
        </div>

        {AGENTS.map((agent, i) => (
          <AgentCard key={agent.name} agent={agent} thoughts={THOUGHTS[i]}
            active={i === activeAgentIdx && step < STEPS.length - 1}
            done={i < activeAgentIdx || step >= STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
