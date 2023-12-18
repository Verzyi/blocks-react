import React from "react";
import Game from "./components/Game";
import Canvas from "./components/Canvas";
import Score from "./components/Score";

const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Game />
      <Canvas />
      <Score />
    </div>
  );
};

export default App;