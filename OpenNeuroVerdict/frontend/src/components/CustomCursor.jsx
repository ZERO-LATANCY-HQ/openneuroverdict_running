import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {trail.map((t, i) => (
        <div key={t.id} style={{
          position: "fixed", left: t.x, top: t.y, pointerEvents: "none",
          width: 4, height: 4, borderRadius: "50%", zIndex: 9999,
          background: `rgba(0, 212, 255, ${0.1 + i * 0.1})`,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s", opacity: 1 - (trail.length - i) * 0.1
        }} />
      ))}
      <div style={{
        position: "fixed", left: pos.x, top: pos.y, pointerEvents: "none",
        width: 20, height: 20, border: "2px solid #00d4ff", borderRadius: "50%",
        transform: "translate(-50%, -50%)", zIndex: 9999,
        transition: "width 0.15s, height 0.15s", mixBlendMode: "difference"
      }} />
    </>
  );
}
