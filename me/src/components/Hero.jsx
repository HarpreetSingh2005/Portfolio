import AnimateText from "./AnimateText";
import MiniGame from "./MiniGame/Game";
import { useState } from "react";
import "./hero.css";

// ─── REAL DATA ────────────────────────────────────────────────

const SKILLS = [
  {
    title: "Blockchain & Web3",
    items: [
      "Ethereum",
      "Solidity",
      "Hardhat",
      "Ganache",
      "ethers.js",
      "ERC-20",
      "ERC-721",
      "ERC-1155",
    ],
  },
  {
    title: "Programming",
    items: ["Python", "C", "C++", "JavaScript"],
  },
  {
    title: "Frontend & Creative",
    items: ["React.js", "Node.js", "Three.js", "GSAP", "Tailwind CSS"],
  },
  {
    title: "Research & Writing",
    items: [
      "Smart Contract Design",
      "Protocol Research",
      "Technical Writing",
      "Patent Filing",
    ],
  },
];

const PROJECTS = [
  {
    id: "rwa",
    featured: true,
    emoji: "🏗️",
    title: "Real-World Asset Tokenization Platform",
    description:
      "Blockchain platform enabling fractional ownership of physical assets — real estate, commodities — using the ERC-1155 multi-token standard. Solidity contracts are complete; frontend integration in progress. Solves the liquidity problem of traditionally illiquid assets by putting them on-chain.",
    tagLabels: [
      { label: "Blockchain", type: "blockchain" },
      { label: "In Progress", type: "systems" },
    ],
    year: "2025",
    link: "https://github.com/HarpreetSingh2005/Real-World-Asset-Tokenization-Platform",
  },
  {
    id: "crowdcoin",
    featured: false,
    title: "CrowdCoin",
    description:
      "Decentralised crowdfunding dApp inspired by Kickstarter — built entirely on Ethereum. Campaign creators set spending rules enforced by smart contracts; contributors vote on fund releases. Deployed and tested on Ethereum testnet with Hardhat.",
    tagLabels: [
      { label: "Blockchain", type: "blockchain" },
      { label: "dApp", type: "systems" },
    ],
    year: "2025",
    link: "https://github.com/HarpreetSingh2005/crowdcoin",
  },
  {
    id: "cubecrypt",
    featured: false,
    title: "CubeCrypt Encryption Algorithm",
    description:
      "A novel symmetric encryption algorithm in Python inspired by Rubik's cube permutations, designed for secure file transmission. Published independently — a working, documented cryptographic scheme with practical applications.",
    tagLabels: [
      { label: "Research", type: "research" },
      { label: "Published", type: "research" },
    ],
    year: "2025",
    link: null,
  },
  {
    id: "apple",
    featured: false,
    title: "Apple Website Replica",
    description:
      "Pixel-level recreation of Apple's hero and product sections using React, Three.js for 3D model rendering, and GSAP for scroll-driven animations. A deep dive into performance-first animation engineering.",
    tagLabels: [
      { label: "Creative", type: "creative" },
      { label: "3D / GSAP", type: "creative" },
    ],
    year: "2024",
    link: "https://github.com/HarpreetSingh2005/Gsap-Apple-LandingPage",
  },
  {
    id: "medical-ledger",
    featured: false,
    title: "Digital Ledger for Medical Records",
    description:
      "Research presented at ICIAS 2025 — International Conference on Computational Intelligence and Autonomous Systems. Proposes a decentralised, tamper-proof system for secure patient record access using blockchain.",
    tagLabels: [
      { label: "Research", type: "research" },
      { label: "ICIAS 2025", type: "research" },
    ],
    year: "2025",
    link: null,
  },
  {
    id: "beyond-limitz",
    featured: false,
    emoji: "📚",
    title: "Beyond LimitZ: Journey to Mindset Success",
    description:
      "Self-published book on mindset engineering, overcoming limitations, and achieving personal excellence. Authored under pen name Mr. Mulbbies. Explores practical strategies for mental resilience and success.",
    tagLabels: [
      { label: "Published", type: "research" },
      { label: "Personal Development", type: "research" },
    ],
    year: "2024",
    link: "https://www.amazon.com/Beyond-LimitZ-Journey-Mindset-Success/dp/B0D45LKYFV",
  },
];

