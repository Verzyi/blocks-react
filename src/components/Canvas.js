import React, { useEffect, useRef } from 'react';

const Canvas = ({ grid, currentBlock }) => {
  const canvasRef = useRef(null);
  const CELL_SIZE = 20; // Define the size of each cell in pixels
  const CANVAS_WIDTH = 400; // Define the canvas width
  const CANVAS_HEIGHT = 600; // Define the canvas height

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || !currentBlock) return; // Null check to avoid undefined errors
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Render game elements
    // ...

    // Inside the Canvas component's useEffect

    // Example: Render grid
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
        const cell = grid[row][col];
        // Adjust cell size and position
        ctx.fillStyle = cell === 0 ? 'white' : 'black';
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
    
    // Example: Render current block
    if (currentBlock && currentBlock.block) {
        const { block, x, y } = currentBlock;
        for (let row = 0; row < block.length; row++) {
        for (let col = 0; col < block[row].length; col++) {
            const cell = block[row][col];
            // Adjust cell size and position based on the block's x and y position
            ctx.fillStyle = cell === 0 ? 'white' : 'black';
            ctx.fillRect((col + x) * CELL_SIZE, (row + y) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        }
    }

  }, [grid, currentBlock]);
  

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ border: '1px solid black' }}
    />
  );
};

export default Canvas;
