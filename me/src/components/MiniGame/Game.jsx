import { useEffect, useRef, useState } from "react";

// ─── THEMES ───────────────────────────────────────────────────
const THEMES = {
  dark: {
    // warm amber/orange — day feel
    bg: "#1a1000", // very dark warm brown (body background)
    bgGlow: "rgba(249,115,22,0.07)",
    ground: { fill: "#3d2b1f", edge: "#c8860a", stripe: "#4a3325" },
    float: { fill: "#c94a00", edge: "#ff9a3c", top: "#a33d00" },
    stair: { fill: "#1a7a32", edge: "#4ade80", top: "#22a845" },
    hint: { key: "#f97316", text: "#fed7aa" },
    coin: "#ffe066",
    coinGlow: "rgba(255,200,0,0.7)",
    scrollCol: "#f97316",
    accentCol: "#f97316",
    letterLine: "rgba(255,200,50,0.4)",
    // CSS vars to inject
    css: {
      "--bg-dark": "#1a1000",
      "--bg-soft": "#231500",
      "--bg-work": "#180e00",
      "--bg-skills": "#1e1200",
      "--text-main": "#fff8f0",
      "--text-muted": "#b07040",
      "--text-dim": "rgba(255,240,220,0.55)",
      "--accent": "#f97316",
      "--accent-purple": "#fb923c",
      "--accent-cyan": "#fbbf24",
      "--border-subtle": "rgba(249,115,22,0.12)",
    },
  },
  fun: {
    // cool indigo/violet — night feel
    bg: "#0b0d10",
    bgGlow: "rgba(124,124,255,0.06)",
    ground: {
      fill: "#0f1117",
      edge: "rgba(124,124,255,0.5)",
      stripe: "#151823",
    },
    stair: {
      fill: "rgba(80,72,180,0.7)",
      edge: "rgba(140,130,255,0.9)",
      brick: "rgba(60,55,150,0.7)",
    },
    float: {
      fill: "rgba(20,160,180,0.45)",
      edge: "rgba(80,220,240,0.8)",
      top: "rgba(40,200,220,0.6)",
    },
    hint: { key: "#7c7cff", text: "#c4c4ff" },
    coin: "#a0a0ff",
    coinGlow: "rgba(124,124,255,0.6)",
    scrollCol: "#7c7cff",
    accentCol: "#7c7cff",
    letterLine: "rgba(124,124,255,0.3)",
    css: {
      "--bg-dark": "#0b0d10",
      "--bg-soft": "#12151c",
      "--bg-work": "#0f1117",
      "--bg-skills": "#1c1f2a",
      "--text-main": "#eaeaf0",
      "--text-muted": "#6b7280",
      "--text-dim": "rgba(255,255,255,0.55)",
      "--accent": "#7c7cff",
      "--accent-purple": "#a855f7",
      "--accent-cyan": "#22d3ee",
      "--border-subtle": "rgba(255,255,255,0.07)",
    },
  },
};

// inject CSS vars onto :root so the whole page re-themes
function applyThemeVars(t) {
  const root = document.documentElement;
  Object.entries(THEMES[t].css).forEach(([k, v]) =>
    root.style.setProperty(k, v),
  );
  document.body.style.background = THEMES[t].bg;
}

