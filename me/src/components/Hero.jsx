import AnimateText from "./AnimateText";
import SkillBlock from "./SkillBlock";
import MiniGame from "./MiniGame/Game";
import { useState } from "react";
import "./hero.css";

export default function HeroText() {
  const FirstName = "HARPREET";
  const LastName = "SINGH";
  const [letterCounts, setLetterCounts] = useState({});
  const [activeLetters, setActiveLetters] = useState({});

  function triggerLetter(id) {
    setLetterCounts((prevCounts) => {
      const prev = prevCounts[id] || 0;
      const count = (prev + 1) % 4;

      // turn ON at count === 2
      if (count === 2) {
        setActiveLetters((prevActive) => ({
          ...prevActive,
          [id]: true,
        }));
      }

      // turn OFF at count === 0
      if (count === 0) {
        setActiveLetters((prevActive) => ({
          ...prevActive,
          [id]: false,
        }));
      }

      return {
        ...prevCounts,
        [id]: count,
      };
    });

    console.log("Hero count bump", id);
  }

  return (
    <>
      {/* FIXED HERO SCENE */}
      <section className="hero-scene">
        <MiniGame onLetterHit={triggerLetter} />

        <div className="name-section">
          <h1 className="hero-greeting">Hello, I'm</h1>

          <div className="name-row">
            {[FirstName, LastName].map((word, wi) => (
              <div className="name-word">
                {word.split("").map((char, i) => {
                  const id = `${word}-${i}`;

                  return (
                    <div
                      className="letter-box game-letter"
                      data-letter-id={id}
                      key={id}
                    >
                      <AnimateText char={char} active={!!activeLetters[id]} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERLAY CONTENT */}
      <section className="overlay">
        <section className="panel about">
          <h2>About</h2>
          <p>
            I’m an engineering student and problem solver focused on blockchain
            protocols, smart contracts, and secure system design.
          </p>
        </section>

        <section className="panel skills">
          <h2>Skills</h2>
          <div className="skill-grid">
            <SkillBlock
              title="Blockchain"
              items={["Ethereum", "Solidity", "Hardhat"]}
            />
            <SkillBlock
              title="Programming"
              items={["C++", "Python", "JavaScript"]}
            />
          </div>
        </section>
      </section>
    </>
  );
}
