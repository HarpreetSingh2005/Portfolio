import { useState } from "react";
import Preloader from "./mainScreen/Preloader";
import Main from "./mainScreen/Main";

function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    // <>{!loaded ? <Preloader onFinish={() => setLoaded(true)} /> : <Main />}</>
    <Main />
  );
}

export default App;
