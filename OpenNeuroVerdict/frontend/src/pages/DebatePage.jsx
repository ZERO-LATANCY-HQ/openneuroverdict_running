import { useState, useEffect, useRef } from "react";

const AGENTS = {
  fact: { name: "Fact Analyzer", icon: "🔬", color: "#00d4ff" },
  hr: { name: "HR Expert", icon: "🧠", color: "#a78bfa" },
  ethics: { name: "Ethics Auditor", icon: "⚖️", color: "#34d399" },
  devil: { name: "Devil's Advocate", icon: "😈", color: "#f97316" },
};

function TypingText({ text, active, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    idx.current = 0;
    setDisplayed("");
    const iv = setInterval(() => {
      if (idx.current < text.length) setDisplayed(text.slice(0, ++idx.current));
      else { clearInterval(iv); onDone?.(); }
    }, 14);
    return () => clearInterval(iv);
  }, [text, active]);

  return <span>{displayed}{active && displayed.length < text.length && <span style={{ animation: "blink 1s infinite", color: "#00d4ff" }}>▌</span>}</span>;
}

function AgentBubble({ msg, active, onDone }) {
  const agent = AGENTS[msg.agent] || AGENTS.fact;
  const isHire = msg.decision === "Hire" || msg.decision === "Agree" || msg.decision === "Analyzed";

  return (
    <div style={{ marginBottom: 16, animation: "slideIn 0.3s ease forwards" }}>
      {/* Agent header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: "#0d1117", border: `1px solid ${active ? agent.color + "88" : "#1e2433"}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
          transition: "border-color 0.3s",
          boxShadow: active ? `0 0 12px ${agent.color}33` : "none"
        }}>{agent.icon}</div>
        <span style={{ color: agent.color, fontFamily: "monospace", fontWeight: 700, fontSize: 11, letterSpacing: 0.5 }}>{agent.name}</span>
        <div style={{ height: 1, flex: 1, background: "#1e2433" }} />
        <span style={{
          fontSize: 9, padding: "2px 8px", borderRadius: 3,
          background: isHire ? "#00d4ff0d" : "#f974160d",
          color: isHire ? "#00d4ff" : "#f97416",
          border: `1px solid ${isHire ? "#00d4ff22" : "#f9741622"}`,
          fontFamily: "monospace", letterSpacing: 1
        }}>{msg.decision.toUpperCase()}</span>
        <span style={{ fontSize: 9, color: "#484f58", fontFamily: "monospace" }}>{Math.round(msg.confidence * 100)}% conf.</span>
      </div>

      {/* Message body */}
      <div style={{
        marginLeft: 42, background: "#0d1117",
        border: "1px solid #1e2433", borderLeft: `2px solid ${agent.color}44`,
        borderRadius: "0 6px 6px 6px", padding: "12px 16px",
        color: "#9ca3af", fontFamily: "system-ui, sans-serif", fontSize: 13, lineHeight: 1.7
      }}>
        <TypingText text={msg.reason} active={active} onDone={onDone} />
      </div>

      {/* Confidence bar */}
      <div style={{ marginLeft: 42, marginTop: 6, height: 2, background: "#1e2433", borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${msg.confidence * 100}%`,
          background: `linear-gradient(90deg, ${agent.color}44, ${agent.color})`,
          borderRadius: 1, transition: "width 1s ease"
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
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #1e2433" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 3, height: 14, background: "linear-gradient(180deg, #00d4ff, #a78bfa)", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#e6edf3", fontWeight: 700 }}>Agent Debate</span>
          </div>
          <div style={{ fontSize: 10, color: "#484f58", fontFamily: "monospace", marginTop: 3, marginLeft: 11 }}>
            {activeIdx + 1} of {messages.length} agents responded
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {messages.map((_, i) => (
            <div key={i} style={{
              width: 24, height: 4, borderRadius: 2,
              background: i <= activeIdx ? Object.values(AGENTS)[i]?.color + "88" : "#1e2433",
              transition: "background 0.4s"
            }} />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div ref={ref} style={{ maxHeight: "62vh", overflowY: "auto", paddingRight: 4 }}>
        {messages.slice(0, activeIdx + 1).map((msg, i) => (
          <AgentBubble key={i} msg={msg} active={i === activeIdx} onDone={() => handleDone(i)} />
        ))}
      </div>

      {/* Next agent indicator */}
      {activeIdx < messages.length - 1 && nextAgent && (
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: "#484f58", fontSize: 11, fontFamily: "monospace" }}>
          <div style={{ display: "flex", gap: 3 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#484f58", animation: `dotBounce 0.8s ease-in-out ${i*0.2}s infinite` }} />
            ))}
          </div>
          <span>{nextAgent.icon} {nextAgent.name} is analyzing...</span>
        </div>
      )}
    </div>
  );
}
