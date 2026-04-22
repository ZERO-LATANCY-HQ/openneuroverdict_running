import { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import InputPage from "./pages/InputPage";
import LoadingPage from "./pages/LoadingPage";
import DebatePage from "./pages/DebatePage";
import VerdictPage from "./pages/VerdictPage";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; background: #080c14; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes shimmer { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 10px #00d4ff22} 50%{box-shadow:0 0 28px #00d4ff55} }
  @keyframes borderGlow { 0%,100%{border-color:#00d4ff33} 50%{border-color:#00d4ff99} }
  textarea { resize: vertical; }
  textarea:focus { outline: none; }
  button { cursor: pointer; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0d1117; }
  ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #00d4ff44; }
`;

export default function App() {
  const [page, setPage] = useState("landing"); // landing | input | loading | debate | verdict
  const [loadStep, setLoadStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [verdict, setVerdict] = useState(null);
  const [fairness, setFairness] = useState(null);

  const reset = () => { setPage("landing"); setMessages([]); setVerdict(null); setFairness(null); };

  const handleSubmit = async (resume, jd) => {
    setPage("loading");
    setLoadStep(0);

    // Animate loading steps while waiting for API
    const stepInterval = setInterval(() => {
      setLoadStep(s => (s < 5 ? s + 1 : s));
    }, 600);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job_description: jd }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      clearInterval(stepInterval);
      setLoadStep(5);

      setMessages(data.debate);
      setVerdict(data.verdict);
      setFairness(data.fairness);
      setTimeout(() => setPage("debate"), 400);
    } catch (e) {
      clearInterval(stepInterval);
      console.error(e);
      alert("Backend error: " + e.message + "\n\nMake sure the FastAPI server is running on http://localhost:8000");
      setPage("input");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", fontFamily: "'Courier Prime', monospace", color: "#c9d1d9" }}>
      <style>{GLOBAL_STYLES}</style>
      <Header onReset={reset} showReset={page !== "landing"} />

      {page === "landing" && <LandingPage onStart={() => setPage("input")} />}
      {page === "input" && <InputPage onSubmit={handleSubmit} />}
      {page === "loading" && <LoadingPage step={loadStep} />}
      {page === "debate" && (
        <DebatePage
          messages={messages}
          onComplete={() => setPage("verdict")}
        />
      )}
      {page === "verdict" && verdict && fairness && (
        <VerdictPage
          verdict={verdict}
          fairness={fairness}
          messages={messages}
          onReplay={() => setPage("debate")}
          onNew={reset}
        />
      )}
    </div>
  );
}
