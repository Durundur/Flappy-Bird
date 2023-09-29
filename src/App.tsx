import { useState } from "react";
import Game from "./Game";
import Start from "./Start";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  gameBox: {
    width: "390px",
    height: "600px",
  },
};

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);

  function GameContainer() {
    if (!isGameRunning)
      return <Start setIsGameRunning={setIsGameRunning}></Start>;
    return <Game></Game>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.gameBox}>
        <GameContainer></GameContainer>
      </div>
    </div>
  );
}

export default App;