const ACHIEVEMENTS = [
  { icon: "🥈", text: "2nd Place — Internal Smart India Hackathon 2025" },
  { icon: "🏅", text: "4th Place — Ignite Ideathon, University Level 2025" },
  {
    icon: "🧠",
    text: "2nd Place — Logic League, DSA & Problem Solving, Avikansha Fest 2025 (NMIMS)",
  },
  {
    icon: "📖",
    text: 'Author — "Beyond LimitZ: Journey to Mindset Success" (Pen Name: Mr. Mulbbies)',
  },
  { icon: "🪖", text: "NCC 'A' Grade Certificate" },
  {
    icon: "♟️",
    text: "Volunteered — FIDE Rated Chess Championship, 100+ participants",
  },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────

function SkillBlock({ title, items }) {
  return (
    <div className="skill-block">
      <h3>{title}</h3>
      <div className="skill-tags">
        {items.map((item) => (
          <span key={item} className="skill-tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const inner = (
    <div className={`project-card ${project.featured ? "featured" : ""}`}>
      <div className="project-text">
        <div className="project-tag-row">
          {project.tagLabels.map((t) => (
            <span key={t.label} className={`project-tag ${t.type}`}>
              {t.label}
            </span>
          ))}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card-footer">
          <span className="project-year">{project.year}</span>
          {project.link && <span className="project-arrow">↗</span>}
        </div>
      </div>
    </div>
  );

  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card-link"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────

export default function HeroText() {
  const ROW1 = ["HARPREET", "SINGH"];
  const ROW2 = ["GANDHI"];
  const [activeLetters, setActiveLetters] = useState({});
  const [isFun, setIsFun] = useState(false);

  function toggleFun() {
    setIsFun((prev) => !prev);
  }
  // ONE hit = on, second hit = off
  function triggerLetter(id) {
    setActiveLetters((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const renderWord = (word, rowKey, wi, isFun) => {
    const prefix = `${rowKey}-${word}`;
    return (
      <div className="name-word" key={prefix}>
        {word.split("").map((char, i) => {
          const id = `${prefix}-${i}`;
          return (
            <div
              className="letter-box game-letter"
              data-letter-id={id}
              key={id}
            >
              <AnimateText
                char={char}
                active={!!activeLetters[id]}
                fun={isFun}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* ══════════════════════════════
          FIXED HERO SCENE
      ══════════════════════════════ */}
      <section className="hero-scene">
        <MiniGame
          onLetterHit={triggerLetter}
          fun={isFun}
          onToggleTheme={toggleFun}
        />

        <div className="name-section">
          <p className="hero-greeting">Hello, I'm</p>
          <div className="name-row">
            {ROW1.map((word, i) => renderWord(word, "r1", i, isFun))}
          </div>
          {/* <div className="name-row name-row-2">
            {ROW2.map((word, i) => renderWord(word, "r2", i))}
          </div> */}
          <p className="hero-tagline">
            Blockchain engineer · Researcher · Builder of things that matter
          </p>
        </div>

        <div className="hero-scroll-hint">
          <span>scroll</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ══════════════════════════════
          SCROLLABLE OVERLAY
      ══════════════════════════════ */}
      <div className="overlay">
        {/* ── ABOUT ─────────────────── */}
        <section className="panel about" id="about">
          <div className="about-inner">
            <p className="section-eyebrow">Who I am</p>
            <h2 className="section-title">
              Engineer. Researcher. <span className="highlight">Builder.</span>
            </h2>

            <div className="about-content">
              <div className="about-label">
                {["A", "B", "O", "U", "T"].map((char, i) => (
                  <span key={i} className="about-letter">
                    {char}
                  </span>
                ))}
              </div>

              <div className="about-body">
                <p>
                  I'm a{" "}
                  <strong>
                    blockchain-focused Computer Science undergraduate
                  </strong>{" "}
                  with hands-on expertise in Solidity smart contract development
                  and dApp deployment. I don't just build projects — I explore
                  ideas deeply, question assumptions, and turn concepts into
                  working, real-world systems.
                </p>
                <p>
                  My work spans{" "}
                  <strong>
                    decentralised applications, encryption algorithms, smart
                    contracts, and protocol-level research
                  </strong>
                  . I've presented research at{" "}
                  <strong>international conferences</strong>, published a{" "}
                  <strong>novel encryption algorithm</strong>, filed a{" "}
                  <strong>patent</strong>, and authored a{" "}
                  <strong>self-help book</strong> under the pen name Mr.
                  Mulbbies — each one a way to document ideas and push them
                  forward.
                </p>
                <p>
                  Alongside engineering, I'm a{" "}
                  <strong>creative enthusiast</strong> — I sketch system
                  architectures, build 3D web experiences, and apply the same
                  problem-solving lens to design that I do to code. I believe
                  the best technology sits at the balance of{" "}
                  <strong>logic, research, and creativity</strong>.
                </p>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-card-icon">🔗</div>
                <h3>Blockchain</h3>
                <p>dApps, smart contracts, and protocol research on Ethereum</p>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon">🔬</div>
                <h3>Research</h3>
                <p>
                  Published at ICIAS 2025 · CubeCrypt algorithm · BOLGA
                  framework
                </p>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon">📖</div>
                <h3>Author</h3>
                <p>"Beyond LimitZ" on Amazon · 4 articles on Medium</p>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon">🏆</div>
                <h3>Hackathons</h3>
                <p>Award-winning developer, Smart India Hackathon 2025</p>
              </div>
            </div>

            <p className="about-footer">
              Always learning. Always building. Always sketching the next idea.
            </p>
          </div>
        </section>

        {/* ── SKILLS ────────────────── */}
        <section className="panel skills" id="skills">
          <div className="skills-inner">
            <h2>Skills</h2>
            <p className="section-sub">What I work with</p>
            <div className="skill-grid">
              {SKILLS.map((s) => (
                <SkillBlock key={s.title} title={s.title} items={s.items} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WORK ──────────────────── */}
        <section className="panel work" id="work">
          <div className="work-inner">
            <h2>Work</h2>
            <p className="section-sub">
              Projects, research and things I've shipped
            </p>
            <div className="projects-grid">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            <div className="achievements-strip">
              <p
                className="section-eyebrow"
                style={{ textAlign: "center", marginBottom: "2rem" }}
              >
                Achievements
              </p>
              <div className="achievements-grid">
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} className="achievement-item">
                    <span className="achievement-icon">{a.icon}</span>
                    <span className="achievement-text">{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ───────────────── */}
        <section className="panel contact" id="contact">
          <div className="contact-inner">
            <p className="section-eyebrow">Get in touch</p>
            <h2 className="section-title contact-title">
              Let's build something
              <span className="highlight"> together.</span>
            </h2>
            <p className="contact-sub">
              I'm open to internships, collaborations, research partnerships,
              and interesting conversations about blockchain and systems design.
            </p>

            <div className="contact-links">
              <a
                href="mailto:harpreetsingh02092005@gmail.com"
                className="contact-link primary"
              >
                <span className="contact-link-icon">✉️</span>
                <div>
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">
                    harpreetsingh02092005@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/harpreet-singh-919b52247/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">💼</span>
                <div>
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-value">
                    harpreet-singh-919b52247
                  </div>
                </div>
              </a>

              <a
                href="https://github.com/HarpreetSingh2005"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">⌨️</span>
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">HarpreetSingh2005</div>
                </div>
              </a>

              <a
                href="https://medium.com/@harpreetsingh-mrmullbies"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">✍️</span>
                <div>
                  <div className="contact-link-label">Medium</div>
                  <div className="contact-link-value">
                    @harpreetsingh-mrmullbies
                  </div>
                </div>
              </a>

              <a
                href="https://a.co/d/03W9riP3"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">📚</span>
                <div>
                  <div className="contact-link-label">Book</div>
                  <div className="contact-link-value">
                    Beyond LimitZ on Amazon
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────── */}
        <footer className="site-footer">
          <div className="footer-name">Harpreet Singh Gandhi</div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="footer-copy">
            Built with curiosity, caffeine, and a Mario platformer — ©{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
}
