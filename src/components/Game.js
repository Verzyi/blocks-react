import React,{ useState, useEffect } from 'react';

const Game = () => {
    //Define and init weigth and height for the game grid
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(20);
    
    //Define and init the grid
    const [grid, setGrid] = useState(
        Array.from(Array(height), () => new Array(width).fill(0))
    );

    // console.log(grid);

    const [currentBlock, setCurrentBlock] = useState(0);
    const [nextBlock, setNextBlock] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    //State variable to track active movement direction
    const [movement, setMovement] = useState(null);

    const handleKeyDown = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                setMovement("left");
                break;
            case "ArrowRight":
                setMovement("right");
                break;
            case "ArrowDown":
                setMovement("down");
                break;
            case 'ArrowUp':
                setMovement("rotate");
                break;    
            default:
                break;
        }
    };

    //Event listener for keyup to stop the movement
    const handleKeyUp = () => {
        setMovement(null);
    };

    //add event listeners for keydown and keyup
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    //logic to handel movement of the block
    useEffect(() => {
        if (movement === "left") {
            console.log("left");
        } else if (movement === "right") {
            console.log("right");
        } else if (movement === "down") {
            console.log("down");
        } else if (movement === "rotate") {
            console.log("rotate");
        }
    }, [movement]);
    

  return (
    <div>
      <h1>Block Game</h1>
      {}
    </div>
  );
};

export default Game;