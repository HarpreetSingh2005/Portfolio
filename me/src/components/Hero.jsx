import { applyThemeVars } from "../theme";
import AnimateText from "./AnimateText";
import MiniGame from "./MiniGame/Game";
import { useState, useEffect } from "react";
import "./hero.css";
import photo from "./images/image.png";
import { ReactComponent as Linkedin } from "./images/linkedin.svg";
import { ReactComponent as Github } from "./images/github.svg";
import { ReactComponent as Gmail } from "./images/gmail.svg";
import { ReactComponent as Medium } from "./images/medium.svg";
// ─── REAL DATA ────────────────────────────────────────────────

const SKILLS = [
  {
    title: "Languages",
    items: ["Python", "Java", "C", "C++", "JavaScript", "Solidity", "SQL"],
  },
  {
    title: "Frontend",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Mongoose"],
  },
  {
    title: "AI / ML",
    items: [
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "LLMs",
      "Generative AI",
      "AI Agents",
      "Multi-Agent Systems",
    ],
  },
  {
    title: "Blockchain",
    items: ["Solidity", "Web3.js", "ethers.js", "Ethereum", "Sepolia"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "Selenium"],
  },
];

const PROJECTS = [
  {
    id: "prune",
    featured: true,
    emoji: "🌱",
    title: "PRUNE — AI Discovery Platform",
    description:
      "A curated AI discovery platform focused on helping people discover useful AI tools without the overwhelming noise of large AI directories. PRUNE focuses on discovering new AI products, understanding what they do, who they are useful for, and separating useful products from hype.",
    tagLabels: [
      { label: "AI", type: "research" },
      { label: "Product", type: "creative" },
    ],
    year: "2026",
    link: "https://theprune.in/",
  },
  {
    id: "seha",
    featured: false,
    title: "SEHA — Smart Contract Explainable Hybrid Analyzer",
    description:
      "A Python-based smart contract security analysis system focused on detecting vulnerabilities and explaining findings. Combines program analysis with explainable results to make security reports easier to understand and act on.",
    tagLabels: [
      { label: "Cybersecurity", type: "systems" },
      { label: "Research", type: "research" },
    ],
    year: "2026",
    link: "https://github.com/HarpreetSingh2005/solidity-analyzer",
  },
  {
    id: "writing-club",
    featured: false,
    emoji: "✍️",
    title: "Writing Club — Multi-Agent AI Writing Studio",
    description:
      "A multi-agent AI writing environment designed to support the writing process through specialized AI agents working across different stages of ideation, drafting, refinement, and content development.",
    tagLabels: [
      { label: "AI Agents", type: "research" },
      { label: "Multi-Agent", type: "systems" },
      { label: "Product", type: "creative" },
    ],
    year: "2026",
    link: null,
  },
  {
    id: "banking-ledger",
    featured: false,
    title: "Banking Ledger System",
    description:
      "A banking transaction and ledger management system designed around accounts, transactions, and financial record management.",
    tagLabels: [
      { label: "Backend", type: "systems" },
      { label: "Database", type: "creative" },
    ],
    year: "2026",
    link: "https://github.com/HarpreetSingh2005/banking-ledger-system",
  },
  {
    id: "music",
    featured: true,
    emoji: "🎵",
    title: "Music Streaming Platform",
    description:
      "A full-stack music streaming application exploring modern web development, APIs, authentication, and media management.",
    tagLabels: [
      { label: "Full-Stack", type: "systems" },
      { label: "React", type: "creative" },
      { label: "APIs", type: "research" },
    ],
    year: "2024",
    link: "https://github.com/HarpreetSingh2005/spotify-replica",
    live: "https://music-spotify-replica.vercel.app/",
  },
];

