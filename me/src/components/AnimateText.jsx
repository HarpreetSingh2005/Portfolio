// import { act, useRef, useState } from "react";

// const CHARS =
//   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+[]{};:'\",.<>/?\\|~";

// const SPEED = 30;

// export default function AnimateText({ char }) {
//   const [display, setDisplay] = useState(char);
//   const intervalRef = useRef(null);
//   const [active, setActive] = useState(false);

//   const start = () => {
//     if (intervalRef.current) return;
//     setActive(true);
//     intervalRef.current = setInterval(() => {
//       setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
//     }, SPEED);
//   };

//   const stop = () => {
//     setActive(false);
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//     setDisplay(char);
//   };

//   return (
//     <div
//       onMouseEnter={start}
//       onMouseLeave={stop}
//       style={{
//         width: 56,
//         height: 56,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontFamily: "monospace",
//         fontSize: "1.6rem",
//         borderRadius: "10px",
//         border: "1px solid #1e1e1e",
//         background: active ? "#1e1e1e" : "#ffffff",
//         color: active ? "#ffffff" : "#000000",
//         cursor: "pointer",
//         userSelect: "none",
//         transition: "transform 0.2s ease",
//       }}
//     >
//       {display}
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";

const CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+[]{};:'\",.<>/?\\|~";

const SPEED = 30;

export default function AnimateText({ char, active }) {
  const [display, setDisplay] = useState(char);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (active) {
      if (intervalRef.current) return; // 🔑 IMPORTANT GUARD
      console.log("active");
      intervalRef.current = setInterval(() => {
        setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }, SPEED);
    } else {
      console.log("inactive");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDisplay(char);
    }

    // return () => {
    //   clearInterval(intervalRef.current);
    //   intervalRef.current = null;
    // };
  }, [active, char]);

  return (
    <div
      className="animate-char"
      style={{
        width: 56,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        fontSize: "1.6rem",
        borderRadius: "10px",
        border: "1px solid #1e1e1e",
        background: active ? "#1e1e1e" : "#ffffff",
        color: active ? "#ffffff" : "#000000",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.2s ease",
      }}
    >
      {display}
    </div>
  );
}
