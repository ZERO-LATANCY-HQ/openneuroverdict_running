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

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 40px" }}>
      <Reveal>
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 3, height: 16, background: "linear-gradient(180deg, #00d4ff, #a78bfa)", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "#e6edf3", fontWeight: 700 }}>New Analysis</span>
          </div>
          <p style={{ color: "#484f58", fontSize: 14, margin: 0, fontFamily: "monospace" }}>
            Upload or paste the candidate resume and job description to begin the multi-agent evaluation.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {[
            { key: "resume", label: "Candidate Resume", color: "#00d4ff", value: resume, setter: setResume, placeholder: "Paste resume text here..." },
            { key: "jd", label: "Job Description", color: "#a78bfa", value: jd, setter: setJd, placeholder: "Paste job description here..." },
          ].map(({ key, label, color, value, setter, placeholder }) => (
            <div key={key} style={{ background: "#0d1117", border: "1px solid #1e2433", borderRadius: 8, overflow: "hidden" }}>
              {/* Panel header */}
              <div style={{
                padding: "10px 16px", borderBottom: "1px solid #1e2433",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#0a0e1a"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                  <span style={{ fontSize: 12, color: "#8b949e", fontFamily: "monospace", letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "#2d333b", fontFamily: "monospace" }}>{value.length} chars</span>
                  {value && (
                    <button onClick={() => setter("")} style={{
                      background: "none", border: "none", color: "#3d4555",
                      fontSize: 10, fontFamily: "monospace", cursor: "pointer",
                      padding: 0, transition: "color 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                    onMouseLeave={e => e.currentTarget.style.color = "#3d4555"}
                    >clear</button>
                  )}
                </div>
              </div>

              {/* Upload */}
              <div style={{ padding: "10px 16px 0" }}>
                <FileUpload color={color} onExtracted={text => setter(text)} />
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px 8px" }}>
                <div style={{ flex: 1, height: 1, background: "#1a2030" }} />
                <span style={{ color: "#2d333b", fontSize: 11, fontFamily: "monospace", letterSpacing: 1 }}>OR PASTE BELOW</span>
                <div style={{ flex: 1, height: 1, background: "#1a2030" }} />
              </div>

              {/* Textarea */}
              <textarea
                value={value} onChange={e => setter(e.target.value)}
                placeholder={placeholder} rows={11}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  borderTop: "1px solid #1e2433",
                  color: "#c9d1d9", padding: "14px 16px", fontSize: 14,
                  fontFamily: "'Courier Prime', monospace", lineHeight: 1.8,
                  resize: "none", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#0d1117", border: "1px solid #1e2433", borderRadius: 8 }}>
          <div style={{ fontSize: 13, color: "#484f58", fontFamily: "monospace" }}>
            {resume.trim() && jd.trim()
              ? "✓ Ready to analyze — both fields populated"
              : "⚠ Both fields required to proceed"}
          </div>
          <button
            onClick={() => onSubmit(resume, jd)}
            disabled={!resume.trim() || !jd.trim()}
            style={{
              background: resume.trim() && jd.trim() ? "linear-gradient(135deg, #00d4ff, #a78bfa)" : "#1e2433",
              border: "none", color: resume.trim() && jd.trim() ? "#080c14" : "#3d4555",
              padding: "10px 32px", borderRadius: 6, cursor: resume.trim() && jd.trim() ? "pointer" : "not-allowed",
              fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
              letterSpacing: 1.5, transition: "opacity 0.2s, transform 0.2s"
            }}
            onMouseEnter={e => { if (resume.trim() && jd.trim()) e.currentTarget.style.opacity = "0.9"; }}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >RUN ANALYSIS →</button>
        </div>
      </Reveal>
    </div>
  );
}