const RESEARCH_ITEMS = [
  {
    id: "cubecrypt",
    title: "CubeCrypt — Symmetric Encryption Algorithm",
    description:
      "A cryptographic encryption project based around a symmetric encryption approach. Published cryptographic system with an official patent (IN 202511098477 A).",
    tagLabels: [
      { label: "Patent Published", type: "research" },
      { label: "IN 202511098477 A", type: "patent-tag" },
    ],
    year: "2025",
    link: "https://github.com/HarpreetSingh2005/HarpreetSingh2005/blob/main/Patent.png",
  },
  {
    id: "medical-ledger",
    title: "Medical Ledger — Blockchain-Based Medical Record Management",
    description:
      "Research work exploring blockchain and digital ledger technologies for secure and tamper-resistant management of medical records. Presented at ICIAS 2025 (International Conference on Computational Intelligence and Autonomous Systems).",
    tagLabels: [
      { label: "Research", type: "research" },
      { label: "ICIAS 2025", type: "systems" },
    ],
    year: "2025",
    link: null,
  },
  {
    id: "book-chapter",
    title: "Governance, Ethics and Regulatory Practices",
    description:
      "Co-authored the book chapter 'Governance, Ethics and Regulatory Practices,' published by Deep Science Publishing in the book 'Artificial Intelligence in Cybersecurity and Risk Management'. The chapter explores ethical AI governance, regulatory frameworks, and responsible AI adoption in cybersecurity.",
    tagLabels: [
      { label: "Book Chapter", type: "research" },
      { label: "Cybersecurity", type: "systems" },
      { label: "Deep Science", type: "creative" },
    ],
    year: "2025",
    link: "https://deepscienceresearch.com/dsr/catalog/book/628",
  },
  {
    id: "beyond-limitz",
    emoji: "📚",
    title: "Beyond LimitZ — Journey to Mindset Success",
    description:
      "Author of Beyond LimitZ — Journey to Mindset Success, a self-help book focused on mindset, personal growth, discipline, and the journey toward meaningful goals.",
    tagLabels: [
      { label: "Author: Mr. Mulbbies", type: "creative" },
      { label: "Personal Growth", type: "research" },
    ],
    year: "2024",
    link: "https://www.amazon.com/dp/B0D21CN7QR?lv=shuf&bestFormat=true&channelId=704&plpRedirect=mhFallback",
  },
];

const ACHIEVEMENTS = [
  {
    icon: "🥈",
    text: "Internal Smart India Hackathon 2025 — Second Position with Team HexaWipe",
  },
  {
    icon: "🥈",
    text: "Logic League — Second Position, DSA, NMIMS",
  },
  {
    icon: "🏆",
    text: "Punjab State Amateur Below 1700 FIDE Rated Chess Championship — Arbiter and Guest of Honour",
  },
  {
    icon: "🏅",
    text: "Startup Sync 2025 Business Ideathon — Fourth Position",
  },
  {
    icon: "♟️",
    text: "Sangathan Chess Competition — First Position",
  },
  {
    icon: "🪖",
    text: "NCC 'A' Certificate",
  },
  {
    icon: "✍️",
    text: "Published Writer on Medium",
  },
];

