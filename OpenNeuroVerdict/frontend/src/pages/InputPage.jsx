import { useState } from "react";
import Reveal from "../components/Reveal";
import FileUpload from "../components/FileUpload";

const SAMPLE_RESUME = `John Smith | john@email.com
Education: B.Tech Computer Science, IIT Delhi (2019)
Experience: 4 years at TechCorp as Software Engineer
Skills: Python, React, Node.js, AWS, Docker
Projects: Built a real-time analytics dashboard used by 10K+ users
Achievements: Led team of 5, reduced system latency by 40%`;

const SAMPLE_JD = `Senior Software Engineer - AI Products
Company: NovaTech Solutions
Requirements:
- 3+ years of software engineering experience
- Strong Python and JavaScript skills
- Experience with cloud platforms (AWS/GCP)
- Team leadership experience preferred
- Bachelor's degree in CS or related field`;

export default function InputPage({ onSubmit }) {
  const [resume, setResume] = useState(SAMPLE_RESUME);
  const [jd, setJd] = useState(SAMPLE_JD);
  const ready = resume.trim() && jd.trim();

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 48px" }}>
      <Reveal>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 4, height: 20, background: "linear-gradient(180deg, #6366f1, #06b6d4)", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 22, color: "#f1f5f9", fontWeight: 700, letterSpacing: -0.5 }}>New Analysis</span>
          </div>
          <p style={{ color: "#475569", fontSize: 15, margin: "0 0 0 14px", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
            Upload or paste the candidate resume and job description to begin the multi-agent evaluation.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {[
            { key: "resume", label: "Candidate Resume", color: "#06b6d4", value: resume, setter: setResume, placeholder: "Paste resume text here..." },
            { key: "jd", label: "Job Description", color: "#6366f1", value: jd, setter: setJd, placeholder: "Paste job description here..." },
          ].map(({ key, label, color, value, setter, placeholder }) => (
            <div key={key} style={{
              background: "linear-gradient(135deg, #0f172a, #0a0f1e)",
              border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden"
            }}>
              {/* Panel header */}
              <div style={{
                padding: "12px 18px", borderBottom: "1px solid #1e293b",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#080d18"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}88` }} />
                  <span style={{ fontSize: 12, color: "#64748b", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "#1e293b", fontFamily: "'JetBrains Mono', monospace" }}>{value.length} chars</span>
                  {value && (
                    <button onClick={() => setter("")} style={{
                      background: "none", border: "none", color: "#334155",
                      fontSize: 11, fontFamily: "'JetBrains Mono', monospace", cursor: "pointer",
                      padding: 0, transition: "color 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                    onMouseLeave={e => e.currentTarget.style.color = "#334155"}
                    >clear</button>
                  )}
                </div>
              </div>

              <div style={{ padding: "12px 18px 0" }}>
                <FileUpload color={color} onExtracted={text => setter(text)} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 18px 10px" }}>
                <div style={{ flex: 1, height: 1, background: "#1e293b" }} />
                <span style={{ color: "#1e293b", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5 }}>OR PASTE BELOW</span>
                <div style={{ flex: 1, height: 1, background: "#1e293b" }} />
              </div>

              <textarea
                value={value} onChange={e => setter(e.target.value)}
                placeholder={placeholder} rows={12}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  borderTop: "1px solid #1e293b",
                  color: "#cbd5e1", padding: "16px 18px", fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8,
                  resize: "none", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px", borderRadius: 12,
          background: "linear-gradient(135deg, #0f172a, #0a0f1e)",
          border: `1px solid ${ready ? "#6366f133" : "#1e293b"}`
        }}>
          <div style={{ fontSize: 14, color: ready ? "#10b981" : "#475569", fontFamily: "'JetBrains Mono', monospace" }}>
            {ready ? "✓  Ready — both fields populated" : "⚠  Both fields required to proceed"}
          </div>
          <button
            onClick={() => onSubmit(resume, jd)}
            disabled={!ready}
            style={{
              background: ready ? "linear-gradient(135deg, #6366f1, #06b6d4)" : "#1e293b",
              border: "none", color: ready ? "#fff" : "#334155",
              padding: "12px 36px", borderRadius: 8, cursor: ready ? "pointer" : "not-allowed",
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
              letterSpacing: 0.3, transition: "all 0.2s",
              boxShadow: ready ? "0 4px 24px #6366f144" : "none"
            }}
            onMouseEnter={e => { if (ready) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 32px #6366f166"; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = ready ? "0 4px 24px #6366f144" : "none"; }}
          >Run Analysis →</button>
        </div>
      </Reveal>
    </div>
  );
}
