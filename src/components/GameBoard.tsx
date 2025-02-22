import React from 'react';
import { CELL_SIZE, SPACE_BACKGROUNDS } from '../constants';

type GameBoardProps = {
  grid: string[][];
  backgroundIndex: number;
};

export const GameBoard: React.FC<GameBoardProps> = ({ grid, backgroundIndex }) => {
  return (
    <div 
      className="border-2 border-gray-700 relative overflow-hidden"
      style={{
        backgroundImage: `url("${SPACE_BACKGROUNDS[backgroundIndex]}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell || 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};