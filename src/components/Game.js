import React,{ useState, useEffect } from 'react';
import Canvas from './Canvas';



const Game = () => {
    //Define and init weigth and height for the game grid
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(20);
    
    //Define and init the grid
    const [grid, setGrid] = useState(
        Array.from(Array(height), () => new Array(width).fill(0))
    );

    // console.log(grid);


    const generateRandomBlock = () => {
        const randomBlockIndex = Math.floor(Math.random() * blockShape.length); // Generate random block
        setCurrentBlock(prevBlock => ({...prevBlock, blockIndex: randomBlockIndex}));
        return blockShape[randomBlockIndex];
    };

    //Define and init the block shapes
    const blockShape = [
    [
        
        [1, 1],
        [1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1],
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
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
        
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ]
];

    const [currentBlock, setCurrentBlock] = useState({
        x: width / 2,
        y: 0,
        block: null,
        blockIndex: null
    });

    useEffect(() => {
        setCurrentBlock(prevBlock => ({
            ...prevBlock,
            block: generateRandomBlock() // Set the initial block shape
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

    const handleRotate = () => {
        const rotatedBlock = rotateBlock(currentBlock.block);
        const newWidth = rotatedBlock[0].length; // Get the new width of the rotated block
        const newHeight = rotatedBlock.length; // Get the new height of the rotated block
    
        // Calculate the maximum allowable x and y positions based on the block's new size
        const maxX = width - newWidth;
        const maxY = height - newHeight;
    
        // Adjust x and y positions to prevent the block from overflowing the grid
        const newX = Math.min(Math.max(0, currentBlock.x), maxX);
        const newY = Math.min(Math.max(0, currentBlock.y), maxY);

        if (collisionsCheck(newX, newY+1, rotatedBlock)) {
            // console.log("collision detected");
            return;
        }
        else{
        setCurrentBlock({ ...currentBlock, block: rotatedBlock, x: newX, y: newY+1 });
        }
    };
    
    const rotateBlock = (block) => {
        const rotatedBlock = [];
        const len = block.length;
        for (let i = 0; i < len; i++) {
            rotatedBlock.push([]);
            for (let j = 0; j < len; j++) {
                rotatedBlock[i].unshift(block[j][i]);
            }
        }
        return rotatedBlock;
    };
    
    
    

    useEffect(() => {
        checkFilledRows();
        const blockHeight = currentBlock.block?.length || 0; // Obtain the block's height (rows) for collision detection
    
        const gravity = setInterval(() => {
            setCurrentBlock((prevBlock) => ({ ...prevBlock, y: prevBlock.y + 1 })); // Increase y for downward movement
            if (collisionsCheck(currentBlock.x, currentBlock.y + 1, currentBlock.block)){
                // console.log("collision detected!!");
                if (currentBlock.y <= 1) {
                    return setGameOver(true);
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
            // Collision check or reaching bottom to clear interval
            if (currentBlock.y >= height-blockHeight && collisionsCheck(currentBlock.x, currentBlock.y + 1, currentBlock.block )) {
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
            if (!collisionsCheck(currentBlock.x - 1, currentBlock.y, currentBlock.block)) {
                setCurrentBlock({ ...currentBlock, x: currentBlock.x - 1 });
            }
        } else if (movement === "right") {
            if (!collisionsCheck(currentBlock.x + 1, currentBlock.y, currentBlock.block)) {
                setCurrentBlock({ ...currentBlock, x: currentBlock.x + 1 });
            }
        } else if (movement === "down") {
            if (!collisionsCheck(currentBlock.x, currentBlock.y + 1, currentBlock.block)) {
                setCurrentBlock({ ...currentBlock, y: currentBlock.y + 1 });
            }
        } else if (movement === "rotate") {
            if (!collisionsCheck(currentBlock.x, currentBlock.y, currentBlock.block)){
            handleRotate();
            }
        }
    }, [movement]);
    


    const collisionsCheck = (x, y, block) => {
        if (!block) {
            console.log("No block detected");
            return false;
        }
    
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
                    
                        return true;
                    }
                }
            }
        }
        // console.log("No collision detected");
        return false; // No collision detected
    };
    
    
    if (collisionsCheck === true) {
        if (currentBlock.y <= 0) {
            console.log("Game over");
            setGameOver(true);
        }
        else{
        // console.log("collision detected!");
        const newBlock = nextBlock;
        // setCurrentBlock(newBlock);
        }
    }

    
    if (gameOver) {
        document.removeEventListener("keydown", handleKeyDown);
        document.getElementById("GameOver");
    }

    
useEffect(() => {
    const interval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
    }, 1000);
    return () => clearInterval(interval);

}, []);

const checkFilledRows = () => {
    const filledRows = [];

    for (let row = 0; row < grid.length; row++) {
        let filled = true;
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 0) {
                filled = false;
                break;
            }
        }
        if (filled) {
            filledRows.push(row);
            setGrid((prevGrid) => {
                const newGrid = [...prevGrid];
                newGrid.splice(row, 1);
                newGrid.unshift(new Array(width).fill(0));
                setScore((prevScore) => prevScore + 100);
                return newGrid;
            });
        }
    }

    return filledRows;
};




  return (
    <div>
      <h2>Block Game</h2>
      <Canvas grid={grid} currentBlock={currentBlock} />
    </div>
  );
};

export default Game;