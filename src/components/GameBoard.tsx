import React from 'react';
import { CELL_SIZE } from '../constants';

type GameBoardProps = {
  grid: string[][];
};

export const GameBoard: React.FC<GameBoardProps> = ({ grid }) => {
  return (
    <div className="border-2 border-gray-700 bg-gray-900">
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: cell || 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};