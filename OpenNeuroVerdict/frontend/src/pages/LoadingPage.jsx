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
  { icon: "🔬", name: "Fact Analyzer", color: "#00d4ff" },
  { icon: "🧠", name: "HR Expert", color: "#a78bfa" },
  { icon: "⚖️", name: "Ethics Auditor", color: "#34d399" },
  { icon: "😈", name: "Devil's Advocate", color: "#f97316" },
];

const THOUGHTS = [
  ["Scanning resume structure...", "Parsing education history...", "Extracting skill keywords...", "Mapping experience timeline..."],
  ["Comparing JD requirements...", "Scoring technical fit...", "Evaluating leadership signals...", "Calculating hire probability..."],
  ["Checking for gender bias...", "Auditing college prestige bias...", "Reviewing language neutrality...", "Generating fairness flags..."],
  ["Challenging HR assumptions...", "Finding weak points...", "Building counter-argument...", "Stress-testing the decision..."],
];

function AgentThinkingCard({ agent, thoughts, active, done }) {
  const [thoughtIdx, setThoughtIdx] = useState(0);

  useEffect(() => {
    if (!active || done) return;
    const iv = setInterval(() => setThoughtIdx(i => (i + 1) % thoughts.length), 1200);
    return () => clearInterval(iv);
  }, [active, done]);

  return (
    <div style={{
      padding: "12px 14px",
      background: active ? `${agent.color}0d` : done ? "#0d111788" : "#0a0e1a",
      border: `1px solid ${active ? agent.color + "55" : done ? agent.color + "22" : "#1a2030"}`,
      borderRadius: 10, marginBottom: 8,
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      transform: active ? "scale(1.02)" : "scale(1)",
      boxShadow: active ? `0 4px 20px ${agent.color}22` : "none"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
          background: `${agent.color}18`, border: `1.5px solid ${agent.color}${active ? "99" : "33"}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          animation: active ? "agentPulse 1.5s ease-in-out infinite" : "none",
          boxShadow: active ? `0 0 12px ${agent.color}55` : "none",
          transition: "all 0.3s"
        }}>{agent.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: active ? agent.color : "#484f58", fontSize: 11, fontFamily: "monospace", fontWeight: 700, transition: "color 0.3s" }}>
            {agent.name}
          </div>
          <div style={{
            color: active ? "#c9d1d9" : done ? "#34d39988" : "#2d333b",
            fontSize: 10, fontFamily: "monospace", marginTop: 2,
            overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
            transition: "color 0.3s"
          }}>
            {done ? "✓ Complete" : active ? thoughts[thoughtIdx] : "Waiting..."}
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          {done
            ? <span style={{ color: "#34d399", fontSize: 14 }}>✓</span>
            : active
              ? <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 4, height: 4, borderRadius: "50%", background: agent.color,
                      animation: `dotBounce 1s ease-in-out ${i * 0.2}s infinite`
                    }} />
                  ))}
                </div>
              : <span style={{ color: "#2d333b", fontSize: 14 }}>·</span>
          }
        </div>
      </div>
      {active && (
        <div style={{ marginTop: 8, height: 2, background: "#1a2030", borderRadius: 1, overflow: "hidden" }}>
          <div style={{
            height: "100%", background: `linear-gradient(90deg, ${agent.color}44, ${agent.color})`,
            borderRadius: 1, animation: "progressScan 1.5s ease-in-out infinite"
          }} />
        </div>
      )}
    </div>
  );
}

export default function LoadingPage({ step }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 12 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, delay: Math.random() * 3, duration: Math.random() * 4 + 3
    })));
  }, []);

  const activeAgentIdx = Math.min(Math.floor(step * 0.8), 3);

  return (
    <div style={{
      maxWidth: 900, margin: "40px auto", padding: "0 32px",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start"
    }}>
      <style>{`
        @keyframes agentPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes dotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes progressScan { 0%{width:0%;margin-left:0} 50%{width:60%;margin-left:20%} 100%{width:0%;margin-left:100%} }
        @keyframes orbitSpin { to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes particleFade { 0%,100%{opacity:0;transform:translateY(0)} 50%{opacity:1;transform:translateY(-20px)} }
      `}</style>

      {/* LEFT — Steps progress */}
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00d4ff", letterSpacing: 3, marginBottom: 4 }}>
            PROCESSING
          </div>
          <div style={{ fontSize: 10, color: "#484f58" }}>Running multi-agent debate pipeline</div>
        </div>

        <div style={{ background: "#0d1117", border: "1px solid #1a2030", borderRadius: 10, padding: 16, marginBottom: 16 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: i < STEPS.length - 1 ? 10 : 0,
              color: i < step ? "#34d399" : i === step ? "#c9d1d9" : "#2d333b",
              fontSize: 11, fontFamily: "monospace",
              transition: "color 0.4s ease"
            }}>
              <span style={{ fontSize: 12, transition: "all 0.3s" }}>
                {i < step ? "✓" : i === step ? "▶" : "·"}
              </span>
              <span>{s}</span>
              {i === step && (
                <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                  {[0, 1, 2].map(j => (
                    <div key={j} style={{
                      width: 3, height: 3, borderRadius: "50%", background: "#00d4ff",
                      animation: `dotBounce 0.8s ease-in-out ${j * 0.15}s infinite`
                    }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div style={{ height: 3, background: "#1a2030", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${(step / (STEPS.length - 1)) * 100}%`,
            background: "linear-gradient(90deg, #00d4ff, #a78bfa)",
            borderRadius: 2, transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)"
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 9, color: "#484f58", fontFamily: "monospace" }}>0%</span>
          <span style={{ fontSize: 9, color: "#00d4ff", fontFamily: "monospace" }}>{Math.round((step / (STEPS.length - 1)) * 100)}%</span>
          <span style={{ fontSize: 9, color: "#484f58", fontFamily: "monospace" }}>100%</span>
        </div>
      </div>

      {/* RIGHT — Agent activity panel */}
      <div style={{ animation: "fadeIn 0.4s ease 0.2s backwards" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#a78bfa", letterSpacing: 3, marginBottom: 4 }}>
            AGENT STATUS
          </div>
          <div style={{ fontSize: 10, color: "#484f58" }}>Live agent activity feed</div>
        </div>

        {/* Central orbit animation */}
        <div style={{ position: "relative", height: 100, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Particles */}
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size, borderRadius: "50%",
              background: ["#00d4ff", "#a78bfa", "#34d399", "#f97316"][p.id % 4],
              animation: `particleFade ${p.duration}s ease-in-out ${p.delay}s infinite`,
              opacity: 0
            }} />
          ))}

          {/* Orbit rings */}
          <div style={{ position: "relative", width: 80, height: 80 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid #00d4ff22", animation: "orbitSpin 4s linear infinite"
            }}>
              <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#00d4ff" }} />
            </div>
            <div style={{
              position: "absolute", inset: 10, borderRadius: "50%",
              border: "1px solid #a78bfa22", animation: "orbitSpin 3s linear infinite reverse"
            }}>
              <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, borderRadius: "50%", background: "#a78bfa" }} />
            </div>
            <div style={{
              position: "absolute", inset: 20, borderRadius: "50%",
              border: "1px solid #34d39922", animation: "orbitSpin 2s linear infinite"
            }}>
              <div style={{ position: "absolute", top: -2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#34d399" }} />
            </div>
            <div style={{
              position: "absolute", inset: 30, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#0a0e1a", border: "1px solid #1a2030", fontSize: 18
            }}>⚡</div>
          </div>
        </div>

        {/* Agent cards */}
        {AGENTS.map((agent, i) => (
          <AgentThinkingCard
            key={agent.name}
            agent={agent}
            thoughts={THOUGHTS[i]}
            active={i === activeAgentIdx && step < STEPS.length - 1}
            done={i < activeAgentIdx || step >= STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
