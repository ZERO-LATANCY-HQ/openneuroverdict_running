export default function Header({ onReset, showReset }) {
  return (
    <div style={{
      borderBottom: "1px solid #0f172a",
      padding: "0 48px", display: "flex", alignItems: "center", height: 60,
      background: "rgba(5,7,15,0.92)", position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(20px)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: -0.5
        }}>N</div>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9", letterSpacing: -0.3 }}>
            OpenNeuroVerdict
          </div>
          <div style={{ fontSize: 10, color: "#334155", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>AI Hiring Intelligence</div>
        </div>
      </div>

      {showReset && (
        <div style={{
          margin: "0 auto", display: "flex", alignItems: "center", gap: 7,
          background: "#0f172a", border: "1px solid #1e293b",
          borderRadius: 20, padding: "5px 14px"
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite", boxShadow: "0 0 8px #10b98166" }} />
          <span style={{ fontSize: 11, color: "#64748b", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>ANALYSIS ACTIVE</span>
        </div>
      )}

      {showReset && (
        <button onClick={onReset} style={{
          background: "none", border: "1px solid #1e293b",
          color: "#64748b", padding: "7px 18px", borderRadius: 8, cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1,
          transition: "all 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f166"; e.currentTarget.style.color = "#a5b4fc"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
        >NEW ANALYSIS</button>
      )}
    </div>
  );
}