const EDUCATION = {
  degree: "B.Tech — Computer Science & Engineering",
  institution: "Amity University Punjab",
  expectedGraduation: "Expected Graduation: 2027",
};

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
  // const ROW2 = ["GANDHI"];
  const [activeLetters, setActiveLetters] = useState({});
  const [isFun, setIsFun] = useState(false);
  useEffect(() => {
    applyThemeVars(isFun ? "fun" : "dark");
  }, [isFun]);
  const isMobile = window.innerWidth < 768;

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
              onClick={isMobile ? () => triggerLetter(id) : undefined}
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
         HERO SCENE
      ══════════════════════════════ */}
      <section className="hero-scene">
        {!isMobile && (
          <MiniGame
            onLetterHit={triggerLetter}
            fun={isFun}
            onToggleTheme={toggleFun}
          />
        )}
        <button className="theme-toggle hide-on-laptop" onClick={toggleFun}>
          {isFun ? "◑" : "◐"}
        </button>

        <div className="name-section">
          <p className="hero-greeting">Hello, I'm</p>
          <div className="name-row">
            {ROW1.map((word, i) => renderWord(word, "r1", i, isFun))}
          </div>
          {/* <div className="name-row name-row-2">
            {ROW2.map((word, i) => renderWord(word, "r2", i))}
          </div> */}
          <p className="hero-subtext">
            AI & Software Developer · Researcher · Builder of Things That Matter
          </p>
          {/* <p className="hero-subtext">
            Computer Science & Engineering student building practical software, AI-powered systems, and experimental products.
          </p> */}
          <p className="hero-mobile-hint hide-on-laptop">
            Tap letters to interact
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
              Software Developer. AI Explorer. <span className="highlight">Researcher.</span>
            </h2>
            {/* Main content + image wrapper */}
            <div className="about-main">
              {/* Left: text content */}
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
                      Computer Science & Engineering student at Amity University Punjab
                    </strong>
                    , with an interest in building practical software and exploring how emerging technologies can solve real problems. My work spans full-stack development, AI and LLM systems, backend engineering, automation, cybersecurity, and data-driven applications.
                  </p>
                  <p>
                    I enjoy taking an idea from an early concept to something people can actually use. I've worked on products involving{" "}
                    <strong>AI discovery, multi-agent systems, web applications, APIs, databases, and intelligent workflows</strong>
                    , while also exploring technical problems through research and experimentation.
                  </p>
                  <p>
                    Alongside development, I'm interested in understanding the systems behind the technology I build. This has led me toward research in areas such as{" "}
                    <strong>cybersecurity, cryptography, AI governance, and decentralized systems</strong>
                    , with work presented at conferences, published as a book chapter, and a patent in cryptographic technology.
                  </p>
                  <p>
                    I'm still exploring, learning, and building — sometimes through code, sometimes through research, and sometimes simply by trying to understand how something works.
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.5rem",
                    }}
                  >
                    {" "}
                    "Build with <strong>logic</strong>. Explore with{" "}
                    <strong>curiosity</strong>. Create with{" "}
                    <strong>purpose</strong>."
                  </p>
                </div>
              </div>
              {/* Right: your photo */}
              <div className="about-photo-wrapper">
                <img
                  src={photo} // ← replace with your image path [NEW_PROFILE_PHOTO_REQUIRED]
                  alt="Harpreet Singh - Software Developer & Researcher"
                  className="about-photo"
                />
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-icon">🛠️</div>
                  <h3>Software Development</h3>
                </div>
                <p>Products, prototypes, and software built from idea to implementation.</p>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-icon">🤖</div>
                  <h3>AI & Agents</h3>
                </div>
                <p>LLMs, generative AI, AI agents, automation, and intelligent applications.</p>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-icon">🔬</div>
                  <h3>Research & Writing</h3>
                </div>
                <p>Research, technical writing, publications, and explorations across emerging technologies.</p>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-card-icon">⚡</div>
                  <h3>Technical Exploration</h3>
                </div>
                <p>Exploring emerging technologies, solving complex problems, and turning experiments into practical solutions.</p>
              </div>
            </div>

            <p className="about-footer">
              Always learning. Always building. Always exploring what comes next.
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

        {/* ── WORK / PROJECTS ──────── */}
        <section className="panel work" id="work">
          <div className="work-inner">
            <h2>Projects</h2>
            <p className="section-sub">
              Products, prototypes, and practical software systems
            </p>
            <div className="projects-grid">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── RESEARCH, PUBLICATIONS & IP ── */}
        <section className="panel research" id="research">
          <div className="research-inner">
            <p
              className="section-eyebrow"
              style={{ textAlign: "center", marginBottom: "0.5rem" }}
            >
              Publications & IP
            </p>
            <h2>Research, Publications & Intellectual Property</h2>
            <p className="section-sub">
              Cryptographic systems, patents, peer-reviewed research, and published works
            </p>
            <div className="projects-grid">
              {RESEARCH_ITEMS.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>

            {/* Achievements */}
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

            {/* Education */}
            <div className="education-strip">
              <p
                className="section-eyebrow"
                style={{ textAlign: "center", marginBottom: "1.5rem" }}
              >
                Education
              </p>
              <div className="education-card">
                <span className="education-icon">🎓</span>
                <div>
                  <div className="education-degree">{EDUCATION.degree}</div>
                  <div className="education-school">{EDUCATION.institution}</div>
                  <div className="education-grad">{EDUCATION.expectedGraduation}</div>
                </div>
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
              I'm open to opportunities, collaborations, research partnerships,
              and interesting conversations about AI, software engineering, and emerging technologies.
            </p>

            <div className="contact-links">
              <a
                href="mailto:harpreetsingh02092005@gmail.com"
                className="contact-link primary"
              >
                <span className="contact-link-icon">
                  <Gmail width="24" height="24" />
                </span>
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
                <span className="contact-link-icon">
                  <Linkedin width="24" height="24" />
                </span>
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
                <span className="contact-link-icon">
                  <Github width="24" height="24" />
                </span>
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">HarpreetSingh2005</div>
                </div>
              </a>

              <a
                href="https://theprune.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">🌱</span>
                <div>
                  <div className="contact-link-label">PRUNE — AI Discovery</div>
                  <div className="contact-link-value">https://theprune.in/</div>
                </div>
              </a>

              <a
                href="https://medium.com/@harpreetsingh-mrmulbbies"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-link-icon">
                  <Medium width="24" height="24" />
                </span>
                <div>
                  <div className="contact-link-label">Medium</div>
                  <div className="contact-link-value">
                    @harpreetsingh-mrmullbies
                  </div>
                </div>
              </a>

              <a
                href="https://www.amazon.com/dp/B0D21CN7QR?lv=shuf&bestFormat=true&channelId=704&plpRedirect=mhFallback"
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
            <a href="#work">Projects</a>
            <a href="#research">Research & IP</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="footer-copy">
            Always learning. Always building. Always exploring what comes next. — ©{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
}
