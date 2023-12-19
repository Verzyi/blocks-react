import React from "react";
import Game from "./components/Game";
import Canvas from "./components/Canvas";
import Score from "./components/Score";

const App = () => {
  return (
    <div>
      <Score />
      <Game />
      <Canvas />
    </div>
  );
};

export default App;