export default function MiniGame({ onLetterHit, fun, onToggleTheme }) {
  const canvasRef = useRef(null);
  // const themeRef = useRef("dark");
  // const [theme, setTheme] = useState("dark");

  // const toggleTheme = () => {
  //   const next = themeRef.current === "fun" ? "dark" : "fun";
  //   themeRef.current = next;
  //   setTheme(next);
  //   applyThemeVars(next);
  // };

  // // apply on mount
  // useEffect(() => {
  //   applyThemeVars(themeRef.current);
  // }, []);
  useEffect(() => {
    applyThemeVars(fun ? "fun" : "dark");
  }, [fun]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildPlatforms();
    };

    function getLetterPlatforms() {
      const cr = canvas.getBoundingClientRect();
      return Array.from(document.querySelectorAll(".game-letter")).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          id: el.dataset.letterId,
          x: r.left - cr.left,
          y: r.top - cr.top,
          w: r.width,
          h: r.height,
          type: "letter",
        };
      });
    }

    // ── FIXED PLATFORMS — left side and right side only ───
    // Nothing in the centre (x 25%–75%) so the name area stays clean.
    let staticPlatforms = [];
    function buildPlatforms() {
      const W = canvas.width;
      const H = canvas.height;
      const G = H - 72;
      const sh = 16;

      // [xFrac, yOffsetFromGround, widthPx, type]
      // Left zone: xFrac 0.02 – 0.24   Right zone: xFrac 0.72 – 0.96
      const DEFS = [
        // LEFT — 4 platforms, staggered heights, varied widths
        [0.03, 90, 82, "stair"],
        [0.1, 195, 70, "stair"],
        [0.18, 305, 90, "float"],
        [0.06, 410, 75, "stair"],

        // RIGHT — 4 platforms, different heights than left (asymmetric)
        [0.76, 115, 88, "stair"],
        [0.86, 240, 72, "float"],
        [0.72, 360, 95, "stair"],
        [0.8, 470, 78, "float"],
      ];

      const ground = { x: 0, y: G, w: W, h: 22, type: "ground" };
      const platforms = DEFS.map(([xf, yOff, pw, type]) => ({
        x: Math.round(W * xf),
        y: G - yOff,
        w: pw,
        h: sh,
        type,
      }));

      staticPlatforms = [ground, ...platforms];
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildPlatforms();
    window.addEventListener("resize", resize);

    const player = {
      x: 60,
      y: 0,
      w: 30,
      h: 42,
      vx: 0,
      vy: 0,
      speed: 5.5,
      jump: -15,
      grounded: false,
      bumpLock: false,
      prevY: 0,
      facing: 1,
      bumpAnim: 0,
      walkFrame: 0,
    };
    const gravity = 0.58;
    const keys = {};
    const onKeyDown = (e) => {
      keys[e.key] = true;
      if ([" "].includes(e.key)) e.preventDefault();
    };
    const onKeyUp = (e) => {
      keys[e.key] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    function resolveH(platforms) {
      for (const p of platforms) {
        if (player.y < p.y + p.h && player.y + player.h > p.y) {
          if (player.vx > 0 && player.x + player.w > p.x && player.x < p.x)
            player.x = p.x - player.w;
          if (
            player.vx < 0 &&
            player.x < p.x + p.w &&
            player.x + player.w > p.x + p.w
          )
            player.x = p.x + p.w;
        }
      }
    }
    function resolveV(platforms) {
      player.grounded = false;
      for (const p of platforms) {
        const ox = player.x < p.x + p.w && player.x + player.w > p.x;
        if (!ox) continue;
        if (
          player.vy > 0 &&
          player.prevY + player.h <= p.y &&
          player.y + player.h >= p.y
        ) {
          player.y = p.y - player.h;
          player.vy = 0;
          player.grounded = true;
          break;
        }
        if (
          player.vy < 0 &&
          player.prevY >= p.y + p.h &&
          player.y < p.y + p.h
        ) {
          player.y = p.y + p.h;
          player.vy = 0;
          if (p.type === "letter" && !player.bumpLock) {
            player.bumpLock = true;
            player.bumpAnim = 18;
            onLetterHit(p.id);
          }
          break;
        }
      }
    }

    function update() {
      player.prevY = player.y;
      player.vx = 0;
      if (keys["a"]) {
        player.vx = -player.speed;
        player.facing = -1;
      }
      if (keys["d"]) {
        player.vx = player.speed;
        player.facing = 1;
      }
      if ((keys["w"] || keys[" "]) && player.grounded) {
        player.vy = player.jump;
        player.grounded = false;
      }
      if (Math.abs(player.vx) > 0) player.walkFrame++;
      player.vy += gravity;
      player.x += player.vx;
      const all = [...staticPlatforms, ...getLetterPlatforms()];
      resolveH(all);
      player.y += player.vy;
      resolveV(all);
      if (player.vy > 0) player.bumpLock = false;
      if (player.bumpAnim > 0) player.bumpAnim--;
      if (player.x < 0) player.x = 0;
      if (player.x + player.w > canvas.width)
        player.x = canvas.width - player.w;
      if (player.y > canvas.height + 80) {
        player.x = 60;
        player.y = 0;
        player.vy = 0;
      }
    }

    function rr(x, y, w, h, r) {
      r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function drawPlatform(p) {
      const T = THEMES[fun ? "fun" : "dark"];
      if (p.type === "letter") {
        ctx.strokeStyle = T.letterLine;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(p.x + 4, p.y + p.h - 1);
        ctx.lineTo(p.x + p.w - 4, p.y + p.h - 1);
        ctx.stroke();
        ctx.setLineDash([]);
        return;
      }
      const cfg =
        p.type === "ground" ? T.ground : p.type === "stair" ? T.stair : T.float;
      if (p.type === "ground") {
        ctx.fillStyle = cfg.fill;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = cfg.stripe;
        for (let sx = 0; sx < p.w; sx += 40)
          ctx.fillRect(p.x + sx, p.y, 20, p.h);
        ctx.strokeStyle = cfg.edge;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, p.y + 1);
        ctx.lineTo(p.w, p.y + 1);
        ctx.stroke();
        return;
      }
      ctx.fillStyle = cfg.fill;
      rr(p.x, p.y, p.w, p.h, 6);
      ctx.fill();
      ctx.fillStyle = cfg.top;
      rr(p.x, p.y, p.w, p.h * 0.45, 6);
      ctx.fill();
      ctx.strokeStyle = cfg.edge;
      ctx.lineWidth = 1.5;
      rr(p.x, p.y, p.w, p.h, 6);
      ctx.stroke();
    }

    function drawPlayer() {
      const T = THEMES[fun ? "fun" : "dark"];
      const { x, y, w, h, facing, bumpAnim, walkFrame } = player;
      const bumping = bumpAnim > 0;
      const walking = Math.abs(player.vx) > 0.5;
      const legSwing = walking ? Math.sin(walkFrame * 0.38) * 5 : 0;
      const isFun = fun;

      const bodyCol = isFun ? "#ffffff" : "#c8c8ff";
      const headCol = isFun ? "#f0f0ff" : "#e0e0ff";
      const hatCol = isFun ? "#7c2d12" : "#7c7cff";
      const legCol = isFun ? "#44403c" : "#2a2d4e";
      const shoeCol = isFun ? "#1c1917" : "#1a1a3e";
      const eyeCol = "#0b0d10";

      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h + 3, w * 0.44, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = legCol;
      rr(x + 3, y + h * 0.7 + legSwing, w * 0.36, h * 0.32, 3);
      ctx.fill();
      rr(x + w - 3 - w * 0.36, y + h * 0.7 - legSwing, w * 0.36, h * 0.32, 3);
      ctx.fill();

      ctx.fillStyle = shoeCol;
      rr(x + 1, y + h - 8 + legSwing, w * 0.44, 9, 3);
      ctx.fill();
      rr(x + w - 1 - w * 0.44, y + h - 8 - legSwing, w * 0.44, 9, 3);
      ctx.fill();

      ctx.fillStyle = bodyCol;
      rr(x + 2, y + h * 0.36, w - 4, h * 0.38, 5);
      ctx.fill();

      ctx.fillStyle = headCol;
      rr(x + 3, y + h * 0.08, w - 6, h * 0.3, 6);
      ctx.fill();

      ctx.fillStyle = hatCol;
      rr(x - 1, y + h * 0.08, w + 2, h * 0.06, 3);
      ctx.fill();
      rr(x + 4, y, w - 8, h * 0.12, 4);
      ctx.fill();

      const eyeX = facing > 0 ? x + w - 9 : x + 6;
      ctx.fillStyle = eyeCol;
      ctx.beginPath();
      ctx.arc(eyeX, y + h * 0.19, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(eyeX + 1, y + h * 0.185, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawCoinPop() {
      if (player.bumpAnim <= 0) return;
      const T = THEMES[fun ? "fun" : "dark"];
      const t = player.bumpAnim / 18;
      ctx.save();
      ctx.globalAlpha = t;
      ctx.shadowColor = T.coinGlow;
      ctx.shadowBlur = 14;
      ctx.fillStyle = T.coin;
      ctx.font = `bold ${14 + (1 - t) * 14}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("✦", player.x + player.w / 2, player.y - 8 - (1 - t) * 28);
      ctx.restore();
    }

    // ── ROTATING QUOTES — upper centre area ───────────────
    // Written to reflect Harpreet's actual philosophy: blockchain, creativity,
    // research, building real systems, thinking deeply before shipping.
    const QUOTES = [
      "Don't just build — understand deeply.",
      "Blockchain isn't a buzzword. It's infrastructure.",
      "Every patent starts as a sketch.",
      "Research first. Code second. Ship third.",
      "Decentralise the system. Centralise the thinking.",
      "Great engineering is 80% curiosity.",
      "Smart contracts don't lie. People do.",
      "Logic is the tool. Creativity is the edge.",
    ];
    let quoteIndex = 0;
    let quoteTimer = 0;
    const QUOTE_INTERVAL = 210; // ~3.5s at 60fps

    function drawQuotes() {
      const T = THEMES[fun ? "fun" : "dark"];
      quoteTimer++;
      if (quoteTimer >= QUOTE_INTERVAL) {
        quoteTimer = 0;
        quoteIndex = (quoteIndex + 1) % QUOTES.length;
      }
      // smooth fade in / fade out over 25 frames
      let alpha = 1;
      if (quoteTimer < 25) alpha = quoteTimer / 25;
      else if (quoteTimer > QUOTE_INTERVAL - 25)
        alpha = (QUOTE_INTERVAL - quoteTimer) / 25;

      const cx = canvas.width / 2;
      const qy = canvas.height * 0.3;
      const fontSize = Math.min(35, Math.max(18, canvas.width * 0.03));

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // decorative opening quote mark — large and faint
      // ctx.globalAlpha = alpha * 0.18;
      // ctx.fillStyle = T.hint.text;
      // ctx.font = `300 ${fontSize * 3.2}px Georgia, serif`;
      // ctx.fillText('"', cx - fontSize * 4.5, qy - fontSize * 0.6);

      // main quote text
      ctx.globalAlpha = alpha * 0.42;
      ctx.fillStyle = T.hint.text;
      ctx.font = `500 ${fontSize}px 'Sora', sans-serif`;
      ctx.fillText(QUOTES[quoteIndex], cx, qy);

      // thin underline accent
      const tw = ctx.measureText(QUOTES[quoteIndex]).width;
      ctx.globalAlpha = alpha * 0.18;
      ctx.strokeStyle = T.accentCol;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - tw * 0.25, qy + fontSize * 1.3);
      ctx.lineTo(cx + tw * 0.25, qy + fontSize * 1.3);
      ctx.stroke();

      ctx.globalAlpha = alpha * 0.18;
      ctx.strokeStyle = T.accentCol;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - tw * 0.25, qy - fontSize * 1.3);
      ctx.lineTo(cx + tw * 0.25, qy - fontSize * 1.3);
      ctx.stroke();

      ctx.restore();
    }

    // ── CONTROLS HINT — left side, fixed so W is never clipped ─
    function drawHint() {
      const T = THEMES[fun ? "fun" : "dark"];
      // anchor so the full WASD cluster sits inside the screen
      // cluster is 3 keys wide = 3*40 + 2*8 gaps = 136px, start at x=20
      const startX = 30; // left edge of the A key
      const startY = 90;
      const ks = 44; // key size
      const gap = 8; // gap between keys

      const layout = [
        // [col, row, label, wide]
        [1, 0, "W", false],
        [0, 1, "A", false],
        [1, 1, "S", false],
        [2, 1, "D", false],
        [0, 2, "SPACE", true], // spans 3 cols
      ];

      ctx.save();

      layout.forEach(([col, row, label, wide]) => {
        const kw = wide ? ks * 3 + gap * 2 : ks;
        const kx = startX + col * (ks + gap);
        const ky = startY + row * (ks + gap);

        ctx.globalAlpha = 0.09;
        ctx.fillStyle = T.hint.key;
        rr(kx, ky, kw, ks, 6);
        ctx.fill();

        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = T.hint.key;
        ctx.lineWidth = 1.5;
        rr(kx, ky, kw, ks, 6);
        ctx.stroke();

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = T.hint.text;
        ctx.font = `600 ${wide ? "10px" : "13px"} 'Sora', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, kx + kw / 2, ky + ks / 2);
      });

      // label
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = T.hint.text;
      ctx.font = "13px 'Sora', monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(
        "jump & hit the name ↑",
        startX,
        startY + ks * 3 + gap * 2 + 18,
      );

      ctx.restore();
    }

    // ── SCROLL INDICATOR — centred at bottom ──────────────
    function drawScrollHint() {
      const T = THEMES[fun ? "fun" : "dark"];
      const cx = canvas.width / 2;
      const baseY = canvas.height - 48;
      const bounce = Math.sin(Date.now() / 600) * 5;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // vertical line above chevron
      const lineTop = baseY - 28 + bounce;
      const grad = ctx.createLinearGradient(cx, lineTop - 20, cx, lineTop);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, T.scrollCol);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(cx, lineTop - 20);
      ctx.lineTo(cx, lineTop);
      ctx.stroke();

      // single chevron
      ctx.globalAlpha = 0.7;
      ctx.strokeStyle = T.scrollCol;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 8, baseY - 10 + bounce);
      ctx.lineTo(cx, baseY - 3 + bounce);
      ctx.lineTo(cx + 8, baseY - 10 + bounce);
      ctx.stroke();

      // scroll label
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = T.scrollCol;
      ctx.font = "12px 'Sora', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("scroll", cx, baseY + 14 + bounce);

      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawQuotes();
      drawHint();
      staticPlatforms.forEach(drawPlatform);
      getLetterPlatforms().forEach(drawPlatform);
      drawPlayer();
      drawCoinPop();
      drawScrollHint();
    }

    let rafId;
    const loop = () => {
      update();
      draw();
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Theme toggle — fixed top right, always visible */}
      <button
        onClick={onToggleTheme}
        style={{
          position: "fixed",
          top: "4.5rem",
          right: "1.8rem",
          zIndex: 300,
          background: fun ? "rgba(11,13,20,0.82)" : "rgba(28,14,0,0.82)",
          border: `1px solid ${fun ? "rgba(124,124,255,0.45)" : "rgba(249,115,22,0.5)"}`,
          borderRadius: "8px",
          color: fun ? "#7c7cff" : "#f97316",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "0.4rem 0.9rem",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
          fontFamily: "'Sora', monospace",
          lineHeight: 1,
        }}
      >
        {fun ? "◑ Dark" : "◐ Warm"}
      </button>
    </>
  );
}
