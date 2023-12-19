import React, { useEffect, useRef, useState } from 'react';

const Canvas = ({ grid, currentBlock, blockShape }) => {
    const canvasRef = useRef(null);
    const [isPieceLanded, setIsPieceLanded] = useState(false);
    const CELL_SIZE = 40; // Define the size of each cell in pixels
    const CANVAS_WIDTH = 400; // Define the canvas width
    const CANVAS_HEIGHT = 800; // Define the canvas height
    const blockColors = ['cyan', 'yellow', 'purple', 'green', 'red', 'blue', 'orange'];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !grid) return;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Render grid lines first
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }

        // Render current block if not landed
        if (currentBlock && currentBlock.block && !isPieceLanded) {
            const { block, x, y } = currentBlock;
            for (let row = 0; row < block.length; row++) {
                for (let col = 0; col < block[row].length; col++) {
                    const cell = block[row][col];
                    if (cell !== 0) { // Render only non-empty cells
                        switch (currentBlock.blockIndex) {
                            case 0:
                                ctx.fillStyle = 'cyan';
                                break;
                            case 1:
                                ctx.fillStyle = 'yellow';
                                break;
                            case 2:
                                ctx.fillStyle = 'purple';
                                break;
                            case 3:
                                ctx.fillStyle = 'green';
                                break;
                            case 4:
                                ctx.fillStyle = 'red';
                                break;
                            case 5:
                                ctx.fillStyle = 'blue';
                                break;
                            case 6:
                                ctx.fillStyle = 'orange';
                                break;
                            default:
                                ctx.fillStyle = 'black';
                        }
                        // ctx.fillStyle = 'red'; // Adjust color as needed
                        ctx.fillRect((col + x) * CELL_SIZE, (row + y) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                        ctx.strokeStyle = 'black'; // Adjust outline color as needed
                        ctx.lineWidth = 2; // Adjust outline width as needed
                        ctx.strokeRect((col + x) * CELL_SIZE, (row + y) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    }
                }
            }
        }
    
    // Render landed blocks with stored colors
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const cell = grid[row][col];
            if (cell !== 0) {
                ctx.fillStyle = blockColors[cell - 1] || 'black'; // Use stored color or default to black
                ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    // Render current block if not landed
    if (currentBlock && currentBlock.block && !isPieceLanded) {
        const { block, x, y, blockIndex } = currentBlock;
        for (let row = 0; row < block.length; row++) {
            for (let col = 0; col < block[row].length; col++) {
                const cell = block[row][col];
                if (cell !== 0) {
                    ctx.fillStyle = blockColors[blockIndex] || 'black'; // Use stored color or default to black
                    ctx.fillRect((col + x) * CELL_SIZE, (row + y) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 2;
                    ctx.strokeRect((col + x) * CELL_SIZE, (row + y) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    }
}, [grid, currentBlock, isPieceLanded]);

useEffect(() => {
    if (isPieceLanded && currentBlock && currentBlock.block) {
        setIsPieceLanded(false); // Reset landed state for the new block
    }
}, [currentBlock, isPieceLanded]);

return (
    <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: '2px solid black' }}
    />
);
};

export default Canvas;