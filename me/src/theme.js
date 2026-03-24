const THEMES = {
  dark: {
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

  fun: {
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
};

export function applyThemeVars(mode = "fun") {
  const root = document.documentElement;
  const theme = THEMES[mode];

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  document.body.style.background = theme["--bg-dark"];
}
