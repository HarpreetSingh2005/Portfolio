import React from "react";
import "../App.css";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
const Main = () => {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Main;
