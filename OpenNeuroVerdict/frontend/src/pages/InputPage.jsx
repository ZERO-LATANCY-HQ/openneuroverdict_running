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

const FIELDS = [
  {
    key: "resume",
    label: "CANDIDATE RESUME",
    color: "#00d4ff",
    placeholder: "Paste resume here or upload a file above...",
    sample: SAMPLE_RESUME,
  },
  {
    key: "jd",
    label: "JOB DESCRIPTION",
    color: "#a78bfa",
    placeholder: "Paste job description here or upload a file above...",
    sample: SAMPLE_JD,
  },
];

export default function InputPage({ onSubmit }) {
  const [resume, setResume] = useState(SAMPLE_RESUME);
  const [jd, setJd] = useState(SAMPLE_JD);

  const setters = { resume: setResume, jd: setJd };
  const values  = { resume, jd };

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 32px" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 10, color: "#484f58", letterSpacing: 4, marginBottom: 8 }}>STEP 1 OF 3</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, color: "#e6edf3" }}>
            Enter Candidate Details
          </div>
          <div style={{ color: "#484f58", fontSize: 11, marginTop: 6 }}>
            Upload a file (PDF / DOCX / TXT) or paste text directly
          </div>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {FIELDS.map(({ key, label, color, placeholder }) => (
            <div key={key}>
              {/* Label row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 10, color: "#484f58", letterSpacing: 3 }}>{label}</div>
                {values[key] && (
                  <button
                    onClick={() => setters[key]("")}
                    style={{
                      background: "none", border: "none", color: "#484f58",
                      fontSize: 10, fontFamily: "monospace", cursor: "pointer",
                      transition: "color 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                    onMouseLeave={e => e.currentTarget.style.color = "#484f58"}
                  >✕ clear</button>
                )}
              </div>

              {/* File upload zone */}
              <FileUpload color={color} onExtracted={text => setters[key](text)} />

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1, height: 1, background: "#1a2030" }} />
                <span style={{ color: "#2d333b", fontSize: 10, fontFamily: "monospace" }}>or type below</span>
                <div style={{ flex: 1, height: 1, background: "#1a2030" }} />
              </div>

              {/* Textarea */}
              <textarea
                value={values[key]}
                onChange={e => setters[key](e.target.value)}
                placeholder={placeholder}
                rows={10}
                style={{
                  width: "100%", background: "#0d1117",
                  border: "1px solid #1e2d3d", borderRadius: 8,
                  color: "#c9d1d9", padding: 14, fontSize: 12.5,
                  fontFamily: "'Courier Prime', monospace", lineHeight: 1.6,
                  transition: "border-color 0.3s, box-shadow 0.3s", resize: "vertical"
                }}
                onFocus={e => { e.target.style.borderColor = `${color}55`; e.target.style.boxShadow = `0 0 0 3px ${color}11`; }}
                onBlur={e => { e.target.style.borderColor = "#1e2d3d"; e.target.style.boxShadow = "none"; }}
              />

              {/* Char count */}
              <div style={{ textAlign: "right", fontSize: 9, color: "#2d333b", fontFamily: "monospace", marginTop: 4 }}>
                {values[key].length} chars
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => onSubmit(resume, jd)}
            disabled={!resume.trim() || !jd.trim()}
            style={{
              background: "linear-gradient(135deg, #00d4ff22, #a78bfa22)",
              border: "1px solid #00d4ff66", color: "#00d4ff",
              padding: "13px 44px", borderRadius: 8, cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
              letterSpacing: 2, opacity: (!resume.trim() || !jd.trim()) ? 0.4 : 1,
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)"
            }}
            onMouseEnter={e => { if (resume.trim() && jd.trim()) { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 30px #00d4ff33"; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >▶ INITIATE DEBATE</button>
        </div>
      </Reveal>
    </div>
  );
}
