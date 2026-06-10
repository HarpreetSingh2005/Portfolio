import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Preloader from "./mainScreen/Preloader";
import Main from "./mainScreen/Main";

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Main />
      <SpeedInsights />
    </>
  );
}

export default App;
