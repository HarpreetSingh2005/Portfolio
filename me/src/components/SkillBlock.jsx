import React from "react";

const SkillBlock = ({ title, items }) => {
  return (
    <div className="skill-block">
      <h3>{title}</h3>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillBlock;
