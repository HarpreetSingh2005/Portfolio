import React from "react";
import "../App.css";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
const Main = () => {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <Sidebar />
      <Hero />
    </div>
  );
};

export default Main;
