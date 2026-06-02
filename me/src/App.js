import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import Preloader from "./mainScreen/Preloader";
import Main from "./mainScreen/Main";

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Main />
      <Analytics />
    </>
  );
}

export default App;
