export default function Header({ onReset, showReset }) {
  return (
    <div style={{
      borderBottom: "1px solid #1e2433", padding: "0 40px",
      display: "flex", alignItems: "center", height: 56,
      background: "#080c14ee", position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(16px)"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "linear-gradient(135deg, #00d4ff, #a78bfa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#080c14"
        }}>N</div>
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 13, color: "#e6edf3", letterSpacing: 1.5 }}>
            OpenNeuroVerdict
          </div>
          <div style={{ fontSize: 8, color: "#3d4555", letterSpacing: 2, textTransform: "uppercase" }}>AI Hiring Intelligence</div>
        </div>
      </div>

      {/* Center status pill */}
      {showReset && (
        <div style={{
          margin: "0 auto", display: "flex", alignItems: "center", gap: 6,
          background: "#0d1117", border: "1px solid #1e2433",
          borderRadius: 20, padding: "4px 12px"
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 10, color: "#8b949e", fontFamily: "monospace", letterSpacing: 1 }}>ANALYSIS ACTIVE</span>
        </div>
      )}

      {showReset && (
        <button onClick={onReset} style={{
          marginLeft: showReset ? 0 : "auto",
          background: "none", border: "1px solid #1e2433",
          color: "#8b949e", padding: "6px 16px", borderRadius: 6, cursor: "pointer",
          fontFamily: "monospace", fontSize: 10, letterSpacing: 1,
          transition: "border-color 0.2s, color 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff44"; e.currentTarget.style.color = "#00d4ff"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2433"; e.currentTarget.style.color = "#8b949e"; }}
        >NEW ANALYSIS</button>
      )}
    </div>
  );
}
