import { useEffect, useRef } from "react";

export default function MiniGame({ onLetterHit }) {
  const canvasRef = useRef(null);
  let frameId = 0;
  let lastBumpFrame = -1;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    function getLetterPlatforms() {
      const canvasRect = canvas.getBoundingClientRect();
      const letters = document.querySelectorAll(".game-letter");
      const platforms = [];

      letters.forEach((el) => {
        const rect = el.getBoundingClientRect();

        platforms.push({
          id: el.dataset.letterId,
          x: rect.left - canvasRect.left,
          y: rect.top - canvasRect.top,
          w: rect.width,
          h: rect.height,
          type: "letter",
        });
      });

      return platforms;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ---------------- PLAYER ---------------- */
    const player = {
      x: 150,
      y: 0,
      w: 40,
      h: 40,
      vx: 0,
      vy: 0,
      speed: 5,
      jump: -14,
      grounded: false,

      bumpLock: false,
    };

    const gravity = 0.6;
    const keys = {};

    window.addEventListener("keydown", (e) => (keys[e.key] = true));
    window.addEventListener("keyup", (e) => (keys[e.key] = false));

    /* ---------------- PLATFORMS ---------------- */

    // Base ground
    const ground = {
      x: 0,
      y: canvas.height - 80,
      w: canvas.width,
      h: 30,
      type: "ground",
    };
    // Pipes
    const pipes = [
      { x: 200, y: ground.y - 120, w: 90, h: 30, type: "pipe" },
      { x: 300, y: ground.y - 120, w: 90, h: 30, type: "pipe" },
      { x: 400, y: ground.y - 120, w: 90, h: 30, type: "pipe" },
      { x: 500, y: ground.y - 120, w: 90, h: 30, type: "pipe" },
      { x: 600, y: ground.y - 120, w: 90, h: 30, type: "pipe" },

      { x: 100, y: ground.y - 210, w: 90, h: 30, type: "pipe" },
      // { x: 200, y: ground.y - 280, w: 90, h: 30, type: "pipe" },
    ];

    // // Letter platforms (mocked for now)
    // const letterPlatforms = getLetterPlatforms().map((p) => ({
    //   ...p,
    //   y: p.y, // lifted higher than pipes
    // }));
    function getPlatforms() {
      return [ground, ...pipes, ...getLetterPlatforms()];
    }
    const platforms = getPlatforms();

    function resolveHorizontalCollisions() {
      platforms.forEach((p) => {
        if (player.y < p.y + p.h && player.y + player.h > p.y) {
          // Moving RIGHT → hit LEFT side of platform
          if (player.vx > 0 && player.x + player.w > p.x && player.x < p.x) {
            player.x = p.x - player.w;
          }

          // Moving LEFT → hit RIGHT side of platform
          if (
            player.vx < 0 &&
            player.x < p.x + p.w &&
            player.x + player.w > p.x + p.w
          ) {
            player.x = p.x + p.w;
          }
        }
      });
    }
    function resolveVerticalCollisions() {
      player.grounded = false;

      for (let i = 0; i < platforms.length; i++) {
        const p = platforms[i];

        const overlapX = player.x < p.x + p.w && player.x + player.w > p.x;

        if (!overlapX) continue;

        // ===== LANDING (TOP COLLISION) =====
        if (
          player.vy > 0 &&
          player.prevY + player.h <= p.y &&
          player.y + player.h >= p.y
        ) {
          player.y = p.y - player.h;
          player.vy = 0;
          player.grounded = true;
          break; // 🔥 STOP ALL COLLISION CHECKS
        }

        // ===== CEILING COLLISION (EDGE-DETECTED) =====
        if (
          player.vy < 0 &&
          player.prevY >= p.y + p.h &&
          player.y < p.y + p.h
        ) {
          player.y = p.y + p.h;
          player.vy = 0;

          // 🔥 Mario bump ONLY for letters
          if (p.type === "letter" && !player.bumpLock) {
            player.bumpLock = true;
            onLetterHit(p.id);
          }

          break; // 🔥 THIS IS THE MOST IMPORTANT LINE
        }
      }
    }

    /* ---------------- UPDATE ---------------- */
    function update() {
      player.prevY = player.y;

      // Input
      player.vx = 0;
      if (keys["a"] || keys["ArrowLeft"]) player.vx = -player.speed;
      if (keys["d"] || keys["ArrowRight"]) player.vx = player.speed;

      if ((keys["w"] || keys[" "] || keys["ArrowUp"]) && player.grounded) {
        player.vy = player.jump;
        player.grounded = false;
      }

      // Gravity
      player.vy += gravity;

      // Horizontal
      player.x += player.vx;
      resolveHorizontalCollisions();

      // Vertical
      player.y += player.vy;
      resolveVerticalCollisions();

      // Unlock bump when falling
      if (player.vy > 0) {
        player.bumpLock = false;
      }

      // World bounds
      if (player.x < 0) player.x = 0;
      if (player.x + player.w > canvas.width)
        player.x = canvas.width - player.w;
    }
    /* ---------------- DRAW ---------------- */
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw platforms (ground, pipes, letters)
      platforms.forEach((p) => {
        ctx.fillStyle =
          p.type === "letter"
            ? "#7c7cff"
            : p.type === "pipe"
              ? "#4ade80"
              : "#2a2d38";

        ctx.fillRect(p.x, p.y, p.w, p.h);
      });

      // // 🔴 DEBUG: draw letter colliders
      // letterPlatforms.forEach((p) => {
      //   ctx.strokeStyle = "red";
      //   ctx.lineWidth = 2;
      //   ctx.strokeRect(p.x, p.y, p.w, p.h);
      // });

      // Draw player
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(player.x, player.y, player.w, player.h);
    }

    function loop() {
      frameId++;
      update();
      draw();
      requestAnimationFrame(loop);
    }

    loop();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
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
  );
}
