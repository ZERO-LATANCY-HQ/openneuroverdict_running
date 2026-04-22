import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const transforms = { up: "translateY(30px)", down: "translateY(-30px)", left: "translateX(-30px)", right: "translateX(30px)" };

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0)" : transforms[direction],
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
    }}>
      {children}
    </div>
  );
}
