import { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import InputPage from "./pages/InputPage";
import LoadingPage from "./pages/LoadingPage";
import DebatePage from "./pages/DebatePage";
import VerdictPage from "./pages/VerdictPage";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Space+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080c14; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes slideIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes shimmer { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.2)} }
  @keyframes dotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes agentPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
  @keyframes progressScan { 0%{width:0%;margin-left:0} 50%{width:60%;margin-left:20%} 100%{width:0%;margin-left:100%} }
  @keyframes orbitSpin { to{transform:rotate(360deg)} }
  @keyframes particleFade { 0%,100%{opacity:0;transform:translateY(0)} 50%{opacity:1;transform:translateY(-16px)} }
  textarea:focus { outline: none; }
  button { font-family: inherit; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #080c14; }
  ::-webkit-scrollbar-thumb { background: #1e2433; border-radius: 2px; }
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

    const stepInterval = setInterval(() => {
      setLoadStep(s => (s < 5 ? s + 1 : s));
    }, 600);

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
    <div style={{ minHeight: "100vh", background: "#080c14", color: "#c9d1d9" }}>
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
