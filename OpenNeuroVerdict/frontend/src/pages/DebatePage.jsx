import { useState, useEffect, useRef } from "react";

const AGENTS = {
  fact: { name: "Fact Analyzer", icon: "🔬", color: "#06b6d4" },
  hr: { name: "HR Expert", icon: "🧠", color: "#6366f1" },
  ethics: { name: "Ethics Auditor", icon: "⚖️", color: "#10b981" },
  devil: { name: "Devil's Advocate", icon: "😈", color: "#f59e0b" },
};

function TypingText({ text, active, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    idx.current = 0; setDisplayed("");
    const iv = setInterval(() => {
      if (idx.current < text.length) setDisplayed(text.slice(0, ++idx.current));
      else { clearInterval(iv); onDone?.(); }
    }, 12);
    return () => clearInterval(iv);
  }, [text, active]);
  return <span>{displayed}{active && displayed.length < text.length && <span style={{ animation: "blink 1s infinite", color: "#06b6d4" }}>▌</span>}</span>;
}

function AgentBubble({ msg, active, onDone }) {
  const agent = AGENTS[msg.agent] || AGENTS.fact;
  const isPositive = ["Hire","Agree","Analyzed"].includes(msg.decision);
  return (
    <div style={{ marginBottom: 20, animation: "slideIn 0.35s ease forwards" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
          background: `${agent.color}15`, border: `1.5px solid ${active ? agent.color + "99" : agent.color + "33"}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          boxShadow: active ? `0 0 16px ${agent.color}44` : "none", transition: "all 0.3s"
        }}>{agent.icon}</div>
        <span style={{ color: agent.color, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14 }}>{agent.name}</span>
        <div style={{ height: 1, flex: 1, background: "#1e293b" }} />
        <span style={{
          fontSize: 11, padding: "3px 10px", borderRadius: 4,
          background: isPositive ? "#10b9810d" : "#ef44440d",
          color: isPositive ? "#10b981" : "#ef4444",
          border: `1px solid ${isPositive ? "#10b98122" : "#ef444422"}`,
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, fontWeight: 600
        }}>{msg.decision.toUpperCase()}</span>
        <span style={{ fontSize: 12, color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>{Math.round(msg.confidence * 100)}%</span>
      </div>

      <div style={{
        marginLeft: 46, background: "linear-gradient(135deg, #0f172a, #0a0f1e)",
        border: "1px solid #1e293b", borderLeft: `3px solid ${agent.color}66`,
        borderRadius: "0 10px 10px 10px", padding: "14px 18px",
        color: "#94a3b8", fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.8
      }}>
        <TypingText text={msg.reason} active={active} onDone={onDone} />
      </div>

      <div style={{ marginLeft: 46, marginTop: 8, height: 3, background: "#1e293b", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${msg.confidence * 100}%`,
          background: `linear-gradient(90deg, ${agent.color}44, ${agent.color})`,
          borderRadius: 2, transition: "width 1.2s ease"
        }} />
      </div>
    </div>
  );
}

export default function DebatePage({ messages, onComplete }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [activeIdx]);

  const handleDone = (i) => {
    if (i < messages.length - 1) setTimeout(() => setActiveIdx(i + 1), 400);
    else setTimeout(onComplete, 1000);
  };

  const nextAgent = AGENTS[messages[activeIdx + 1]?.agent];

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 48px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #1e293b" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 4, height: 18, background: "linear-gradient(180deg, #6366f1, #06b6d4)", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, color: "#f1f5f9", fontWeight: 700, letterSpacing: -0.5 }}>Agent Debate</span>
          </div>
          <div style={{ fontSize: 13, color: "#475569", fontFamily: "'Inter', sans-serif", marginTop: 4, marginLeft: 14 }}>
            {activeIdx + 1} of {messages.length} agents responded
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {messages.map((_, i) => {
            const a = Object.values(AGENTS)[i];
            return (
              <div key={i} style={{
                width: 28, height: 5, borderRadius: 3,
                background: i <= activeIdx ? (a?.color || "#6366f1") + "99" : "#1e293b",
                transition: "background 0.4s"
              }} />
            );
          })}
        </div>
      </div>

      <div ref={ref} style={{ maxHeight: "62vh", overflowY: "auto", paddingRight: 4 }}>
        {messages.slice(0, activeIdx + 1).map((msg, i) => (
          <AgentBubble key={i} msg={msg} active={i === activeIdx} onDone={() => handleDone(i)} />
        ))}
      </div>

      {activeIdx < messages.length - 1 && nextAgent && (
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10, color: "#334155", fontSize: 14, fontFamily: "'Inter', sans-serif" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#334155", animation: `dotBounce 0.8s ease-in-out ${i*0.2}s infinite` }} />
            ))}
          </div>
          <span>{nextAgent.icon} {nextAgent.name} is analyzing...</span>
        </div>
      )}
    </div>
  );
}
