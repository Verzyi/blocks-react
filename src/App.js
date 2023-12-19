import React from "react";
import Game from "./components/Game";
import Canvas from "./components/Canvas";
import Score from "./components/Score";
import "./App.css";

const App = () => {
  return (
    <div id="grid">
      <div className ="centered"><Score /></div>
      <div className ="centered"><Game /></div>

    </div>
  );
};

export default App;