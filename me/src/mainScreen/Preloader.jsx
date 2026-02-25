import React from "react";
import { useEffect, useState } from "react";
import "./preloader.css";
const LINES = [
  " I don't follow.",
  "I create.",
  "",
  "Welcome to the world of Mulbbies.",
];

const TYPING_SPEED = 20; // ms
const LINE_PAUSE = 500; // ms
const TRIANGLES = 35;

const Preloader = ({ onFinish }) => {
  const [display, setDisplay] = useState("");
  const [cursor, setCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => {
      setCursor((c) => !c);
    }, LINE_PAUSE);
    return () => clearInterval(blink);
  }, []);

  // Typing effect
  useEffect(() => {
    let cancelled = false;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const type = async () => {
      for (let line of LINES) {
        for (let ch of line) {
          if (cancelled) return;
          setDisplay((prev) => prev + ch);
          await sleep(TYPING_SPEED);
        }
        setDisplay((prev) => prev + "\n");
        await sleep(LINE_PAUSE);
      }

      await sleep(800);
      onFinish();
    };

    type();
    return () => (cancelled = true);
  }, [onFinish]);

  return (
    <div className="intro-container">
      {/* Geometry layer */}
      <div className="triangles">
        {Array.from({ length: TRIANGLES }).map((_, i) => (
          <div
            key={i}
            className="triangle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>

      {/* Text layer */}
      <pre className="intro-text">
        {display}
        {cursor ? "|" : " "}
      </pre>
    </div>
  );
};

export default Preloader;
