import React,{ useState, useEffect } from 'react';
import Canvas from './Canvas';

const Game = () => {
    //Define and init weigth and height for the game grid
    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(30);
    
    //Define and init the grid
    const [grid, setGrid] = useState(
        Array.from(Array(height), () => new Array(width).fill(0))
    );

    // console.log(grid);


    const generateRandomBlock = () => {
        const randomBlockIndex = Math.floor(Math.random() * blockShape.length); // Generate random block
        console.log("random "+randomBlockIndex);
        return blockShape[randomBlockIndex];
    };

    //Define and init the block shapes
    const blockShape = [
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ]
];

    const [currentBlock, setCurrentBlock] = useState({
        x: width / 2,
        y: 1,
        block: null,
    });

    useEffect(() => {
        setCurrentBlock(prevBlock => ({
            ...prevBlock,
            block: generateRandomBlock(), // Set the initial block shape
        }));
    }, []);
    
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
            console.log(currentBlock.x, currentBlock.y);
        } else if (movement === "right") {
            console.log(currentBlock.x, currentBlock.y);
        } else if (movement === "down") {
            console.log(currentBlock.x, currentBlock.y);
        } else if (movement === "rotate") {
            console.log(handleRotate(currentBlock.block));
        }
        console.log(currentBlock.block)
    }, [movement]);

    const handleRotate = () => {
        const rotatedBlock = rotateBlock(currentBlock);
        setCurrentBlock({ ...currentBlock, block: rotatedBlock });
    };

    const rotateBlock = (currentBlock) => {
        const rotatedBlock = currentBlock.block.map((_, index) =>
            currentBlock.block.map((column) => column[index]).reverse()
        );
        return rotatedBlock;
    };
    

    useEffect(() => {
        const blockHeight = currentBlock?.block?.length || 0; // Obtain the block's height (rows) for collision detection
    
        const gravity = setInterval(() => {
            setCurrentBlock((prevBlock) => ({ ...prevBlock, y: prevBlock.y + 1 })); // Increase y for downward movement
    
            // Collision check or reaching bottom to clear interval
            if (currentBlock.y >= height - blockHeight || collisionsCheck(grid)) {
                console.log("block should stop");
                if (currentBlock.y <= 1) {
                    console.log("Game over");
                    setGameOver(true);
                }
                clearInterval(gravity);
                setGrid((prevGrid) => {
                    const newGrid = [...prevGrid];
    
                    // Add block to grid
                    for (let row = 0; row < currentBlock.block.length; row++) {
                        for (let col = 0; col < currentBlock.block[row].length; col++) {
                            if (currentBlock.block[row][col] !== 0) {
                                newGrid[row + currentBlock.y][col + currentBlock.x] = currentBlock.block[row][col];
                            }
                        }
                    }
    
                    return newGrid;
                });
                setCurrentBlock(prevBlock => ({...prevBlock,x:width/2, y: 1, block: generateRandomBlock()})); // Reset block
            }
        }, 1000); // Adjust interval time for falling speed
    
        return () => clearInterval(gravity);
    }, [currentBlock, grid, height]); // Ensure dependencies are appropriately accounted for
    
    
    useEffect(() => {
        if (movement === "left") {
            if (currentBlock.x - currentBlock.block.length > 0) {;
                setCurrentBlock({ ...currentBlock, x: currentBlock.x - 1 });
            }
        } else if (movement === "right") {
            if (currentBlock.x + currentBlock.block.length < width) {
                setCurrentBlock({ ...currentBlock, x: currentBlock.x + 1 });
            }
            else if (movement === "down") {
                setCurrentBlock({ ...currentBlock, y: currentBlock.y + 2 });
            }
        } else if (movement === "rotate") {
            console.log("rotate");
        }
    }
    , [movement]);


    const collisionsCheck = () => {
        if (!currentBlock) {
            console.log("No block detected");
            return false;
        }
    
        const { x, y, block } = currentBlock; // Obtain the block's x and y position and shape
    
        for (let row = 0; row < block.length; row++) {
            for (let col = 0; col < block[row].length; col++) {
                if (block[row][col] !== 0) {
                    // Calculate the current position within the grid
                    const currentX = col + x;
                    const currentY = row + y;
    
                    // Check grid bounds and collisions
                    if (
                        currentY >= height || // Check grid height
                        currentX < 0 || // Check left edge
                        currentX >= width || // Check right edge
                        (grid[currentY] && grid[currentY][currentX] !== 0) // Check collision with non-empty cell
                    ) {
                        console.log("Collision detected");
                        return true; // Collision detected
                    }
                }
            }
        }
        console.log("No collision detected");
        return false; // No collision detected
    };
    
    if (collisionsCheck === true) {
        console.log("collision detected");
        const newBlock = nextBlock;
        setCurrentBlock(newBlock);
    }

    
    if (gameOver) {
        document.removeEventListener("keydown", handleKeyDown);
        document.getElementById("GameOver");
    }

    

  return (
    <div>
      <h1>Block Game</h1>
      <p>{JSON.stringify(currentBlock)}</p>
      <Canvas grid={grid} currentBlock={currentBlock} />
    </div>
  );
};

export default Game;