import { useRef, useState } from "react";
import { extractTextFromFile } from "../utils/extractText";

export default function FileUpload({ onExtracted, color = "#00d4ff" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState(null); // null | "loading" | "done" | "error"
  const [fileName, setFileName] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setStatus("loading");
    try {
      const text = await extractTextFromFile(file);
      onExtracted(text);
      setStatus("done");
    } catch (e) {
      setStatus("error");
      console.error(e);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const statusInfo = {
    loading: { icon: "⏳", text: "Extracting text...", color: "#fbbf24" },
    done:    { icon: "✓",  text: `Loaded: ${fileName}`, color: "#34d399" },
    error:   { icon: "✗",  text: "Failed. Try PDF, DOCX or TXT.", color: "#f87171" },
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `1.5px dashed ${dragging ? color : color + "44"}`,
          borderRadius: 8, padding: "10px 14px",
          background: dragging ? `${color}0d` : "#0a0e1a",
          cursor: "pointer", transition: "all 0.2s ease",
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 8
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}0a`; }}
        onMouseLeave={e => { if (!dragging) { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.background = "#0a0e1a"; }}}
      >
        <span style={{ fontSize: 18 }}>📎</span>
        <div>
          <div style={{ color, fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>
            Upload File
          </div>
          <div style={{ color: "#484f58", fontSize: 10, fontFamily: "monospace" }}>
            PDF, DOCX, TXT — drag & drop or click
          </div>
        </div>
        <input
          ref={inputRef} type="file"
          accept=".pdf,.docx,.txt"
          style={{ display: "none" }}
          onChange={e => handleFile(e.target.files[0])}
        />
      </div>

      {status && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 10, fontFamily: "monospace",
          color: statusInfo[status].color,
          animation: "fadeIn 0.3s ease",
          marginBottom: 6
        }}>
          <span>{statusInfo[status].icon}</span>
          <span>{statusInfo[status].text}</span>
          {status === "loading" && (
            <div style={{ display: "flex", gap: 2, marginLeft: 4 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 3, height: 3, borderRadius: "50%", background: "#fbbf24",
                  animation: `dotBounce 0.8s ease-in-out ${i * 0.15}s infinite`
                }} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
