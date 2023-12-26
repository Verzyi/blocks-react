import React from "react";
import Game from "./components/Game";
import Canvas from "./components/Canvas";
import Score from "./components/Score";
import "./App.css";
import "./index.css";

const App = () => {
  return (
       <div className="App">
          <div id="grid">
            <div className ="centered"><Game /></div>
          </div>
        </div>
  );
};

export default App;