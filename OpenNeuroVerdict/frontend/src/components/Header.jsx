export default function Header({ onReset, showReset }) {
  return (
    <div style={{
      borderBottom: "1px solid #1a2030", padding: "14px 32px",
      display: "flex", alignItems: "center", gap: 12,
      background: "#0a0e1aee", position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(12px)"
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 8,
        background: "linear-gradient(135deg, #00d4ff22, #a78bfa22)",
        border: "1px solid #00d4ff55",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s",
        cursor: "pointer"
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "rotate(180deg) scale(1.1)"; e.currentTarget.style.boxShadow = "0 0 16px #00d4ff44"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
      >⚡</div>
      <div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 14, color: "#e6edf3", letterSpacing: 2 }}>
          OPEN<span style={{ color: "#00d4ff" }}>NEURO</span>VERDICT
        </div>
        <div style={{ fontSize: 9, color: "#484f58", letterSpacing: 3 }}>MULTI-AGENT HIRING SYSTEM v1.0</div>
      </div>
      {showReset && (
        <button onClick={onReset} style={{
          marginLeft: "auto", background: "none", border: "1px solid #30363d",
          color: "#8b949e", padding: "5px 12px", borderRadius: 6, cursor: "pointer",
          fontFamily: "monospace", fontSize: 11,
          transition: "all 0.2s ease"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff55"; e.currentTarget.style.color = "#00d4ff"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#30363d"; e.currentTarget.style.color = "#8b949e"; }}
        >← New Analysis</button>
      )}
    </div>
  );
}
