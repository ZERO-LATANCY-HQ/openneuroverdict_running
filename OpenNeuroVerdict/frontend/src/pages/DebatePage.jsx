import { useState, useEffect, useRef } from "react";
import Reveal from "../components/Reveal";

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
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, ++idx.current));
      } else {
        clearInterval(iv);
        onDone?.();
      }
    }, 16);
    return () => clearInterval(iv);
  }, [text, active]);

  return <span>{displayed}{active && displayed.length < text.length && <span style={{ animation: "blink 1s infinite" }}>▌</span>}</span>;
}

function AgentBubble({ msg, active, onDone }) {
  const agent = AGENTS[msg.agent] || AGENTS.fact;
  return (
    <div style={{
      display: "flex", gap: 12, marginBottom: 20,
      animation: "slideIn 0.4s ease forwards"
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
        background: `${agent.color}18`, border: `2px solid ${agent.color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, boxShadow: active ? `0 0 14px ${agent.color}55` : "none",
        transition: "box-shadow 0.3s"
      }}>{agent.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ color: agent.color, fontFamily: "monospace", fontWeight: 700, fontSize: 12 }}>{agent.name}</span>
          <span style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
            · {msg.decision} · {Math.round(msg.confidence * 100)}%
          </span>
        </div>
        <div style={{
          background: "#0d1117", border: `1px solid ${agent.color}33`,
          borderRadius: "4px 14px 14px 14px", padding: "10px 14px",
          color: "#c9d1d9", fontFamily: "'Courier Prime', monospace", fontSize: 13, lineHeight: 1.6
        }}>
          <TypingText text={msg.reason} active={active} onDone={onDone} />
        </div>
        <div style={{ marginTop: 5, height: 3, background: "#1a1f2e", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${msg.confidence * 100}%`,
            background: `linear-gradient(90deg, ${agent.color}66, ${agent.color})`,
            borderRadius: 2, transition: "width 1s ease"
          }} />
        </div>
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
    if (i < messages.length - 1) setTimeout(() => setActiveIdx(i + 1), 300);
    else setTimeout(onComplete, 800);
  };

  return (
    <div style={{ maxWidth: 820, margin: "32px auto", padding: "0 32px" }}>
      <Reveal>
        <div style={{ fontSize: 10, color: "#484f58", letterSpacing: 4, marginBottom: 16, textAlign: "center" }}>
          LIVE AGENT DEBATE — {messages.length} ROUNDS
        </div>
      </Reveal>
      <div ref={ref} style={{ maxHeight: "68vh", overflowY: "auto", padding: "4px 0" }}>
        {messages.slice(0, activeIdx + 1).map((msg, i) => (
          <AgentBubble key={i} msg={msg} active={i === activeIdx} onDone={() => handleDone(i)} />
        ))}
      </div>
      {activeIdx < messages.length - 1 && (
        <div style={{ textAlign: "center", marginTop: 14, color: "#484f58", fontSize: 12, animation: "pulse 1.5s infinite" }}>
          {AGENTS[messages[activeIdx + 1]?.agent]?.icon} {AGENTS[messages[activeIdx + 1]?.agent]?.name} is thinking...
        </div>
      )}
    </div>
  );
}
