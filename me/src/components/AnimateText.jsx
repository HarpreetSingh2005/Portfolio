// AnimateText.jsx
import { useEffect, useRef, useState } from "react";

const CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+[]{};:'\",.<>/?\\|~";

const SPEED = 30;

export default function AnimateText({ char, active, fun }) {
  const [display, setDisplay] = useState(char);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (active) {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }, SPEED);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDisplay(char);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [active, char]);

  // Colors change based on theme + active state
  const bg = fun
    ? active
      ? "#534444" // fun theme - active
      : "#ffd6d6" // fun theme - inactive
    : active
      ? "rgb(51, 85, 54)" // dark/warm theme - active
      : "#d6ffe7"; // dark/warm theme - inactive

  const color = active ? "#ffffff" : "#000000";

  return (
    <div
      className="animate-char"
      style={{
        width: "clamp(2.2rem, 10vw, 3.5rem)",
        height: "clamp(2.2rem, 10vw, 3.5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
        borderRadius: "10px",
        border: "1px solid #1e1e1e",
        background: bg,
        color: color,
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.35s ease", // smoother theme switch
      }}
    >
      {display}
    </div>
  );
}
