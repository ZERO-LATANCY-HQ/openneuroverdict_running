import { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import InputPage from "./pages/InputPage";
import LoadingPage from "./pages/LoadingPage";
import DebatePage from "./pages/DebatePage";
import VerdictPage from "./pages/VerdictPage";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #05070f;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 16px;
    color: #cbd5e1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  textarea:focus { outline: none; }
  button { font-family: 'Inter', system-ui, sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #05070f; }
  ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
  @keyframes floatX { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,-10px)} }
  @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
  @keyframes ripple { to{transform:translate(-50%,-50%) scale(22);opacity:0} }
  @keyframes dotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  @keyframes agentPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.07)} }
  @keyframes progressScan { 0%{width:0%;margin-left:0} 50%{width:60%;margin-left:20%} 100%{width:0%;margin-left:100%} }
  @keyframes orbitSpin { to{transform:rotate(360deg)} }
  @keyframes particleFade { 0%,100%{opacity:0;transform:translateY(0)} 50%{opacity:0.8;transform:translateY(-20px)} }
  @keyframes gridMove { from{transform:translateY(0)} to{transform:translateY(40px)} }
  @keyframes scanLine { 0%{top:0%} 100%{top:100%} }
  @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
  @keyframes borderFlow {
    0%{border-color:#6366f133}
    33%{border-color:#06b6d433}
    66%{border-color:#10b98133}
    100%{border-color:#6366f133}
  }
`;

export default function App() {
  const [page, setPage] = useState("landing");
  const [loadStep, setLoadStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [verdict, setVerdict] = useState(null);
  const [fairness, setFairness] = useState(null);

  const reset = () => { setPage("landing"); setMessages([]); setVerdict(null); setFairness(null); };

  const handleSubmit = async (resume, jd) => {
    setPage("loading");
    setLoadStep(0);
    const stepInterval = setInterval(() => setLoadStep(s => s < 5 ? s + 1 : s), 600);
    try {
      const res = await fetch("https://openneuroverdict-running.onrender.com/analyze", {
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
      alert("Backend error: " + e.message);
      setPage("input");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05070f", color: "#cbd5e1" }}>
      <style>{GLOBAL_STYLES}</style>
      <Header onReset={reset} showReset={page !== "landing"} />
      {page === "landing" && <LandingPage onStart={() => setPage("input")} />}
      {page === "input" && <InputPage onSubmit={handleSubmit} />}
      {page === "loading" && <LoadingPage step={loadStep} />}
      {page === "debate" && <DebatePage messages={messages} onComplete={() => setPage("verdict")} />}
      {page === "verdict" && verdict && fairness && (
        <VerdictPage verdict={verdict} fairness={fairness} messages={messages} onReplay={() => setPage("debate")} onNew={reset} />
      )}
    </div>
  );
}
