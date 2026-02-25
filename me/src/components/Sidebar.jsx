import { useState, useEffect } from "react";

const Sidebar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="sidebar">
      <div className="time-display">
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}{" "}
        - IN
      </div>
      <div className="sidebar-footer">LET'S HAV</div>
    </aside>
  );
};

export default Sidebar;